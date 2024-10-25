import * as marketplaceAbi from "../../abi/marketplaceABI";
import { AcceptedOffers, AllOffers, NewOffer } from "../../model";
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

  const offersToRemove = await ctx.store.find(NewOffer, {
    where: { tokenId: tokenId, assetContract: assetContract },
  });

  const offersToRemoveAll = await ctx.store.find(AllOffers, {
    where: { tokenId: tokenId, assetContract: assetContract },
  });

  if (offersToRemove) {
    for (const offer of offersToRemove) {
      await ctx.store.remove(NewOffer, offer.id);
    }
  }

  if (offersToRemoveAll) {
    for (const offer of offersToRemoveAll) {
      await ctx.store.remove(AllOffers, offer.id);
    }
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
