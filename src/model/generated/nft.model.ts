import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"
import * as marshal from "./marshal"
import {NFTMetadata} from "./_nftMetadata"

@Entity_()
export class NFT {
    constructor(props?: Partial<NFT>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @StringColumn_({nullable: false})
    owner!: string

    @BigIntColumn_({nullable: false})
    tokenId!: bigint

    @StringColumn_({nullable: false})
    tokenURI!: string

    @StringColumn_({nullable: false})
    type!: string

    @StringColumn_({nullable: false})
    assetContract!: string

    @Column_("jsonb", {transformer: {to: obj => obj.toJSON(), from: obj => obj == null ? undefined : new NFTMetadata(undefined, obj)}, nullable: false})
    metadata!: NFTMetadata
}
