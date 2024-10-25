import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, BigIntColumn as BigIntColumn_, StringColumn as StringColumn_, IntColumn as IntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class CompletedOffers {
    constructor(props?: Partial<CompletedOffers>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @BigIntColumn_({nullable: false})
    offerId!: bigint

    @BigIntColumn_({nullable: false})
    tokenId!: bigint

    @BigIntColumn_({nullable: false})
    quantity!: bigint

    @BigIntColumn_({nullable: false})
    totalPrice!: bigint

    @BigIntColumn_({nullable: false})
    expirationTimestamp!: bigint

    @StringColumn_({nullable: false})
    offeror!: string

    @StringColumn_({nullable: false})
    assetContract!: string

    @StringColumn_({nullable: false})
    currency!: string

    @IntColumn_({nullable: false})
    tokenType!: number

    @IntColumn_({nullable: false})
    status!: number
}
