import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, BigIntColumn as BigIntColumn_, StringColumn as StringColumn_, IntColumn as IntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class CompletedAuction {
    constructor(props?: Partial<CompletedAuction>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @BigIntColumn_({nullable: false})
    auctionId!: bigint

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
}
