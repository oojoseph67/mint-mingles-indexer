import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, StringColumn as StringColumn_, Index as Index_, IntColumn as IntColumn_, BooleanColumn as BooleanColumn_} from "@subsquid/typeorm-store"

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
    @IntColumn_({nullable: false})
    listingId!: number

    @Index_()
    @IntColumn_({nullable: false})
    tokenId!: number

    @IntColumn_({nullable: false})
    quantity!: number

    @IntColumn_({nullable: false})
    pricePerToken!: number

    @IntColumn_({nullable: false})
    startTimestamp!: number

    @IntColumn_({nullable: false})
    endTimestamp!: number

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
