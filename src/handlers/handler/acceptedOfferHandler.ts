import * as marketplaceAbi from "../../abi/marketplaceABI";
import { ContextType, LogType } from "../../main";
import { AcceptedOffers, AllOffers, NewOffer, NFT } from "../../model";
import { saveNFT } from "../../utils/blockchain";

export async function handleAcceptedOffer({
  ctx,
  log,
}: {
  ctx: ContextType;
  log: LogType;
}): Promise<AcceptedOffers> {
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

  await saveNFT({
    contractAddress: assetContract,
    tokenId: tokenId,
    ctx: ctx,
  });

  const nft = await ctx.store.findOne(NFT, {
    where: {
      tokenId: tokenId,
      assetContract: assetContract.toLowerCase(),
    },
  });

  return new AcceptedOffers({
    id: log.id,
    offeror: offeror,
    offerId: offerId,
    assetContract: assetContract.toLowerCase(),
    quantityBought: quantityBought,
    seller: seller,
    tokenId: tokenId,
    totalPricePaid: totalPricePaid,
    nft: nft,
  });
}
