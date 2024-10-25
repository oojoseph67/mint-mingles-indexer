import * as marketplaceAbi from "../../abi/marketplaceABI";
import { NewListing, NewSaleListing } from "../../model";
import { Context } from "../../types";

export async function handleNewSale(
  ctx: Context,
  log: any
): Promise<NewSaleListing> {
  console.log("Inside new sale if statement");

  let {
    listingId,
    assetContract,
    tokenId,
    quantityBought,
    totalPricePaid,
    buyer,
    listingCreator,
  } = marketplaceAbi.events.NewSale.decode(log);

  // this is to remove the listing from the new-listing database after it has been sold
  const listingToRemove = await ctx.store.findOne(NewListing, {
    where: { listingId: listingId },
  });

  if (listingToRemove) {
    await ctx.store.remove(NewListing, listingToRemove.id);
  }

  return new NewSaleListing({
    id: log.id,
    listingCreator: listingCreator,
    listingId: listingId,
    assetContract: assetContract,
    tokenId: tokenId,
    quantityBought: quantityBought,
    totalPricePaid: totalPricePaid,
    buyer: buyer,
    transactionHash: log.transactionHash,
  });
}
