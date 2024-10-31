import * as marketplaceAbi from "../../abi/marketplaceABI";
import { ContextType, LogType } from "../../main";
import { AllListing, NewListing } from "../../model";

export async function handleCancelledListing(
  ctx: ContextType,
  log: LogType
): Promise<void> {
  let { listingId } = marketplaceAbi.events.CancelledListing.decode(log);

  const listingToRemove = await ctx.store.findOne(NewListing, {
    where: { listingId: listingId },
  });

  const listingToRemoveAll = await ctx.store.findOne(AllListing, {
    where: { listingId: listingId },
  });

  // Remove the listing if it exists
  if (listingToRemove) {
    await ctx.store.remove(NewListing, listingToRemove.id);
  }

  if (listingToRemoveAll) {
    await ctx.store.remove(AllListing, listingToRemoveAll.id);
  }
}
