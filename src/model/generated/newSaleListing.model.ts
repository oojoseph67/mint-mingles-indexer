import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, StringColumn as StringColumn_, Index as Index_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class NewSaleListing {
    constructor(props?: Partial<NewSaleListing>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_()
    @StringColumn_({nullable: false})
    listingCreator!: string

    @Index_()
    @BigIntColumn_({nullable: false})
    listingId!: bigint

    @Index_()
    @StringColumn_({nullable: false})
    assetContract!: string

    @BigIntColumn_({nullable: false})
    tokenId!: bigint

    @StringColumn_({nullable: false})
    buyer!: string

    @BigIntColumn_({nullable: false})
    quantityBought!: bigint

    @BigIntColumn_({nullable: false})
    totalPricePaid!: bigint

    @StringColumn_({nullable: false})
    transactionHash!: string
}
