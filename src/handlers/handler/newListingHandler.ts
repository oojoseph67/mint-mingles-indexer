import * as marketplaceAbi from "../../abi/marketplaceABI";
import { NewListing } from "../../model";

export async function handleNewListing(log: any): Promise<NewListing> {
  let { assetContract, listing, listingCreator, listingId } =
    marketplaceAbi.events.NewListing.decode(log);

  return new NewListing({
    id: log.id,
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
  });
}
