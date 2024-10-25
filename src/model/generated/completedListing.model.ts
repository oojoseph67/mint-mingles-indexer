import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, BigIntColumn as BigIntColumn_, StringColumn as StringColumn_, IntColumn as IntColumn_, BooleanColumn as BooleanColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class CompletedListing {
    constructor(props?: Partial<CompletedListing>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @BigIntColumn_({nullable: false})
    listingId!: bigint

    @BigIntColumn_({nullable: false})
    tokenId!: bigint

    @BigIntColumn_({nullable: false})
    quantity!: bigint

    @BigIntColumn_({nullable: false})
    pricePerToken!: bigint

    @BigIntColumn_({nullable: false})
    startTimestamp!: bigint

    @BigIntColumn_({nullable: false})
    endTimestamp!: bigint

    @StringColumn_({nullable: false})
    listingCreator!: string

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
}
