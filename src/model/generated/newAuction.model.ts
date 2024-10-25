import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, BigIntColumn as BigIntColumn_, Index as Index_, StringColumn as StringColumn_, IntColumn as IntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class NewAuction {
    constructor(props?: Partial<NewAuction>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_()
    @BigIntColumn_({nullable: false})
    auctionId!: bigint

    @Index_()
    @BigIntColumn_({nullable: false})
    tokenId!: bigint

    @BigIntColumn_({nullable: false})
    quantity!: bigint

    @BigIntColumn_({nullable: false})
    minimumBidAmount!: bigint

    @BigIntColumn_({nullable: false})
    buyoutBidAmount!: bigint

    @BigIntColumn_({nullable: false})
    timeBufferInSeconds!: bigint

    @BigIntColumn_({nullable: false})
    bidBufferBps!: bigint

    @BigIntColumn_({nullable: false})
    startTimestamp!: bigint

    @BigIntColumn_({nullable: false})
    endTimestamp!: bigint

    @StringColumn_({nullable: false})
    auctionCreator!: string

    @StringColumn_({nullable: false})
    assetContract!: string

    @StringColumn_({nullable: false})
    currency!: string

    @IntColumn_({nullable: false})
    tokenType!: number

    @IntColumn_({nullable: false})
    status!: number

    @StringColumn_({nullable: false})
    transactionHash!: string
}
