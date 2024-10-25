module.exports = class Data1729846353381 {
    name = 'Data1729846353381'

    async up(db) {
        await db.query(`ALTER TABLE "new_listing" DROP COLUMN "block"`)
    }

    async down(db) {
        await db.query(`ALTER TABLE "new_listing" ADD "block" integer NOT NULL`)
    }
}
