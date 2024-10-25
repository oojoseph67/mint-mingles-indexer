module.exports = class Data1729839820541 {
    name = 'Data1729839820541'

    async up(db) {
        await db.query(`CREATE TABLE "new_listing" ("id" character varying NOT NULL, "listing_creator" text NOT NULL, "listing_id" integer NOT NULL, "asset_contract" text NOT NULL, CONSTRAINT "PK_b488e12815dbd3bf227ff7221b6" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_52d2aee4957b27432a6c18b3ac" ON "new_listing" ("listing_creator") `)
        await db.query(`CREATE INDEX "IDX_afae6c5b3a1adc7580fab7497e" ON "new_listing" ("listing_id") `)
    }

    async down(db) {
        await db.query(`DROP TABLE "new_listing"`)
        await db.query(`DROP INDEX "public"."IDX_52d2aee4957b27432a6c18b3ac"`)
        await db.query(`DROP INDEX "public"."IDX_afae6c5b3a1adc7580fab7497e"`)
    }
}
