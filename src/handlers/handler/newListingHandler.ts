import * as marketplaceAbi from "../../abi/marketplaceABI";
import { ContextType, LogType } from "../../main";
import { NewListing, NFT } from "../../model";
import { saveNFT } from "../../utils/blockchain";

export async function handleNewListing({
  ctx,
  log,
}: {
  ctx: ContextType;
  log: LogType;
}): Promise<NewListing> {
  let { assetContract, listing, listingCreator, listingId } =
    marketplaceAbi.events.NewListing.decode(log);

  await saveNFT({
    contractAddress: assetContract,
    tokenId: listing.tokenId,
    ctx: ctx,
  });

  const nft = await ctx.store.findOne(NFT, {
    where: {
      tokenId: listing.tokenId,
      assetContract: assetContract.toLowerCase(),
    },
  });

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
    nft: nft,
  });
}
