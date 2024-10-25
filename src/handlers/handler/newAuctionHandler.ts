import * as marketplaceAbi from "../../abi/marketplaceABI";
import { NewAuction } from "../../model";

export async function handleNewAuction(log: any): Promise<NewAuction> {
  let { assetContract, auction, auctionCreator, auctionId } =
    marketplaceAbi.events.NewAuction.decode(log);

  return new NewAuction({
    id: log.id,
    auctionId: auctionId,
    assetContract: assetContract,
    tokenId: auction.tokenId,
    quantity: auction.quantity,
    minimumBidAmount: auction.minimumBidAmount,
    buyoutBidAmount: auction.buyoutBidAmount,
    timeBufferInSeconds: auction.timeBufferInSeconds,
    bidBufferBps: auction.bidBufferBps,
    startTimestamp: auction.startTimestamp,
    endTimestamp: auction.endTimestamp,
    auctionCreator: auctionCreator,
    currency: auction.currency,
    tokenType: auction.tokenType,
    status: auction.status,
    transactionHash: log.transactionHash,
  });
}
