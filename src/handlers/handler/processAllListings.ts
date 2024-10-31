import {
  AllListing,
  CompletedListing,
  NFT,
  NFTAttribute,
  NFTMetadata,
  NFTProperty,
} from "../../model";
import { v4 as uuidv4 } from "uuid";
import {
  BlockType,
  ContextType,
  MARKETPLACE_CONTRACT_ADDRESS,
} from "../../main";
import * as marketplaceAbi from "../../abi/marketplaceABI";
import { getNFTCustom } from "../../utils/blockchain";

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

  console.log({ startIndex, endIndex });
  console.log("LISTINGS");

  if (startIndex <= endIndex) {
    const newListings = await contract.getAllListings(startIndex, endIndex);
    console.log(`Fetching listings from ${startIndex} to ${endIndex}`);

    for (const listing of newListings) {
      let dbNFT: NFT;

      const nft = await getNFTCustom({
        contractAddress: listing.assetContract,
        tokenId: listing.tokenId,
      });

      console.log("NFT: for loop", nft);
      console.log("NFT: for loop metadata", nft.metadata);
      console.log("NFT: for loop attributes", nft.metadata.attributes);
      console.log("NFT: for loop properties", nft.metadata.properties);

      const attributes = nft.metadata.attributes.map(
        (attr) =>
          new NFTAttribute({
            traitType: attr.traitType,
            value: attr.value,
          })
      );

      const properties = nft.metadata.properties.map(
        (prop) =>
          new NFTProperty({
            name: prop.name,
            value: prop.value,
          })
      );

      const metadata = new NFTMetadata({
        name: nft.metadata.name || "",
        description: nft.metadata.description || "",
        image: nft.metadata.image || "",
        animationUrl: nft.metadata.animationUrl || "",
        externalUrl: nft.metadata.externalUrl || "",
        backgroundColor: nft.metadata.backgroundColor || "",
        supply: nft.metadata.supply || 0,
        imageUrl: nft.metadata.imageUrl || "",
        customImage: nft.metadata.customImage || "",
        customAnimationUrl: nft.metadata.customAnimationUrl || "",
        attributes: attributes,
        properties: properties,
      });

      dbNFT = new NFT({
        id: uuidv4(),
        owner: nft.owner || "",
        tokenId: listing.tokenId,
        tokenURI: nft.tokenURI || "",
        type: nft.type || "",
        assetContract: listing.assetContract,
        metadata: metadata,
      });

      await ctx.store.insert(dbNFT);

      if (
        listing.status === 1 &&
        !processedListingIds.has(listing.listingId.toString())
      ) {
        console.log("NFT: all listing inside if", { nft });

        const allListing = new AllListing({
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
          nft: dbNFT,
        });

        newAllListings.push(allListing);
        processedListingIds.add(listing.listingId.toString());
      }

      if (
        listing.status === 2 &&
        !processedListingIds.has(listing.listingId.toString())
      ) {
        const completedListing = new CompletedListing({
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
        });

        newCompletedListings.push(completedListing);
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
