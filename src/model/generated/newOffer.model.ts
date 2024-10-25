import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_, IntColumn as IntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class NewOffer {
    constructor(props?: Partial<NewOffer>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @StringColumn_({nullable: false})
    offeror!: string

    @BigIntColumn_({nullable: false})
    offerId!: bigint

    @StringColumn_({nullable: false})
    assetContract!: string

    @BigIntColumn_({nullable: false})
    tokenId!: bigint

    @BigIntColumn_({nullable: false})
    quantity!: bigint

    @BigIntColumn_({nullable: false})
    totalPrice!: bigint

    @BigIntColumn_({nullable: false})
    expirationTimestamp!: bigint

    @StringColumn_({nullable: false})
    currency!: string

    @IntColumn_({nullable: false})
    tokenType!: number

    @IntColumn_({nullable: false})
    status!: number

    @StringColumn_({nullable: false})
    transactionHash!: string
}
