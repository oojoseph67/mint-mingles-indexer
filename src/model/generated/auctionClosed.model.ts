import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, BigIntColumn as BigIntColumn_, Index as Index_, StringColumn as StringColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class AuctionClosed {
    constructor(props?: Partial<AuctionClosed>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_()
    @BigIntColumn_({nullable: false})
    auctionId!: bigint

    @Index_()
    @StringColumn_({nullable: false})
    assetContract!: string

    @Index_()
    @StringColumn_({nullable: false})
    closer!: string

    @BigIntColumn_({nullable: false})
    tokenId!: bigint

    @StringColumn_({nullable: false})
    auctionCreator!: string

    @StringColumn_({nullable: false})
    winningBidder!: string

    @StringColumn_({nullable: false})
    transactionHash!: string
}
