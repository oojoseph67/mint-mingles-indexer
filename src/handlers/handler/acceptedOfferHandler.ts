import * as marketplaceAbi from "../../abi/marketplaceABI";
import { AcceptedOffers, NewOffer } from "../../model";
import { DataHandlerContext } from "@subsquid/evm-processor";
import { Store } from "@subsquid/typeorm-store";

export async function handleAcceptedOffer(
  ctx: DataHandlerContext<Store, any>,
  log: any
): Promise<AcceptedOffers> {
  let {
    offerId,
    assetContract,
    offeror,
    quantityBought,
    seller,
    tokenId,
    totalPricePaid,
  } = marketplaceAbi.events.AcceptedOffer.decode(log);

  const offerToRemove = await ctx.store.findOne(NewOffer, {
    where: { offerId: offerId },
  });

  if (offerToRemove) {
    await ctx.store.remove(NewOffer, offerToRemove.id);
  }

  return new AcceptedOffers({
    id: log.id,
    offeror: offeror,
    offerId: offerId,
    assetContract: assetContract,
    quantityBought: quantityBought,
    seller: seller,
    tokenId: tokenId,
    totalPricePaid: totalPricePaid,
  });
}
