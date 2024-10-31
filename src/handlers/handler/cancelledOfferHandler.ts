import * as marketplaceAbi from "../../abi/marketplaceABI";
import { ContextType, LogType } from "../../main";
import { NewOffer } from "../../model";

export async function handleCancelledOffer(
  ctx: ContextType,
  log: LogType
): Promise<void> {
  let { offerId } = marketplaceAbi.events.CancelledOffer.decode(log);

  const offerToRemove = await ctx.store.findOne(NewOffer, {
    where: { offerId: offerId },
  });

  if (offerToRemove) {
    await ctx.store.remove(NewOffer, offerToRemove.id);
  }
}
