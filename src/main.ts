import { EvmBatchProcessor } from "@subsquid/evm-processor";
import { TypeormDatabase } from "@subsquid/typeorm-store";
import * as marketplaceAbi from "./abi/marketplaceABI";
import {
  AllAuction,
  AllListing,
  AuctionClosed,
  CompletedAuction,
  CompletedListing,
  NewAuction,
  NewListing,
  NewSaleListing,
} from "./model";
import {
  handleAuctionClosed,
  handleCancelledAuction,
  handleCancelledListing,
  handleNewAuction,
  handleNewListing,
  handleNewSale,
  handleUpdatedListing,
  processAllAuctions,
  processAllListings,
} from "./handlers";

export const MARKETPLACE_CONTRACT_ADDRESS =
  "0x7Ed11a18630a9E569882Ca2F4D3488A88eF45d28";

const contractFirstBlock = 4883457;
const defaultBlock = 5738062;

const processor = new EvmBatchProcessor()
  .setGateway("https://v2.archive.subsquid.io/network/crossfi-testnet")
  .setRpcEndpoint("https://rpc.xfi.ms/archive/4157")
  .setFinalityConfirmation(75)
  .addLog({
    range: { from: 5743489 },
    address: [MARKETPLACE_CONTRACT_ADDRESS],

    topic0: [
      // new listing/auction events topic
      marketplaceAbi.events.NewListing.topic,
      marketplaceAbi.events.NewAuction.topic,

      // cancelled listing/auction events topic
      marketplaceAbi.events.CancelledListing.topic,
      marketplaceAbi.events.CancelledAuction.topic,

      // updated listing event topic
      marketplaceAbi.events.UpdatedListing.topic,

      // new sale event topic
      marketplaceAbi.events.NewSale.topic,

      // closed auction event topic
      marketplaceAbi.events.AuctionClosed.topic,
    ],
  })
  .setBlockRange({ from: 5743489 })
  .includeAllBlocks({ from: 5743489 })
  .setFields({
    log: {
      transactionHash: true,
    },
  });

const db = new TypeormDatabase({ supportHotBlocks: true });

processor.run(db, async (ctx) => {
  console.log("Processing batch");

  const newListings: NewListing[] = [];
  const newAuctions: NewAuction[] = [];
  const newSaleListings: NewSaleListing[] = [];
  const auctionClosed: AuctionClosed[] = [];
  const allListings: AllListing[] = [];
  const completedListings: CompletedListing[] = [];
  const allAuctions: AllAuction[] = [];
  const completedAuctions: CompletedAuction[] = [];

  let processedListingIds = new Set<string>();
  let processedAuctionIds = new Set<string>();
  for (let block of ctx.blocks) {
    console.log("Inside block loop");
    console.log("Processing block:", block.header.height);
    // On EVM, each block has four iterables - logs, transactions, traces,
    // stateDiffs

    for (let log of block.logs) {
      const isMarketplaceContract =
        log.address.toLowerCase() ===
        MARKETPLACE_CONTRACT_ADDRESS.toLowerCase();

      if (isMarketplaceContract) {
        console.log("Inside marketplace contract if statement");

        switch (log.topics[0].toLowerCase()) {
          case marketplaceAbi.events.NewListing.topic.toLowerCase():
            newListings.push(await handleNewListing(log));
            break;
          case marketplaceAbi.events.NewAuction.topic.toLowerCase():
            newAuctions.push(await handleNewAuction(log));
            break;
          case marketplaceAbi.events.CancelledListing.topic.toLowerCase():
            await handleCancelledListing(ctx, log);
            break;
          case marketplaceAbi.events.CancelledAuction.topic.toLowerCase():
            await handleCancelledAuction(ctx, log);
            break;
          case marketplaceAbi.events.UpdatedListing.topic.toLowerCase():
            await handleUpdatedListing(ctx, log);
            break;
          case marketplaceAbi.events.NewSale.topic.toLowerCase():
            newSaleListings.push(await handleNewSale(ctx, log));
            break;
          case marketplaceAbi.events.AuctionClosed.topic.toLowerCase():
            auctionClosed.push(await handleAuctionClosed(ctx, log));
            break;
        }
      }
    }

    // const contract = new marketplaceAbi.Contract(
    //   ctx,
    //   block.header,
    //   MARKETPLACE_CONTRACT_ADDRESS.toLowerCase()
    // );

    const { newAllListings, newCompletedListings, updatedProcessedListingIds } =
      await processAllListings(ctx, block.header, processedListingIds);

    allListings.push(...newAllListings);
    completedListings.push(...newCompletedListings);
    processedListingIds = updatedProcessedListingIds;

    const { newAllAuctions, newCompletedAuctions, updatedProcessedAuctionIds } =
      await processAllAuctions(ctx, block.header, processedAuctionIds);

    allAuctions.push(...newAllAuctions);
    completedAuctions.push(...newCompletedAuctions);
    processedAuctionIds = updatedProcessedAuctionIds;
  }

  // Just one insert per batch!
  await ctx.store.insert(newListings);
  await ctx.store.insert(newAuctions);
  await ctx.store.insert(newSaleListings);
  await ctx.store.insert(auctionClosed);

  if (allListings.length > 0) {
    await ctx.store.insert(allListings);
  }

  if (completedListings.length > 0) {
    await ctx.store.insert(completedListings);
  }

  if (allAuctions.length > 0) {
    await ctx.store.insert(allAuctions);
  }

  if (completedAuctions.length > 0) {
    await ctx.store.insert(completedAuctions);
  }
});
