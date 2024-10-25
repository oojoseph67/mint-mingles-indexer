import * as marketplaceAbi from "../../abi/marketplaceABI";
import { NewBid } from "../../model";
import { DataHandlerContext } from "@subsquid/evm-processor";
import { Store } from "@subsquid/typeorm-store";

export async function handleNewBid(
  ctx: DataHandlerContext<Store, any>,
  log: any
): Promise<NewBid> {
  let { assetContract, auction, auctionId, bidAmount, bidder } =
    marketplaceAbi.events.NewBid.decode(log);

  return new NewBid({
    id: log.id,
    auctionId: auctionId,
    bidder: bidder,
    assetContract: assetContract,
    bidAmount: bidAmount,
    minimumBidAmount: auction.minimumBidAmount,
    buyoutBidAmount: auction.buyoutBidAmount,
    timeBufferInSeconds: auction.timeBufferInSeconds,
    bidBufferBps: auction.bidBufferBps,
    startTimestamp: auction.startTimestamp,
    endTimestamp: auction.endTimestamp,
    auctionCreator: auction.auctionCreator,
    currency: auction.currency,
    tokenType: auction.tokenType,
    status: auction.status,
    quantity: auction.quantity,
    tokenId: auction.tokenId,
  });
}
