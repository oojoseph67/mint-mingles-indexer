import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, BigIntColumn as BigIntColumn_, StringColumn as StringColumn_, IntColumn as IntColumn_, BooleanColumn as BooleanColumn_} from "@subsquid/typeorm-store"
import * as marshal from "./marshal"
import {WinningBid} from "./_winningBid"

@Entity_()
export class AllAuction {
    constructor(props?: Partial<AllAuction>) {
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

    @Column_("jsonb", {transformer: {to: obj => obj.toJSON(), from: obj => obj == null ? undefined : new WinningBid(undefined, obj)}, nullable: false})
    winningBid!: WinningBid

    @BooleanColumn_({nullable: false})
    isAuctionExpired!: boolean

    @IntColumn_({nullable: false})
    status!: number
}
