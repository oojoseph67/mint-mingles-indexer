import { AllListing, CompletedListing, NFT } from "../../model";
import { v4 as uuidv4 } from "uuid";
import {
  BlockType,
  ContextType,
  MARKETPLACE_CONTRACT_ADDRESS,
} from "../../main";
import * as marketplaceAbi from "../../abi/marketplaceABI";
import { saveNFT } from "../../utils/blockchain";

export async function processAllListings(
  ctx: ContextType,
  blockHeader: BlockType,
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
      if (!processedListingIds.has(listing.listingId.toString())) {
        await saveNFT({
          contractAddress: listing.assetContract,
          tokenId: listing.tokenId,
          ctx: ctx,
        });

        if (listing.status === 1) {
          const nft = await ctx.store.findOne(NFT, {
            where: {
              tokenId: listing.tokenId,
              assetContract: listing.assetContract.toLowerCase(),
            },
          });

          const allListing = new AllListing({
            id: uuidv4(),
            listingId: listing.listingId,
            tokenId: listing.tokenId,
            quantity: listing.quantity,
            pricePerToken: listing.pricePerToken,
            startTimestamp: listing.startTimestamp,
            endTimestamp: listing.endTimestamp,
            listingCreator: listing.listingCreator,
            assetContract: listing.assetContract.toLowerCase(),
            currency: listing.currency,
            tokenType: listing.tokenType,
            status: listing.status,
            reserved: listing.reserved,
            nft: nft,
          });

          newAllListings.push(allListing);
          processedListingIds.add(listing.listingId.toString());
        } else if (listing.status === 2) {
          const nft = await ctx.store.findOne(NFT, {
            where: {
              tokenId: listing.tokenId,
              assetContract: listing.assetContract.toLowerCase(),
            },
          });

          const completedListing = new CompletedListing({
            id: uuidv4(),
            listingId: listing.listingId,
            tokenId: listing.tokenId,
            quantity: listing.quantity,
            pricePerToken: listing.pricePerToken,
            startTimestamp: listing.startTimestamp,
            endTimestamp: listing.endTimestamp,
            listingCreator: listing.listingCreator,
            assetContract: listing.assetContract.toLowerCase(),
            currency: listing.currency,
            tokenType: listing.tokenType,
            status: listing.status,
            reserved: listing.reserved,
            nft: nft,
          });

          newCompletedListings.push(completedListing);
          processedListingIds.add(listing.listingId.toString());
        }
      }
    }
  }

  return {
    newAllListings,
    newCompletedListings,
    updatedProcessedListingIds: processedListingIds,
  };
}
