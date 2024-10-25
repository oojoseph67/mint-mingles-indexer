import * as marketplaceAbi from "../../abi/marketplaceABI";
import { AuctionClosed, NewAuction } from "../../model";
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
  const auctionToRemove = await ctx.store.findOne(NewAuction, {
    where: { auctionId: auctionId },
  });

  if (auctionToRemove) {
    await ctx.store.remove(NewAuction, auctionToRemove.id);
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
