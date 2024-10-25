import {
  AllAuction,
  AllOffers,
  CompletedAuction,
  CompletedOffers,
} from "../../model";
import { v4 as uuidv4 } from "uuid";
import { DataHandlerContext } from "@subsquid/evm-processor";
import { Store } from "@subsquid/typeorm-store";
import * as marketplaceAbi from "../../abi/marketplaceABI";
import { MARKETPLACE_CONTRACT_ADDRESS } from "../../main";

export async function processAllOffers(
  ctx: DataHandlerContext<Store, any>,
  blockHeader: any,
  processedOfferIds: Set<string>
) {
  const contract = new marketplaceAbi.Contract(
    ctx,
    blockHeader,
    MARKETPLACE_CONTRACT_ADDRESS.toLowerCase()
  );

  const totalOffers = await contract.totalOffers();
  console.log("Total offers:", totalOffers.toString());

  const lastProcessedOffer = await ctx.store.findOne(AllOffers, {
    order: { offerId: "DESC" },
    where: {},
  });

  const startIndex = lastProcessedOffer
    ? Number(lastProcessedOffer.offerId) + 1
    : 0;
  const endIndex = Number(totalOffers) - 1;

  const newAllOffers: AllOffers[] = [];
  const newCompletedOffers: CompletedOffers[] = [];

  if (startIndex <= endIndex) {
    const newOffers = await contract.getAllOffers(startIndex, endIndex);
    console.log(`Fetching offers from ${startIndex} to ${endIndex}`);

    for (const offer of newOffers) {
      if (
        offer.status === 1 &&
        !processedOfferIds.has(offer.offerId.toString())
      ) {
        newAllOffers.push(
          new AllOffers({
            id: uuidv4(),
            offerId: offer.offerId,
            tokenId: offer.tokenId,
            quantity: offer.quantity,
            totalPrice: offer.totalPrice,
            expirationTimestamp: offer.expirationTimestamp,
            offeror: offer.offeror,
            assetContract: offer.assetContract,
            currency: offer.currency,
            tokenType: offer.tokenType,
            status: offer.status,
          })
        );
        processedOfferIds.add(offer.offerId.toString());
      }

      if (
        offer.status === 2 &&
        !processedOfferIds.has(offer.offerId.toString())
      ) {
        newCompletedOffers.push(
          new CompletedOffers({
            id: uuidv4(),
            offerId: offer.offerId,
            tokenId: offer.tokenId,
            quantity: offer.quantity,
            totalPrice: offer.totalPrice,
            expirationTimestamp: offer.expirationTimestamp,
            offeror: offer.offeror,
            assetContract: offer.assetContract,
            currency: offer.currency,
            tokenType: offer.tokenType,
            status: offer.status,
          })
        );
        processedOfferIds.add(offer.offerId.toString());
      }
    }
  }

  return {
    newAllOffers,
    newCompletedOffers,
    updatedProcessedOfferIds: processedOfferIds,
  };
}
