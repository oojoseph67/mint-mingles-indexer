import { EvmBatchProcessor } from "@subsquid/evm-processor";
import { TypeormDatabase } from "@subsquid/typeorm-store";
import * as marketplaceAbi from "./abi/marketplaceABI";
import { AuctionClosed, NewAuction, NewListing, NewSaleListing } from "./model";

const MARKETPLACE_CONTRACT_ADDRESS =
  "0x7Ed11a18630a9E569882Ca2F4D3488A88eF45d28";

const processor = new EvmBatchProcessor()
  .setGateway("https://v2.archive.subsquid.io/network/crossfi-testnet")
  .setRpcEndpoint("https://rpc.xfi.ms/archive/4157")
  .setFinalityConfirmation(75)
  .addLog({
    range: { from: 5738062 },
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
  .setBlockRange({ from: 5738062 })
  .includeAllBlocks({ from: 5738062 })
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

  for (let block of ctx.blocks) {
    console.log("Inside block loop");
    console.log({ block });
    // On EVM, each block has four iterables - logs, transactions, traces,
    // stateDiffs
    for (let log of block.logs) {
      console.log("Inside log loop");
      console.log({ log });

      const isMarketplaceContract =
        log.address.toLowerCase() ===
        MARKETPLACE_CONTRACT_ADDRESS.toLowerCase();
      console.log({ isMarketplaceContract });

      // NEW LISTING EVENT
      if (
        isMarketplaceContract &&
        log.topics[0] === marketplaceAbi.events.NewListing.topic
      ) {
        console.log("Inside new listing if statement");
        let { assetContract, listing, listingCreator, listingId } =
          marketplaceAbi.events.NewListing.decode(log);
        console.log({ listing });
        newListings.push(
          new NewListing({
            id: log.id,
            listingCreator: listingCreator,
            listingId: listingId,
            assetContract: assetContract,
            tokenId: listing.tokenId,
            quantity: listing.quantity,
            pricePerToken: listing.pricePerToken,
            startTimestamp: listing.startTimestamp,
            endTimestamp: listing.endTimestamp,
            currency: listing.currency,
            tokenType: listing.tokenType,
            status: listing.status,
            reserved: listing.reserved,
            transactionHash: log.transactionHash,
          })
        );
      }

      // NEW AUCTION EVENT
      if (
        isMarketplaceContract &&
        log.topics[0] === marketplaceAbi.events.NewAuction.topic
      ) {
        console.log("Inside new auction if statement");

        let { assetContract, auction, auctionCreator, auctionId } =
          marketplaceAbi.events.NewAuction.decode(log);
        console.log({ auction });

        newAuctions.push(
          new NewAuction({
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
          })
        );
      }

      // CANCELLED LISTING EVENT
      if (
        isMarketplaceContract &&
        log.topics[0] === marketplaceAbi.events.CancelledListing.topic
      ) {
        console.log("Inside cancelled listing if statement");
        let { listingId } = marketplaceAbi.events.CancelledListing.decode(log);

        // Delete the listing from the database where listingId matches
        const listingToRemove = await ctx.store.findOne(NewListing, {
          where: { listingId: listingId },
        });

        // Remove the listing if it exists
        if (listingToRemove) {
          await ctx.store.remove(NewListing, listingToRemove.id);
        }
      }

      // CANCELLED AUCTION EVENT
      if (
        isMarketplaceContract &&
        log.topics[0] === marketplaceAbi.events.CancelledAuction.topic
      ) {
        console.log("Inside cancelled auction if statement");
        let { auctionId } = marketplaceAbi.events.CancelledAuction.decode(log);

        // Delete the auction from the database where auctionId matches
        const auctionToRemove = await ctx.store.findOne(NewAuction, {
          where: { auctionId: auctionId },
        });

        // Remove the auction if it exists
        if (auctionToRemove) {
          await ctx.store.remove(NewAuction, auctionToRemove.id);
        }
      }

      // UPDATED LISTING EVENT
      if (
        isMarketplaceContract &&
        log.topics[0] === marketplaceAbi.events.UpdatedListing.topic
      ) {
        console.log("Inside updated listing if statement");
        let { listingId, assetContract, listing, listingCreator } =
          marketplaceAbi.events.UpdatedListing.decode(log);
        console.log({ listing });

        // Find the listing to update in the database where listingId matches
        const listingToUpdate = await ctx.store.findOne(NewListing, {
          where: { listingId: listingId },
        });

        // Update the listing if it exists
        if (listingToUpdate) {
          const updatedData = {
            listingCreator: listingCreator,
            listingId: listingId,
            assetContract: assetContract,
            tokenId: listing.tokenId,
            quantity: listing.quantity,
            pricePerToken: listing.pricePerToken,
            startTimestamp: listing.startTimestamp,
            endTimestamp: listing.endTimestamp,
            currency: listing.currency,
            tokenType: listing.tokenType,
            status: listing.status,
            reserved: listing.reserved,
            transactionHash: log.transactionHash,
          };
          // Update the listing with new data
          Object.assign(listingToUpdate, updatedData);
          await ctx.store.save(listingToUpdate);
        }
      }

      // NEW SALE LISTING EVENT
      if (
        isMarketplaceContract &&
        log.topics[0] === marketplaceAbi.events.NewSale.topic
      ) {
        console.log("Inside new sale if statement");

        let {
          listingId,
          assetContract,
          tokenId,
          quantityBought,
          totalPricePaid,
          buyer,
          listingCreator,
        } = marketplaceAbi.events.NewSale.decode(log);

        newSaleListings.push(
          new NewSaleListing({
            id: log.id,
            listingCreator: listingCreator,
            listingId: listingId,
            assetContract: assetContract,
            tokenId: tokenId,
            quantityBought: quantityBought,
            totalPricePaid: totalPricePaid,
            buyer: buyer,
            transactionHash: log.transactionHash,
          })
        );

        // this is to remove the listing from the new-listing database after it has been sold
        const listingToRemove = await ctx.store.findOne(NewListing, {
          where: { listingId: listingId },
        });

        if (listingToRemove) {
          await ctx.store.remove(NewListing, listingToRemove.id);
        }
      }

      // AUCTION CLOSED EVENT (Auction was completed)
      if (
        isMarketplaceContract &&
        log.topics[0] === marketplaceAbi.events.AuctionClosed.topic
      ) {
        console.log("Inside auction closed if statement");

        let {
          assetContract,
          auctionId,
          closer,
          tokenId,
          auctionCreator,
          winningBidder,
        } = marketplaceAbi.events.AuctionClosed.decode(log);

        auctionClosed.push(
          new AuctionClosed({
            id: log.id,
            auctionId: auctionId,
            assetContract: assetContract,
            closer: closer,
            tokenId: tokenId,
            auctionCreator: auctionCreator,
            winningBidder: winningBidder,
            transactionHash: log.transactionHash,
          })
        );

        // this is to remove the auction from the new-auction database after it has been closed
        const auctionToRemove = await ctx.store.findOne(NewAuction, {
          where: { auctionId: auctionId },
        });

        if (auctionToRemove) {
          await ctx.store.remove(NewAuction, auctionToRemove.id);
        }
      }
    }
  }

  // Just one insert per batch!
  await ctx.store.insert(newListings);
  await ctx.store.insert(newAuctions);
  await ctx.store.insert(newSaleListings);
  await ctx.store.insert(auctionClosed);
});
