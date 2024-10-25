import { AllListing, CompletedListing } from "../../model";
import { v4 as uuidv4 } from "uuid";
import { DataHandlerContext } from "@subsquid/evm-processor";
import { Store } from "@subsquid/typeorm-store";
import { MARKETPLACE_CONTRACT_ADDRESS } from "../../main";
import * as marketplaceAbi from "../../abi/marketplaceABI";

export async function processAllListings(
  ctx: DataHandlerContext<Store, any>,
  blockHeader: any,
  processedListingIds: Set<string>
) {
  const contract = new marketplaceAbi.Contract(
    ctx,
    blockHeader,
    MARKETPLACE_CONTRACT_ADDRESS.toLowerCase()
  );

  const totalListings = await contract.totalListings();
  console.log("Total listings:", totalListings.toString());

  const lastProcessedListing = await ctx.store.findOne(AllListing, {
    order: { listingId: "DESC" },
    where: {},
  });

  const startIndex = lastProcessedListing
    ? Number(lastProcessedListing.listingId) + 1
    : 0;
  const endIndex = Number(totalListings) - 1;

  const newAllListings: AllListing[] = [];
  const newCompletedListings: CompletedListing[] = [];

  if (startIndex <= endIndex) {
    const newListings = await contract.getAllListings(startIndex, endIndex);
    console.log(`Fetching listings from ${startIndex} to ${endIndex}`);

    for (const listing of newListings) {
      if (
        listing.status === 1 &&
        !processedListingIds.has(listing.listingId.toString())
      ) {
        newAllListings.push(
          new AllListing({
            id: uuidv4(),
            listingId: listing.listingId,
            tokenId: listing.tokenId,
            quantity: listing.quantity,
            pricePerToken: listing.pricePerToken,
            startTimestamp: listing.startTimestamp,
            endTimestamp: listing.endTimestamp,
            listingCreator: listing.listingCreator,
            assetContract: listing.assetContract,
            currency: listing.currency,
            tokenType: listing.tokenType,
            status: listing.status,
            reserved: listing.reserved,
          })
        );
        processedListingIds.add(listing.listingId.toString());
      }

      if (
        listing.status === 2 &&
        !processedListingIds.has(listing.listingId.toString())
      ) {
        newCompletedListings.push(
          new CompletedListing({
            id: uuidv4(),
            listingId: listing.listingId,
            tokenId: listing.tokenId,
            quantity: listing.quantity,
            pricePerToken: listing.pricePerToken,
            startTimestamp: listing.startTimestamp,
            endTimestamp: listing.endTimestamp,
            listingCreator: listing.listingCreator,
            assetContract: listing.assetContract,
            currency: listing.currency,
            tokenType: listing.tokenType,
            status: listing.status,
            reserved: listing.reserved,
          })
        );
        processedListingIds.add(listing.listingId.toString());
      }
    }
  }

  return {
    newAllListings,
    newCompletedListings,
    updatedProcessedListingIds: processedListingIds,
  };
}
