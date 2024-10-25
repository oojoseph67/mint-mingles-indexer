import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, StringColumn as StringColumn_, Index as Index_, BigIntColumn as BigIntColumn_, IntColumn as IntColumn_, BooleanColumn as BooleanColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class NewListing {
    constructor(props?: Partial<NewListing>) {
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

    @BigIntColumn_({nullable: false})
    tokenId!: bigint

    @BigIntColumn_({nullable: false})
    quantity!: bigint

    @BigIntColumn_({nullable: false})
    pricePerToken!: bigint

    @BigIntColumn_({nullable: true})
    startTimestamp!: bigint | undefined | null

    @BigIntColumn_({nullable: false})
    endTimestamp!: bigint

    @StringColumn_({nullable: false})
    assetContract!: string

    @StringColumn_({nullable: false})
    currency!: string

    @IntColumn_({nullable: false})
    tokenType!: number

    @IntColumn_({nullable: false})
    status!: number

    @BooleanColumn_({nullable: false})
    reserved!: boolean

    @StringColumn_({nullable: false})
    transactionHash!: string
}
