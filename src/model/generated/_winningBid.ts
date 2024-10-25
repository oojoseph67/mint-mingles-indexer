import assert from "assert"
import * as marshal from "./marshal"

export class WinningBid {
    private _bidder!: string | undefined | null
    private _currency!: string | undefined | null
    private _bidAmount!: bigint | undefined | null

    constructor(props?: Partial<Omit<WinningBid, 'toJSON'>>, json?: any) {
        Object.assign(this, props)
        if (json != null) {
            this._bidder = json.bidder == null ? undefined : marshal.string.fromJSON(json.bidder)
            this._currency = json.currency == null ? undefined : marshal.string.fromJSON(json.currency)
            this._bidAmount = json.bidAmount == null ? undefined : marshal.bigint.fromJSON(json.bidAmount)
        }
    }

    get bidder(): string | undefined | null {
        return this._bidder
    }

    set bidder(value: string | undefined | null) {
        this._bidder = value
    }

    get currency(): string | undefined | null {
        return this._currency
    }

    set currency(value: string | undefined | null) {
        this._currency = value
    }

    get bidAmount(): bigint | undefined | null {
        return this._bidAmount
    }

    set bidAmount(value: bigint | undefined | null) {
        this._bidAmount = value
    }

    toJSON(): object {
        return {
            bidder: this.bidder,
            currency: this.currency,
            bidAmount: this.bidAmount == null ? undefined : marshal.bigint.toJSON(this.bidAmount),
        }
    }
}
