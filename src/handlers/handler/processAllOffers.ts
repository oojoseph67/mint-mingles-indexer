import { AllOffers, CompletedOffers, NFT } from "../../model";
import { v4 as uuidv4 } from "uuid";
import * as marketplaceAbi from "../../abi/marketplaceABI";
import {
  BlockType,
  ContextType,
  MARKETPLACE_CONTRACT_ADDRESS,
} from "../../main";
import { saveNFT } from "../../utils/blockchain";

export async function processAllOffers(
  ctx: ContextType,
  blockHeader: BlockType,
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
      if (!processedOfferIds.has(offer.offerId.toString())) {
        await saveNFT({
          contractAddress: offer.assetContract,
          tokenId: offer.tokenId,
          ctx: ctx,
        });

        if (offer.status === 1) {
          const nft = await ctx.store.findOne(NFT, {
            where: {
              tokenId: offer.tokenId,
              assetContract: offer.assetContract.toLowerCase(),
            },
          });

          newAllOffers.push(
            new AllOffers({
              id: uuidv4(),
              offerId: offer.offerId,
              tokenId: offer.tokenId,
              quantity: offer.quantity,
              totalPrice: offer.totalPrice,
              expirationTimestamp: offer.expirationTimestamp,
              offeror: offer.offeror,
              assetContract: offer.assetContract.toLowerCase(),
              currency: offer.currency,
              tokenType: offer.tokenType,
              status: offer.status,
              nft: nft,
            })
          );
          processedOfferIds.add(offer.offerId.toString());
        } else if (offer.status === 2) {
          const nft = await ctx.store.findOne(NFT, {
            where: {
              tokenId: offer.tokenId,
              assetContract: offer.assetContract.toLowerCase(),
            },
          });

          newCompletedOffers.push(
            new CompletedOffers({
              id: uuidv4(),
              offerId: offer.offerId,
              tokenId: offer.tokenId,
              quantity: offer.quantity,
              totalPrice: offer.totalPrice,
              expirationTimestamp: offer.expirationTimestamp,
              offeror: offer.offeror,
              assetContract: offer.assetContract.toLowerCase(),
              currency: offer.currency,
              tokenType: offer.tokenType,
              status: offer.status,
              nft: nft,
            })
          );
          processedOfferIds.add(offer.offerId.toString());
        }
      }
    }
  }

  return {
    newAllOffers,
    newCompletedOffers,
    updatedProcessedOfferIds: processedOfferIds,
  };
}
