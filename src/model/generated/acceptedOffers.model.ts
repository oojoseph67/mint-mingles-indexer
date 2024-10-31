import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, BigIntColumn as BigIntColumn_, StringColumn as StringColumn_, ManyToOne as ManyToOne_, Index as Index_} from "@subsquid/typeorm-store"
import {NFT} from "./nft.model"

@Entity_()
export class AcceptedOffers {
    constructor(props?: Partial<AcceptedOffers>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @BigIntColumn_({nullable: false})
    offerId!: bigint

    @StringColumn_({nullable: false})
    assetContract!: string

    @StringColumn_({nullable: false})
    offeror!: string

    @BigIntColumn_({nullable: false})
    quantityBought!: bigint

    @StringColumn_({nullable: false})
    seller!: string

    @BigIntColumn_({nullable: false})
    tokenId!: bigint

    @BigIntColumn_({nullable: false})
    totalPricePaid!: bigint

    @Index_()
    @ManyToOne_(() => NFT, {nullable: true})
    nft!: NFT | undefined | null
}
