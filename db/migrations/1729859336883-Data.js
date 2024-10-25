module.exports = class Data1729859336883 {
    name = 'Data1729859336883'

    async up(db) {
        await db.query(`CREATE TABLE "new_listing" ("id" character varying NOT NULL, "listing_creator" text NOT NULL, "listing_id" numeric NOT NULL, "token_id" numeric NOT NULL, "quantity" numeric NOT NULL, "price_per_token" numeric NOT NULL, "start_timestamp" numeric, "end_timestamp" numeric NOT NULL, "asset_contract" text NOT NULL, "currency" text NOT NULL, "token_type" integer NOT NULL, "status" integer NOT NULL, "reserved" boolean NOT NULL, "transaction_hash" text NOT NULL, CONSTRAINT "PK_b488e12815dbd3bf227ff7221b6" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_52d2aee4957b27432a6c18b3ac" ON "new_listing" ("listing_creator") `)
        await db.query(`CREATE INDEX "IDX_afae6c5b3a1adc7580fab7497e" ON "new_listing" ("listing_id") `)
        await db.query(`CREATE TABLE "new_auction" ("id" character varying NOT NULL, "auction_id" numeric NOT NULL, "token_id" numeric NOT NULL, "quantity" numeric NOT NULL, "minimum_bid_amount" numeric NOT NULL, "buyout_bid_amount" numeric NOT NULL, "time_buffer_in_seconds" numeric NOT NULL, "bid_buffer_bps" numeric NOT NULL, "start_timestamp" numeric NOT NULL, "end_timestamp" numeric NOT NULL, "auction_creator" text NOT NULL, "asset_contract" text NOT NULL, "currency" text NOT NULL, "token_type" integer NOT NULL, "status" integer NOT NULL, "transaction_hash" text NOT NULL, CONSTRAINT "PK_6b69f4ff181720f5ecd013e2e69" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_79bfdcf3a07f181152c9e246f0" ON "new_auction" ("auction_id") `)
        await db.query(`CREATE INDEX "IDX_6c7098939ad9d5fe2d153fb6a3" ON "new_auction" ("token_id") `)
        await db.query(`CREATE TABLE "new_sale_listing" ("id" character varying NOT NULL, "listing_creator" text NOT NULL, "listing_id" numeric NOT NULL, "asset_contract" text NOT NULL, "token_id" numeric NOT NULL, "buyer" text NOT NULL, "quantity_bought" numeric NOT NULL, "total_price_paid" numeric NOT NULL, "transaction_hash" text NOT NULL, CONSTRAINT "PK_18485428fcfb10fc2380f5e13b5" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_1d731a50584eba24e1beaae981" ON "new_sale_listing" ("listing_creator") `)
        await db.query(`CREATE INDEX "IDX_56579d70e6859b75fd3edca5be" ON "new_sale_listing" ("listing_id") `)
        await db.query(`CREATE INDEX "IDX_7b169e419df33050caecdae1d2" ON "new_sale_listing" ("asset_contract") `)
        await db.query(`CREATE TABLE "auction_closed" ("id" character varying NOT NULL, "auction_id" numeric NOT NULL, "asset_contract" text NOT NULL, "closer" text NOT NULL, "token_id" numeric NOT NULL, "auction_creator" text NOT NULL, "winning_bidder" text NOT NULL, "transaction_hash" text NOT NULL, CONSTRAINT "PK_b04a98ad26acc9309830bf11eec" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_d2e1634168693b877c85218121" ON "auction_closed" ("auction_id") `)
        await db.query(`CREATE INDEX "IDX_a0c67476a82748dfa9f1f7feab" ON "auction_closed" ("asset_contract") `)
        await db.query(`CREATE INDEX "IDX_7bb0cfc2e72302638d8f9c611d" ON "auction_closed" ("closer") `)
        await db.query(`CREATE TABLE "all_listing" ("id" character varying NOT NULL, "listing_id" numeric NOT NULL, "token_id" numeric NOT NULL, "quantity" numeric NOT NULL, "price_per_token" numeric NOT NULL, "start_timestamp" numeric NOT NULL, "end_timestamp" numeric NOT NULL, "listing_creator" text NOT NULL, "asset_contract" text NOT NULL, "currency" text NOT NULL, "token_type" integer NOT NULL, "status" integer NOT NULL, "reserved" boolean NOT NULL, CONSTRAINT "PK_614454c94a2f72e905ca1eb87fd" PRIMARY KEY ("id"))`)
    }

    async down(db) {
        await db.query(`DROP TABLE "new_listing"`)
        await db.query(`DROP INDEX "public"."IDX_52d2aee4957b27432a6c18b3ac"`)
        await db.query(`DROP INDEX "public"."IDX_afae6c5b3a1adc7580fab7497e"`)
        await db.query(`DROP TABLE "new_auction"`)
        await db.query(`DROP INDEX "public"."IDX_79bfdcf3a07f181152c9e246f0"`)
        await db.query(`DROP INDEX "public"."IDX_6c7098939ad9d5fe2d153fb6a3"`)
        await db.query(`DROP TABLE "new_sale_listing"`)
        await db.query(`DROP INDEX "public"."IDX_1d731a50584eba24e1beaae981"`)
        await db.query(`DROP INDEX "public"."IDX_56579d70e6859b75fd3edca5be"`)
        await db.query(`DROP INDEX "public"."IDX_7b169e419df33050caecdae1d2"`)
        await db.query(`DROP TABLE "auction_closed"`)
        await db.query(`DROP INDEX "public"."IDX_d2e1634168693b877c85218121"`)
        await db.query(`DROP INDEX "public"."IDX_a0c67476a82748dfa9f1f7feab"`)
        await db.query(`DROP INDEX "public"."IDX_7bb0cfc2e72302638d8f9c611d"`)
        await db.query(`DROP TABLE "all_listing"`)
    }
}
