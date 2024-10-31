import * as marketplaceAbi from "../../abi/marketplaceABI";
import { ContextType, LogType } from "../../main";
import { AllAuction, NewAuction } from "../../model";

export async function handleCancelledAuction(
  ctx: ContextType,
  log: LogType
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
