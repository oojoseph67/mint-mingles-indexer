import * as marketplaceAbi from "../../abi/marketplaceABI";
import { NewOffer } from "../../model";
import { DataHandlerContext } from "@subsquid/evm-processor";
import { Store } from "@subsquid/typeorm-store";

export async function handleCancelledOffer(
  ctx: DataHandlerContext<Store, any>,
  log: any
): Promise<void> {
  let { offerId } = marketplaceAbi.events.CancelledOffer.decode(log);

  const offerToRemove = await ctx.store.findOne(NewOffer, {
    where: { offerId: offerId },
  });

  if (offerToRemove) {
    await ctx.store.remove(NewOffer, offerToRemove.id);
  }
}
