import * as marketplaceAbi from "../../abi/marketplaceABI";
import { ContextType, LogType } from "../../main";
import { NewBid, NFT } from "../../model";
import { saveNFT } from "../../utils/blockchain";

export async function handleNewBid({
  ctx,
  log,
}: {
  ctx: ContextType;
  log: LogType;
}): Promise<NewBid> {
  let { assetContract, auction, auctionId, bidAmount, bidder } =
    marketplaceAbi.events.NewBid.decode(log);

  await saveNFT({
    contractAddress: assetContract,
    tokenId: auction.tokenId,
    ctx: ctx,
  });

  const nft = await ctx.store.findOne(NFT, {
    where: {
      tokenId: auction.tokenId,
      assetContract: assetContract.toLowerCase(),
    },
  });

  return new NewBid({
    id: log.id,
    auctionId: auctionId,
    bidder: bidder,
    assetContract: assetContract.toLowerCase(),
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
    nft: nft,
  });
}
