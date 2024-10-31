import * as marketplaceAbi from "../../abi/marketplaceABI";
import { LogType } from "../../main";
import { NewOffer } from "../../model";

export async function handleNewOffer(log: LogType): Promise<NewOffer> {
  console.log("Inside new offer if statement");

  let { offeror, offerId, assetContract, offer } =
    marketplaceAbi.events.NewOffer.decode(log);

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
