module.exports = class Data1729849078946 {
    name = 'Data1729849078946'

    async up(db) {
        await db.query(`CREATE TABLE "new_listing" ("id" character varying NOT NULL, "listing_creator" text NOT NULL, "listing_id" numeric NOT NULL, "token_id" numeric NOT NULL, "quantity" numeric NOT NULL, "price_per_token" numeric NOT NULL, "start_timestamp" numeric, "end_timestamp" numeric NOT NULL, "asset_contract" text NOT NULL, "currency" text NOT NULL, "token_type" integer NOT NULL, "status" integer NOT NULL, "reserved" boolean NOT NULL, "transaction_hash" text NOT NULL, CONSTRAINT "PK_b488e12815dbd3bf227ff7221b6" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_52d2aee4957b27432a6c18b3ac" ON "new_listing" ("listing_creator") `)
        await db.query(`CREATE INDEX "IDX_afae6c5b3a1adc7580fab7497e" ON "new_listing" ("listing_id") `)
        await db.query(`CREATE TABLE "new_auction" ("id" character varying NOT NULL, "auction_id" numeric NOT NULL, "token_id" numeric NOT NULL, "quantity" numeric NOT NULL, "minimum_bid_amount" numeric NOT NULL, "buyout_bid_amount" numeric NOT NULL, "time_buffer_in_seconds" numeric NOT NULL, "bid_buffer_bps" numeric NOT NULL, "start_timestamp" numeric NOT NULL, "end_timestamp" numeric NOT NULL, "auction_creator" text NOT NULL, "asset_contract" text NOT NULL, "currency" text NOT NULL, "token_type" integer NOT NULL, "status" integer NOT NULL, "transaction_hash" text NOT NULL, CONSTRAINT "PK_6b69f4ff181720f5ecd013e2e69" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_79bfdcf3a07f181152c9e246f0" ON "new_auction" ("auction_id") `)
        await db.query(`CREATE INDEX "IDX_6c7098939ad9d5fe2d153fb6a3" ON "new_auction" ("token_id") `)
    }

    async down(db) {
        await db.query(`DROP TABLE "new_listing"`)
        await db.query(`DROP INDEX "public"."IDX_52d2aee4957b27432a6c18b3ac"`)
        await db.query(`DROP INDEX "public"."IDX_afae6c5b3a1adc7580fab7497e"`)
        await db.query(`DROP TABLE "new_auction"`)
        await db.query(`DROP INDEX "public"."IDX_79bfdcf3a07f181152c9e246f0"`)
        await db.query(`DROP INDEX "public"."IDX_6c7098939ad9d5fe2d153fb6a3"`)
    }
}
