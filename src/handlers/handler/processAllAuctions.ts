import { AllAuction, CompletedAuction, WinningBid } from "../../model";
import { v4 as uuidv4 } from "uuid";
import { DataHandlerContext, Log } from "@subsquid/evm-processor";
import { Store } from "@subsquid/typeorm-store";
import * as marketplaceAbi from "../../abi/marketplaceABI";
import { MARKETPLACE_CONTRACT_ADDRESS } from "../../main";

export async function processAllAuctions(
  ctx: DataHandlerContext<Store, any>,
  blockHeader: any,
  processedAuctionIds: Set<string>
) {
  const contract = new marketplaceAbi.Contract(
    ctx,
    blockHeader,
    MARKETPLACE_CONTRACT_ADDRESS.toLowerCase()
  );

  const totalAuctions = await contract.totalAuctions();
  console.log("Total auctions:", totalAuctions.toString());

  const lastProcessedAuction = await ctx.store.findOne(AllAuction, {
    order: { auctionId: "DESC" },
    where: {},
  });

  const startIndex = lastProcessedAuction
    ? Number(lastProcessedAuction.auctionId) + 1
    : 0;
  const endIndex = Number(totalAuctions) - 1;

  const newAllAuctions: AllAuction[] = [];
  const newCompletedAuctions: CompletedAuction[] = [];

  if (startIndex <= endIndex) {
    const newAuctions = await contract.getAllAuctions(startIndex, endIndex);
    console.log(`Fetching auctions from ${startIndex} to ${endIndex}`);

    for (const auction of newAuctions) {
      if (!processedAuctionIds.has(auction.auctionId.toString())) {
        const winningBid = await contract.getWinningBid(auction.auctionId);

        const winningBidBody = new WinningBid({
          bidder: winningBid._bidder,
          currency: winningBid._currency,
          bidAmount: winningBid._bidAmount,
        });

        if (auction.status === 1) {
          const isAuctionExpired = await contract.isAuctionExpired(
            auction.auctionId
          );

          newAllAuctions.push(
            new AllAuction({
              id: uuidv4(),
              auctionId: auction.auctionId,
              tokenId: auction.tokenId,
              quantity: auction.quantity,
              minimumBidAmount: auction.minimumBidAmount,
              buyoutBidAmount: auction.buyoutBidAmount,
              timeBufferInSeconds: auction.timeBufferInSeconds,
              bidBufferBps: auction.bidBufferBps,
              startTimestamp: auction.startTimestamp,
              endTimestamp: auction.endTimestamp,
              auctionCreator: auction.auctionCreator,
              assetContract: auction.assetContract,
              currency: auction.currency,
              tokenType: auction.tokenType,
              status: auction.status,
              winningBid: winningBidBody,
              isAuctionExpired: isAuctionExpired,
            })
          );
          processedAuctionIds.add(auction.auctionId.toString());
        } else if (auction.status === 2) {
          newCompletedAuctions.push(
            new CompletedAuction({
              id: uuidv4(),
              auctionId: auction.auctionId,
              tokenId: auction.tokenId,
              quantity: auction.quantity,
              minimumBidAmount: auction.minimumBidAmount,
              buyoutBidAmount: auction.buyoutBidAmount,
              timeBufferInSeconds: auction.timeBufferInSeconds,
              bidBufferBps: auction.bidBufferBps,
              startTimestamp: auction.startTimestamp,
              endTimestamp: auction.endTimestamp,
              auctionCreator: auction.auctionCreator,
              assetContract: auction.assetContract,
              currency: auction.currency,
              tokenType: auction.tokenType,
              status: auction.status,
              winningBid: winningBidBody,
              isAuctionExpired: true,
            })
          );
        }

        processedAuctionIds.add(auction.auctionId.toString());
      }
    }
  }

  return {
    newAllAuctions,
    newCompletedAuctions,
    updatedProcessedAuctionIds: processedAuctionIds,
  };
}

export async function handleBidInAuction(
  ctx: DataHandlerContext<Store, any>,
  log: any
) {
  const { auctionId, bidAmount } = marketplaceAbi.events.NewBid.decode(log);

  const auction = await ctx.store.findOne(AllAuction, {
    where: { auctionId },
  });

  if (auction) {
    const contract = new marketplaceAbi.Contract(
      ctx,
      ctx.blocks[ctx.blocks.length - 1].header,
      MARKETPLACE_CONTRACT_ADDRESS.toLowerCase()
    );

    const winningBid = await contract.getWinningBid(auctionId);
    const isAuctionExpired = await contract.isAuctionExpired(auctionId);

    auction.winningBid = new WinningBid({
      bidder: winningBid._bidder,
      currency: winningBid._currency,
      bidAmount: winningBid._bidAmount,
    });

    if (bidAmount === auction.buyoutBidAmount) {
      auction.isAuctionExpired = true;
    } else {
      auction.isAuctionExpired = isAuctionExpired;
    }

    await ctx.store.save(auction);
  }
}

export async function handleCollectAuctionPayout(
  ctx: DataHandlerContext<Store, any>,
  log: any
) {
  const { auctionId } = marketplaceAbi.events.AuctionClosed.decode(log);
  const auctionToRemove = await ctx.store.findOne(AllAuction, {
    where: { auctionId },
  });

  if (auctionToRemove) {
    await ctx.store.remove(AllAuction, auctionToRemove.id);

    const completedAuction = new CompletedAuction({
      ...auctionToRemove,
      id: uuidv4(),
      status: 2,
      isAuctionExpired: true,
    });

    await ctx.store.save(completedAuction);
  }
}
