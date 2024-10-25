import * as marketplaceAbi from "../../abi/marketplaceABI";
import { NewListing } from "../../model";
import { DataHandlerContext } from "@subsquid/evm-processor";
import { Store } from "@subsquid/typeorm-store";

export async function handleUpdatedListing(
  ctx: DataHandlerContext<Store, any>,
  log: any
): Promise<void> {
  let { listingId, assetContract, listing, listingCreator } =
    marketplaceAbi.events.UpdatedListing.decode(log);

  // Find the listing to update in the database where listingId matches
  const listingToUpdate = await ctx.store.findOne(NewListing, {
    where: { listingId: listingId },
  });

  // Update the listing if it exists
  if (listingToUpdate) {
    const updatedData = {
      listingCreator: listingCreator,
      listingId: listingId,
      assetContract: assetContract,
      tokenId: listing.tokenId,
      quantity: listing.quantity,
      pricePerToken: listing.pricePerToken,
      startTimestamp: listing.startTimestamp,
      endTimestamp: listing.endTimestamp,
      currency: listing.currency,
      tokenType: listing.tokenType,
      status: listing.status,
      reserved: listing.reserved,
      transactionHash: log.transactionHash,
    };

    // Update the listing with new data
    Object.assign(listingToUpdate, updatedData);
    await ctx.store.save(listingToUpdate);
  }
}
