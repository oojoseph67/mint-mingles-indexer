import * as marketplaceAbi from "../../abi/marketplaceABI";
import { NewListing } from "../../model";
import { Context } from "../../types";

export async function handleCancelledListing(
  ctx: Context,
  log: any
): Promise<void> {
  let { listingId } = marketplaceAbi.events.CancelledListing.decode(log);

  const listingToRemove = await ctx.store.findOne(NewListing, {
    where: { listingId: listingId },
  });

  // Remove the listing if it exists
  if (listingToRemove) {
    await ctx.store.remove(NewListing, listingToRemove.id);
  }
}
