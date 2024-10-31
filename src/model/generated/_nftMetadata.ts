import assert from "assert"
import * as marshal from "./marshal"
import {NFTAttribute} from "./_nftAttribute"
import {NFTProperty} from "./_nftProperty"

export class NFTMetadata {
    private _name!: string | undefined | null
    private _description!: string | undefined | null
    private _image!: string | undefined | null
    private _animationUrl!: string | undefined | null
    private _externalUrl!: string | undefined | null
    private _backgroundColor!: string | undefined | null
    private _supply!: number | undefined | null
    private _imageUrl!: string | undefined | null
    private _customImage!: string | undefined | null
    private _customAnimationUrl!: string | undefined | null
    private _attributes!: (NFTAttribute | undefined | null)[] | undefined | null
    private _properties!: (NFTProperty | undefined | null)[] | undefined | null

    constructor(props?: Partial<Omit<NFTMetadata, 'toJSON'>>, json?: any) {
        Object.assign(this, props)
        if (json != null) {
            this._name = json.name == null ? undefined : marshal.string.fromJSON(json.name)
            this._description = json.description == null ? undefined : marshal.string.fromJSON(json.description)
            this._image = json.image == null ? undefined : marshal.string.fromJSON(json.image)
            this._animationUrl = json.animationUrl == null ? undefined : marshal.string.fromJSON(json.animationUrl)
            this._externalUrl = json.externalUrl == null ? undefined : marshal.string.fromJSON(json.externalUrl)
            this._backgroundColor = json.backgroundColor == null ? undefined : marshal.string.fromJSON(json.backgroundColor)
            this._supply = json.supply == null ? undefined : marshal.int.fromJSON(json.supply)
            this._imageUrl = json.imageUrl == null ? undefined : marshal.string.fromJSON(json.imageUrl)
            this._customImage = json.customImage == null ? undefined : marshal.string.fromJSON(json.customImage)
            this._customAnimationUrl = json.customAnimationUrl == null ? undefined : marshal.string.fromJSON(json.customAnimationUrl)
            this._attributes = json.attributes == null ? undefined : marshal.fromList(json.attributes, val => val == null ? undefined : new NFTAttribute(undefined, val))
            this._properties = json.properties == null ? undefined : marshal.fromList(json.properties, val => val == null ? undefined : new NFTProperty(undefined, val))
        }
    }

    get name(): string | undefined | null {
        return this._name
    }

    set name(value: string | undefined | null) {
        this._name = value
    }

    get description(): string | undefined | null {
        return this._description
    }

    set description(value: string | undefined | null) {
        this._description = value
    }

    get image(): string | undefined | null {
        return this._image
    }

    set image(value: string | undefined | null) {
        this._image = value
    }

    get animationUrl(): string | undefined | null {
        return this._animationUrl
    }

    set animationUrl(value: string | undefined | null) {
        this._animationUrl = value
    }

    get externalUrl(): string | undefined | null {
        return this._externalUrl
    }

    set externalUrl(value: string | undefined | null) {
        this._externalUrl = value
    }

    get backgroundColor(): string | undefined | null {
        return this._backgroundColor
    }

    set backgroundColor(value: string | undefined | null) {
        this._backgroundColor = value
    }

    get supply(): number | undefined | null {
        return this._supply
    }

    set supply(value: number | undefined | null) {
        this._supply = value
    }

    get imageUrl(): string | undefined | null {
        return this._imageUrl
    }

    set imageUrl(value: string | undefined | null) {
        this._imageUrl = value
    }

    get customImage(): string | undefined | null {
        return this._customImage
    }

    set customImage(value: string | undefined | null) {
        this._customImage = value
    }

    get customAnimationUrl(): string | undefined | null {
        return this._customAnimationUrl
    }

    set customAnimationUrl(value: string | undefined | null) {
        this._customAnimationUrl = value
    }

    get attributes(): (NFTAttribute | undefined | null)[] | undefined | null {
        return this._attributes
    }

    set attributes(value: (NFTAttribute | undefined | null)[] | undefined | null) {
        this._attributes = value
    }

    get properties(): (NFTProperty | undefined | null)[] | undefined | null {
        return this._properties
    }

    set properties(value: (NFTProperty | undefined | null)[] | undefined | null) {
        this._properties = value
    }

    toJSON(): object {
        return {
            name: this.name,
            description: this.description,
            image: this.image,
            animationUrl: this.animationUrl,
            externalUrl: this.externalUrl,
            backgroundColor: this.backgroundColor,
            supply: this.supply,
            imageUrl: this.imageUrl,
            customImage: this.customImage,
            customAnimationUrl: this.customAnimationUrl,
            attributes: this.attributes == null ? undefined : this.attributes.map((val: any) => val == null ? undefined : val.toJSON()),
            properties: this.properties == null ? undefined : this.properties.map((val: any) => val == null ? undefined : val.toJSON()),
        }
    }
}
