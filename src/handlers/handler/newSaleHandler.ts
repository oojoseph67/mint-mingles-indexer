import * as marketplaceAbi from "../../abi/marketplaceABI";
import { AllListing, NewListing, NewSaleListing } from "../../model";
import { DataHandlerContext } from "@subsquid/evm-processor";
import { Store } from "@subsquid/typeorm-store";

export async function handleNewSale(
  ctx: DataHandlerContext<Store, any>,
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
  const listingToRemove = await ctx.store.find(NewListing, {
    where: { listingId: listingId },
  });

  const listingToRemoveAll = await ctx.store.find(AllListing, {
    where: { listingId: listingId },
  });

  if (listingToRemove) {
    for (const listing of listingToRemove) {
      await ctx.store.remove(NewListing, listing.id);
    }
  }

  if (listingToRemoveAll) {
    for (const listing of listingToRemoveAll) {
      await ctx.store.remove(AllListing, listing.id);
    }
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
