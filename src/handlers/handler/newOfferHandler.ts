import * as marketplaceAbi from "../../abi/marketplaceABI";
import { NewOffer } from "../../model";
import { DataHandlerContext } from "@subsquid/evm-processor";
import { Store } from "@subsquid/typeorm-store";

export async function handleNewOffer(
  ctx: DataHandlerContext<Store, any>,
  log: any
): Promise<NewOffer> {
  console.log("Inside new offer if statement");

  let {
    offeror,
    offerId,
    assetContract,
    offer,
  } = marketplaceAbi.events.NewOffer.decode(log);

  // this is to remove the listing from the new-listing database after it has been sold
  // const listingToRemove = await ctx.store.findOne(NewOffer, {
  //   where: { offerId: offerId },
  // });

  // if (listingToRemove) {
  //   await ctx.store.remove(NewOffer, listingToRemove.id);
  // }

  return new NewOffer({
    id: log.id,
    offeror: offeror,
    offerId: offerId,
    assetContract: assetContract,
    tokenId: offer.tokenId,
    quantity: offer.quantity,
    totalPrice: offer.totalPrice,
    expirationTimestamp: offer.expirationTimestamp,
    currency: offer.currency,
    tokenType: offer.tokenType,
    status: offer.status,
    transactionHash: log.transactionHash,
  });
}
