import * as marketplaceAbi from "../../abi/marketplaceABI";
import { AllListing, NewListing } from "../../model";
import { DataHandlerContext } from "@subsquid/evm-processor";
import { Store } from "@subsquid/typeorm-store";

export async function handleCancelledListing(
  ctx: DataHandlerContext<Store, any>,
  log: any
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
