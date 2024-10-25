import * as marketplaceAbi from "../../abi/marketplaceABI";
import { AllAuction, NewAuction, NewBid } from "../../model";
import { DataHandlerContext } from "@subsquid/evm-processor";
import { Store } from "@subsquid/typeorm-store";

export async function handleCancelledAuction(
  ctx: DataHandlerContext<Store, any>,
  log: any
): Promise<void> {
  let { auctionId } = marketplaceAbi.events.CancelledAuction.decode(log);

  // Delete the auction from the database where auctionId matches
  const auctionToRemove = await ctx.store.findOne(NewAuction, {
    where: { auctionId: auctionId },
  });

  const auctionToRemoveAll = await ctx.store.findOne(AllAuction, {
    where: { auctionId: auctionId },
  });

  // Remove the auction if it exists
  if (auctionToRemove) {
    await ctx.store.remove(NewAuction, auctionToRemove.id);
  }

  if (auctionToRemoveAll) {
    await ctx.store.remove(AllAuction, auctionToRemoveAll.id);
  }
}
