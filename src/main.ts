import { EvmBatchProcessor } from "@subsquid/evm-processor";
import { TypeormDatabase } from "@subsquid/typeorm-store";
import * as marketplaceAbi from "./abi/marketplaceABI";
import { NewListing } from "./model";

const MARKETPLACE_CONTRACT_ADDRESS =
  "0x7Ed11a18630a9E569882Ca2F4D3488A88eF45d28";

const processor = new EvmBatchProcessor()
  .setGateway("https://v2.archive.subsquid.io/network/crossfi-testnet")
  .setRpcEndpoint("https://rpc.xfi.ms/archive/4157")
  .setFinalityConfirmation(75)
  .addLog({
    range: { from: 5738062 },
    address: [MARKETPLACE_CONTRACT_ADDRESS],
    topic0: [marketplaceAbi.events.NewListing.topic],
  })
  .setBlockRange({ from: 5738062 })
  .setFields({
    log: {
      transactionHash: true,
    },
  });

const db = new TypeormDatabase({ supportHotBlocks: true });

processor.run(db, async (ctx) => {
  console.log("Processing batch");
  const newListings: NewListing[] = [];

  for (let block of ctx.blocks) {
    console.log("Inside block loop");
    // On EVM, each block has four iterables - logs, transactions, traces,
    // stateDiffs
    for (let log of block.logs) {
      console.log("Inside log loop");
      console.log({ log });
      if (
        log.address.toLowerCase() ===
          MARKETPLACE_CONTRACT_ADDRESS.toLowerCase() &&
        log.topics[0] === marketplaceAbi.events.NewListing.topic
      ) {
        console.log("Inside if statement");
        let { assetContract, listing, listingCreator, listingId } =
          marketplaceAbi.events.NewListing.decode(log);
        console.log({ listing });
        newListings.push(
          new NewListing({
            id: log.id,
            listingCreator,
            listingId: Number(listingId),
            assetContract: assetContract,
            tokenId: Number(listing.tokenId),
            quantity: Number(listing.quantity),
            pricePerToken: Number(listing.pricePerToken),
            startTimestamp: Number(listing.startTimestamp),
            endTimestamp: Number(listing.endTimestamp),
            currency: listing.currency,
            tokenType: Number(listing.tokenType),
            status: Number(listing.status),
            reserved: listing.reserved,
            transactionHash: log.transactionHash,
          })
        );
      }
    }
  }

  // Just one insert per batch!
  await ctx.store.insert(newListings);
});
