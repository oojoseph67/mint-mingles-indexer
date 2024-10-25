import * as marketplaceAbi from "../../abi/marketplaceABI";
import { AllAuction, AuctionClosed, NewAuction, NewBid } from "../../model";
import { DataHandlerContext } from "@subsquid/evm-processor";
import { Store } from "@subsquid/typeorm-store";

export async function handleAuctionClosed(
  ctx: DataHandlerContext<Store, any>,
  log: any
): Promise<AuctionClosed> {
  console.log("Inside new sale if statement");

  let {
    assetContract,
    auctionId,
    closer,
    tokenId,
    auctionCreator,
    winningBidder,
  } = marketplaceAbi.events.AuctionClosed.decode(log);

  // this is to remove the auction from the new-auction database after it has been closed
  const auctionToRemove = await ctx.store.find(NewAuction, {
    where: { auctionId: auctionId, assetContract: assetContract },
  });

  const auctionToRemoveAll = await ctx.store.find(AllAuction, {
    where: { auctionId: auctionId, assetContract: assetContract },
  });

  const bidsToRemove = await ctx.store.find(NewBid, {
    where: { auctionId: auctionId, assetContract: assetContract },
  });

  if (auctionToRemove) {
    for (const auction of auctionToRemove) {
      await ctx.store.remove(NewAuction, auction.id);
    }
  }

  if (auctionToRemoveAll) {
    for (const auction of auctionToRemoveAll) {
      await ctx.store.remove(AllAuction, auction.id);
    }
  }

  if (bidsToRemove) {
    for (const bid of bidsToRemove) {
      await ctx.store.remove(NewBid, bid.id);
    }
  }

  return new AuctionClosed({
    id: log.id,
    auctionId: auctionId,
    assetContract: assetContract,
    closer: closer,
    tokenId: tokenId,
    auctionCreator: auctionCreator,
    winningBidder: winningBidder,
    transactionHash: log.transactionHash,
  });
}
