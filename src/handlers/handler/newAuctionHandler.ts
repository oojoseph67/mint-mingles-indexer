import * as marketplaceAbi from "../../abi/marketplaceABI";
import { ContextType, LogType } from "../../main";
import { NewAuction, NFT } from "../../model";
import { saveNFT } from "../../utils/blockchain";

export async function handleNewAuction({
  ctx,
  log,
}: {
  ctx: ContextType;
  log: LogType;
}): Promise<NewAuction> {
  let { assetContract, auction, auctionCreator, auctionId } =
    marketplaceAbi.events.NewAuction.decode(log);

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

  return new NewAuction({
    id: log.id,
    auctionId: auctionId,
    assetContract: assetContract.toLowerCase(),
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
    nft: nft,
  });
}
