import * as p from '@subsquid/evm-codec'
import { event, fun, viewFun, indexed, ContractBase } from '@subsquid/evm-abi'
import type { EventParams as EParams, FunctionArguments, FunctionReturn } from '@subsquid/evm-abi'

export const events = {
    ContractURIUpdated: event("0xc9c7c3fe08b88b4df9d4d47ef47d2c43d55c025a0ba88ca442580ed9e7348a16", "ContractURIUpdated(string,string)", {"prevURI": p.string, "newURI": p.string}),
    ExtensionAdded: event("0xbb37a605de78ba6bc667aeaf438d0aae8247e6f48a8fad23730e4fbbb480abf3", "ExtensionAdded(string,address,((string,string,address),(bytes4,string)[]))", {"name": indexed(p.string), "implementation": indexed(p.address), "extension": p.struct({"metadata": p.struct({"name": p.string, "metadataURI": p.string, "implementation": p.address}), "functions": p.array(p.struct({"functionSelector": p.bytes4, "functionSignature": p.string}))})}),
    ExtensionRemoved: event("0x3169a23cec9ad1a25ab59bbe00ecf8973dd840c745775ea8877041ef5ce65bcc", "ExtensionRemoved(string,((string,string,address),(bytes4,string)[]))", {"name": indexed(p.string), "extension": p.struct({"metadata": p.struct({"name": p.string, "metadataURI": p.string, "implementation": p.address}), "functions": p.array(p.struct({"functionSelector": p.bytes4, "functionSignature": p.string}))})}),
    ExtensionReplaced: event("0x5f1ef2b136db521971a88818ce904a8e310082338afdc100212a312706642158", "ExtensionReplaced(string,address,((string,string,address),(bytes4,string)[]))", {"name": indexed(p.string), "implementation": indexed(p.address), "extension": p.struct({"metadata": p.struct({"name": p.string, "metadataURI": p.string, "implementation": p.address}), "functions": p.array(p.struct({"functionSelector": p.bytes4, "functionSignature": p.string}))})}),
    FlatPlatformFeeUpdated: event("0xf8086cee80709bd44c82f89dbca54115ebd05e840a88ab81df9cf5be9754eb63", "FlatPlatformFeeUpdated(address,uint256)", {"platformFeeRecipient": p.address, "flatFee": p.uint256}),
    FunctionDisabled: event("0xbb931a9651175c9c82f86afbf6ad37a9141aa8d1d42bf798739be245a12e4e88", "FunctionDisabled(string,bytes4,(string,string,address))", {"name": indexed(p.string), "functionSelector": indexed(p.bytes4), "extMetadata": p.struct({"name": p.string, "metadataURI": p.string, "implementation": p.address})}),
    FunctionEnabled: event("0x681115194e519bda23de4da5218f3bc38f5585eab7c6b7d5fa66caa4602f574d", "FunctionEnabled(string,bytes4,(bytes4,string),(string,string,address))", {"name": indexed(p.string), "functionSelector": indexed(p.bytes4), "extFunction": p.struct({"functionSelector": p.bytes4, "functionSignature": p.string}), "extMetadata": p.struct({"name": p.string, "metadataURI": p.string, "implementation": p.address})}),
    Initialized: event("0x7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb3847402498", "Initialized(uint8)", {"version": p.uint8}),
    PlatformFeeInfoUpdated: event("0xe2497bd806ec41a6e0dd992c29a72efc0ef8fec9092d1978fd4a1e00b2f18304", "PlatformFeeInfoUpdated(address,uint256)", {"platformFeeRecipient": indexed(p.address), "platformFeeBps": p.uint256}),
    PlatformFeeTypeUpdated: event("0xd246da9440709ce0dd3f4fd669abc85ada012ab9774b8ecdcc5059ba1486b9c1", "PlatformFeeTypeUpdated(uint8)", {"feeType": p.uint8}),
    RoleAdminChanged: event("0xbd79b86ffe0ab8e8776151514217cd7cacd52c909f66475c3af44e129f0b00ff", "RoleAdminChanged(bytes32,bytes32,bytes32)", {"role": indexed(p.bytes32), "previousAdminRole": indexed(p.bytes32), "newAdminRole": indexed(p.bytes32)}),
    RoleGranted: event("0x2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d", "RoleGranted(bytes32,address,address)", {"role": indexed(p.bytes32), "account": indexed(p.address), "sender": indexed(p.address)}),
    RoleRevoked: event("0xf6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b", "RoleRevoked(bytes32,address,address)", {"role": indexed(p.bytes32), "account": indexed(p.address), "sender": indexed(p.address)}),
    RoyaltyEngineUpdated: event("0xdb773077c54b973d26a2973b12d9e7e458768cbf218f12160d3ea5f015820ef9", "RoyaltyEngineUpdated(address,address)", {"previousAddress": indexed(p.address), "newAddress": indexed(p.address)}),
    BuyerApprovedForListing: event("0x3b557e1ed3b963f7473508fd10c6d7248b593c0dde6acd2a566b92caec84038a", "BuyerApprovedForListing(uint256,address,bool)", {"listingId": indexed(p.uint256), "buyer": indexed(p.address), "approved": p.bool}),
    CancelledListing: event("0xf6e9b23c95dec70093b0abc1cf13bc5d35c9af03743f941904a4ef664e0119fb", "CancelledListing(address,uint256)", {"listingCreator": indexed(p.address), "listingId": indexed(p.uint256)}),
    CurrencyApprovedForListing: event("0x928cc552fea23b15fbd5c6b45fbfc5935c5b4a6397d7fdab884164648a777cf2", "CurrencyApprovedForListing(uint256,address,uint256)", {"listingId": indexed(p.uint256), "currency": indexed(p.address), "pricePerToken": p.uint256}),
    NewListing: event("0xef309e3999c4dd6a4c1e4af6221896b7e5ccf9e7fc4fe5b218b883ce9190d7ad", "NewListing(address,uint256,address,(uint256,uint256,uint256,uint256,uint128,uint128,address,address,address,uint8,uint8,bool))", {"listingCreator": indexed(p.address), "listingId": indexed(p.uint256), "assetContract": indexed(p.address), "listing": p.struct({"listingId": p.uint256, "tokenId": p.uint256, "quantity": p.uint256, "pricePerToken": p.uint256, "startTimestamp": p.uint128, "endTimestamp": p.uint128, "listingCreator": p.address, "assetContract": p.address, "currency": p.address, "tokenType": p.uint8, "status": p.uint8, "reserved": p.bool})}),
    NewSale: event("0xf6e03f1c408cfd2d118397c912a4b576683c43b41b015e3d7c212bac0cd0e7c7", "NewSale(address,uint256,address,uint256,address,uint256,uint256)", {"listingCreator": indexed(p.address), "listingId": indexed(p.uint256), "assetContract": indexed(p.address), "tokenId": p.uint256, "buyer": p.address, "quantityBought": p.uint256, "totalPricePaid": p.uint256}),
    UpdatedListing: event("0xfa5081de2649236db88a34c443c2fc130da7324d781893a7fc4a0d6be33a8156", "UpdatedListing(address,uint256,address,(uint256,uint256,uint256,uint256,uint128,uint128,address,address,address,uint8,uint8,bool))", {"listingCreator": indexed(p.address), "listingId": indexed(p.uint256), "assetContract": indexed(p.address), "listing": p.struct({"listingId": p.uint256, "tokenId": p.uint256, "quantity": p.uint256, "pricePerToken": p.uint256, "startTimestamp": p.uint128, "endTimestamp": p.uint128, "listingCreator": p.address, "assetContract": p.address, "currency": p.address, "tokenType": p.uint8, "status": p.uint8, "reserved": p.bool})}),
    AuctionClosed: event("0x7003143824ad94e684efcfd33e097dd7cd0e67243daf20f345f5186a9a7ba00a", "AuctionClosed(uint256,address,address,uint256,address,address)", {"auctionId": indexed(p.uint256), "assetContract": indexed(p.address), "closer": indexed(p.address), "tokenId": p.uint256, "auctionCreator": p.address, "winningBidder": p.address}),
    CancelledAuction: event("0xd68d26ab7202e0ff43e7ee058c16686e737f214c5832bfc1dd2fbb0518f60d8e", "CancelledAuction(address,uint256)", {"auctionCreator": indexed(p.address), "auctionId": indexed(p.uint256)}),
    NewAuction: event("0x5afd538bb1e7fc354db91c5dc4876ea2321a22fb8fbb69c84bda1f84ce1f45df", "NewAuction(address,uint256,address,(uint256,uint256,uint256,uint256,uint256,uint64,uint64,uint64,uint64,address,address,address,uint8,uint8))", {"auctionCreator": indexed(p.address), "auctionId": indexed(p.uint256), "assetContract": indexed(p.address), "auction": p.struct({"auctionId": p.uint256, "tokenId": p.uint256, "quantity": p.uint256, "minimumBidAmount": p.uint256, "buyoutBidAmount": p.uint256, "timeBufferInSeconds": p.uint64, "bidBufferBps": p.uint64, "startTimestamp": p.uint64, "endTimestamp": p.uint64, "auctionCreator": p.address, "assetContract": p.address, "currency": p.address, "tokenType": p.uint8, "status": p.uint8})}),
    NewBid: event("0x433a278e1c55403e97ab8ffef6ce9fddd5d1fb2695745bbc3affbe0b8106ec6b", "NewBid(uint256,address,address,uint256,(uint256,uint256,uint256,uint256,uint256,uint64,uint64,uint64,uint64,address,address,address,uint8,uint8))", {"auctionId": indexed(p.uint256), "bidder": indexed(p.address), "assetContract": indexed(p.address), "bidAmount": p.uint256, "auction": p.struct({"auctionId": p.uint256, "tokenId": p.uint256, "quantity": p.uint256, "minimumBidAmount": p.uint256, "buyoutBidAmount": p.uint256, "timeBufferInSeconds": p.uint64, "bidBufferBps": p.uint64, "startTimestamp": p.uint64, "endTimestamp": p.uint64, "auctionCreator": p.address, "assetContract": p.address, "currency": p.address, "tokenType": p.uint8, "status": p.uint8})}),
    AcceptedOffer: event("0xc3888b4f8640ff369e48089b45596f4adc2e39c73dc7fc6e609f2ad05f879540", "AcceptedOffer(address,uint256,address,uint256,address,uint256,uint256)", {"offeror": indexed(p.address), "offerId": indexed(p.uint256), "assetContract": indexed(p.address), "tokenId": p.uint256, "seller": p.address, "quantityBought": p.uint256, "totalPricePaid": p.uint256}),
    CancelledOffer: event("0x26c37611219fb1f3253d3027b738bb3e678ed39b193c956cb48193e6431478d3", "CancelledOffer(address,uint256)", {"offeror": indexed(p.address), "offerId": indexed(p.uint256)}),
    NewOffer: event("0x8a597d224658d6f05ad676ddd666a25096b0bf7eff59d873ccbe943f8a3313ae", "NewOffer(address,uint256,address,(uint256,uint256,uint256,uint256,uint256,address,address,address,uint8,uint8))", {"offeror": indexed(p.address), "offerId": indexed(p.uint256), "assetContract": indexed(p.address), "offer": p.struct({"offerId": p.uint256, "tokenId": p.uint256, "quantity": p.uint256, "totalPrice": p.uint256, "expirationTimestamp": p.uint256, "offeror": p.address, "assetContract": p.address, "currency": p.address, "tokenType": p.uint8, "status": p.uint8})}),
}

export const functions = {
    DEFAULT_ADMIN_ROLE: viewFun("0xa217fddf", "DEFAULT_ADMIN_ROLE()", {}, p.bytes32),
    _disableFunctionInExtension: fun("0x429eed80", "_disableFunctionInExtension(string,bytes4)", {"_extensionName": p.string, "_functionSelector": p.bytes4}, ),
    addExtension: fun("0xe05688fe", "addExtension(((string,string,address),(bytes4,string)[]))", {"_extension": p.struct({"metadata": p.struct({"name": p.string, "metadataURI": p.string, "implementation": p.address}), "functions": p.array(p.struct({"functionSelector": p.bytes4, "functionSignature": p.string}))})}, ),
    contractType: viewFun("0xcb2ef6f7", "contractType()", {}, p.bytes32),
    contractURI: viewFun("0xe8a3d485", "contractURI()", {}, p.string),
    contractVersion: viewFun("0xa0a8e460", "contractVersion()", {}, p.uint8),
    defaultExtensions: viewFun("0x463c4864", "defaultExtensions()", {}, p.address),
    disableFunctionInExtension: fun("0x512cf914", "disableFunctionInExtension(string,bytes4)", {"_extensionName": p.string, "_functionSelector": p.bytes4}, ),
    enableFunctionInExtension: fun("0x8856a113", "enableFunctionInExtension(string,(bytes4,string))", {"_extensionName": p.string, "_function": p.struct({"functionSelector": p.bytes4, "functionSignature": p.string})}, ),
    getAllExtensions: viewFun("0x4a00cc48", "getAllExtensions()", {}, p.array(p.struct({"metadata": p.struct({"name": p.string, "metadataURI": p.string, "implementation": p.address}), "functions": p.array(p.struct({"functionSelector": p.bytes4, "functionSignature": p.string}))}))),
    getExtension: viewFun("0xc22707ee", "getExtension(string)", {"extensionName": p.string}, p.struct({"metadata": p.struct({"name": p.string, "metadataURI": p.string, "implementation": p.address}), "functions": p.array(p.struct({"functionSelector": p.bytes4, "functionSignature": p.string}))})),
    getFlatPlatformFeeInfo: viewFun("0xe57553da", "getFlatPlatformFeeInfo()", {}, {"_0": p.address, "_1": p.uint256}),
    getImplementationForFunction: viewFun("0xce0b6013", "getImplementationForFunction(bytes4)", {"_functionSelector": p.bytes4}, p.address),
    getMetadataForFunction: viewFun("0xa0dbaefd", "getMetadataForFunction(bytes4)", {"functionSelector": p.bytes4}, p.struct({"name": p.string, "metadataURI": p.string, "implementation": p.address})),
    getPlatformFeeInfo: viewFun("0xd45573f6", "getPlatformFeeInfo()", {}, {"_0": p.address, "_1": p.uint16}),
    getPlatformFeeType: viewFun("0xf28083c3", "getPlatformFeeType()", {}, p.uint8),
    getRoleAdmin: viewFun("0x248a9ca3", "getRoleAdmin(bytes32)", {"role": p.bytes32}, p.bytes32),
    getRoleMember: viewFun("0x9010d07c", "getRoleMember(bytes32,uint256)", {"role": p.bytes32, "index": p.uint256}, p.address),
    getRoleMemberCount: viewFun("0xca15c873", "getRoleMemberCount(bytes32)", {"role": p.bytes32}, p.uint256),
    getRoyalty: fun("0xf533b802", "getRoyalty(address,uint256,uint256)", {"tokenAddress": p.address, "tokenId": p.uint256, "value": p.uint256}, {"recipients": p.array(p.address), "amounts": p.array(p.uint256)}),
    getRoyaltyEngineAddress: viewFun("0x5a9ad231", "getRoyaltyEngineAddress()", {}, p.address),
    grantRole: fun("0x2f2ff15d", "grantRole(bytes32,address)", {"role": p.bytes32, "account": p.address}, ),
    hasRole: viewFun("0x91d14854", "hasRole(bytes32,address)", {"role": p.bytes32, "account": p.address}, p.bool),
    hasRoleWithSwitch: viewFun("0xa32fa5b3", "hasRoleWithSwitch(bytes32,address)", {"role": p.bytes32, "account": p.address}, p.bool),
    initialize: fun("0xaaae5633", "initialize(address,string,address[],address,uint16)", {"_defaultAdmin": p.address, "_contractURI": p.string, "_trustedForwarders": p.array(p.address), "_platformFeeRecipient": p.address, "_platformFeeBps": p.uint16}, ),
    isTrustedForwarder: viewFun("0x572b6c05", "isTrustedForwarder(address)", {"forwarder": p.address}, p.bool),
    multicall: fun("0xac9650d8", "multicall(bytes[])", {"data": p.array(p.bytes)}, p.array(p.bytes)),
    onERC1155BatchReceived: fun("0xbc197c81", "onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)", {"_0": p.address, "_1": p.address, "_2": p.array(p.uint256), "_3": p.array(p.uint256), "_4": p.bytes}, p.bytes4),
    onERC1155Received: fun("0xf23a6e61", "onERC1155Received(address,address,uint256,uint256,bytes)", {"_0": p.address, "_1": p.address, "_2": p.uint256, "_3": p.uint256, "_4": p.bytes}, p.bytes4),
    onERC721Received: fun("0x150b7a02", "onERC721Received(address,address,uint256,bytes)", {"_0": p.address, "_1": p.address, "_2": p.uint256, "_3": p.bytes}, p.bytes4),
    removeExtension: fun("0xee7d2adf", "removeExtension(string)", {"_extensionName": p.string}, ),
    renounceRole: fun("0x36568abe", "renounceRole(bytes32,address)", {"role": p.bytes32, "account": p.address}, ),
    replaceExtension: fun("0xc0562f6d", "replaceExtension(((string,string,address),(bytes4,string)[]))", {"_extension": p.struct({"metadata": p.struct({"name": p.string, "metadataURI": p.string, "implementation": p.address}), "functions": p.array(p.struct({"functionSelector": p.bytes4, "functionSignature": p.string}))})}, ),
    revokeRole: fun("0xd547741f", "revokeRole(bytes32,address)", {"role": p.bytes32, "account": p.address}, ),
    setContractURI: fun("0x938e3d7b", "setContractURI(string)", {"_uri": p.string}, ),
    setFlatPlatformFeeInfo: fun("0x7e54523c", "setFlatPlatformFeeInfo(address,uint256)", {"_platformFeeRecipient": p.address, "_flatFee": p.uint256}, ),
    setPlatformFeeInfo: fun("0x1e7ac488", "setPlatformFeeInfo(address,uint256)", {"_platformFeeRecipient": p.address, "_platformFeeBps": p.uint256}, ),
    setPlatformFeeType: fun("0xb6f10c79", "setPlatformFeeType(uint8)", {"_feeType": p.uint8}, ),
    setRoyaltyEngine: fun("0x21ede032", "setRoyaltyEngine(address)", {"_royaltyEngineAddress": p.address}, ),
    supportsInterface: viewFun("0x01ffc9a7", "supportsInterface(bytes4)", {"interfaceId": p.bytes4}, p.bool),
    _msgData: viewFun("0x8b49d47e", "_msgData()", {}, p.bytes),
    _msgSender: viewFun("0x119df25f", "_msgSender()", {}, p.address),
    approveBuyerForListing: fun("0x48dd77df", "approveBuyerForListing(uint256,address,bool)", {"_listingId": p.uint256, "_buyer": p.address, "_toApprove": p.bool}, ),
    approveCurrencyForListing: fun("0xea8f9a3c", "approveCurrencyForListing(uint256,address,uint256)", {"_listingId": p.uint256, "_currency": p.address, "_pricePerTokenInCurrency": p.uint256}, ),
    buyFromListing: fun("0x704232dc", "buyFromListing(uint256,address,uint256,address,uint256)", {"_listingId": p.uint256, "_buyFor": p.address, "_quantity": p.uint256, "_currency": p.address, "_expectedTotalPrice": p.uint256}, ),
    cancelListing: fun("0x305a67a8", "cancelListing(uint256)", {"_listingId": p.uint256}, ),
    createListing: fun("0x746415b5", "createListing((address,uint256,uint256,address,uint256,uint128,uint128,bool))", {"_params": p.struct({"assetContract": p.address, "tokenId": p.uint256, "quantity": p.uint256, "currency": p.address, "pricePerToken": p.uint256, "startTimestamp": p.uint128, "endTimestamp": p.uint128, "reserved": p.bool})}, p.uint256),
    currencyPriceForListing: viewFun("0xfb14079d", "currencyPriceForListing(uint256,address)", {"_listingId": p.uint256, "_currency": p.address}, p.uint256),
    getAllListings: viewFun("0xc5275fb0", "getAllListings(uint256,uint256)", {"_startId": p.uint256, "_endId": p.uint256}, p.array(p.struct({"listingId": p.uint256, "tokenId": p.uint256, "quantity": p.uint256, "pricePerToken": p.uint256, "startTimestamp": p.uint128, "endTimestamp": p.uint128, "listingCreator": p.address, "assetContract": p.address, "currency": p.address, "tokenType": p.uint8, "status": p.uint8, "reserved": p.bool}))),
    getAllValidListings: viewFun("0x31654b4d", "getAllValidListings(uint256,uint256)", {"_startId": p.uint256, "_endId": p.uint256}, p.array(p.struct({"listingId": p.uint256, "tokenId": p.uint256, "quantity": p.uint256, "pricePerToken": p.uint256, "startTimestamp": p.uint128, "endTimestamp": p.uint128, "listingCreator": p.address, "assetContract": p.address, "currency": p.address, "tokenType": p.uint8, "status": p.uint8, "reserved": p.bool}))),
    getListing: viewFun("0x107a274a", "getListing(uint256)", {"_listingId": p.uint256}, p.struct({"listingId": p.uint256, "tokenId": p.uint256, "quantity": p.uint256, "pricePerToken": p.uint256, "startTimestamp": p.uint128, "endTimestamp": p.uint128, "listingCreator": p.address, "assetContract": p.address, "currency": p.address, "tokenType": p.uint8, "status": p.uint8, "reserved": p.bool})),
    isBuyerApprovedForListing: viewFun("0x9cfbe2a6", "isBuyerApprovedForListing(uint256,address)", {"_listingId": p.uint256, "_buyer": p.address}, p.bool),
    isCurrencyApprovedForListing: viewFun("0xa8519047", "isCurrencyApprovedForListing(uint256,address)", {"_listingId": p.uint256, "_currency": p.address}, p.bool),
    totalListings: viewFun("0xc78b616c", "totalListings()", {}, p.uint256),
    updateListing: fun("0x07b67758", "updateListing(uint256,(address,uint256,uint256,address,uint256,uint128,uint128,bool))", {"_listingId": p.uint256, "_params": p.struct({"assetContract": p.address, "tokenId": p.uint256, "quantity": p.uint256, "currency": p.address, "pricePerToken": p.uint256, "startTimestamp": p.uint128, "endTimestamp": p.uint128, "reserved": p.bool})}, ),
    bidInAuction: fun("0x0858e5ad", "bidInAuction(uint256,uint256)", {"_auctionId": p.uint256, "_bidAmount": p.uint256}, ),
    cancelAuction: fun("0x96b5a755", "cancelAuction(uint256)", {"_auctionId": p.uint256}, ),
    collectAuctionPayout: fun("0xebf05a62", "collectAuctionPayout(uint256)", {"_auctionId": p.uint256}, ),
    collectAuctionTokens: fun("0x03a54fe0", "collectAuctionTokens(uint256)", {"_auctionId": p.uint256}, ),
    createAuction: fun("0x16654d40", "createAuction((address,uint256,uint256,address,uint256,uint256,uint64,uint64,uint64,uint64))", {"_params": p.struct({"assetContract": p.address, "tokenId": p.uint256, "quantity": p.uint256, "currency": p.address, "minimumBidAmount": p.uint256, "buyoutBidAmount": p.uint256, "timeBufferInSeconds": p.uint64, "bidBufferBps": p.uint64, "startTimestamp": p.uint64, "endTimestamp": p.uint64})}, p.uint256),
    getAllAuctions: viewFun("0xc291537c", "getAllAuctions(uint256,uint256)", {"_startId": p.uint256, "_endId": p.uint256}, p.array(p.struct({"auctionId": p.uint256, "tokenId": p.uint256, "quantity": p.uint256, "minimumBidAmount": p.uint256, "buyoutBidAmount": p.uint256, "timeBufferInSeconds": p.uint64, "bidBufferBps": p.uint64, "startTimestamp": p.uint64, "endTimestamp": p.uint64, "auctionCreator": p.address, "assetContract": p.address, "currency": p.address, "tokenType": p.uint8, "status": p.uint8}))),
    getAllValidAuctions: viewFun("0x7b063801", "getAllValidAuctions(uint256,uint256)", {"_startId": p.uint256, "_endId": p.uint256}, p.array(p.struct({"auctionId": p.uint256, "tokenId": p.uint256, "quantity": p.uint256, "minimumBidAmount": p.uint256, "buyoutBidAmount": p.uint256, "timeBufferInSeconds": p.uint64, "bidBufferBps": p.uint64, "startTimestamp": p.uint64, "endTimestamp": p.uint64, "auctionCreator": p.address, "assetContract": p.address, "currency": p.address, "tokenType": p.uint8, "status": p.uint8}))),
    getAuction: viewFun("0x78bd7935", "getAuction(uint256)", {"_auctionId": p.uint256}, p.struct({"auctionId": p.uint256, "tokenId": p.uint256, "quantity": p.uint256, "minimumBidAmount": p.uint256, "buyoutBidAmount": p.uint256, "timeBufferInSeconds": p.uint64, "bidBufferBps": p.uint64, "startTimestamp": p.uint64, "endTimestamp": p.uint64, "auctionCreator": p.address, "assetContract": p.address, "currency": p.address, "tokenType": p.uint8, "status": p.uint8})),
    getWinningBid: viewFun("0x6891939d", "getWinningBid(uint256)", {"_auctionId": p.uint256}, {"_bidder": p.address, "_currency": p.address, "_bidAmount": p.uint256}),
    isAuctionExpired: viewFun("0x1389b117", "isAuctionExpired(uint256)", {"_auctionId": p.uint256}, p.bool),
    isNewWinningBid: viewFun("0x2eb566bd", "isNewWinningBid(uint256,uint256)", {"_auctionId": p.uint256, "_bidAmount": p.uint256}, p.bool),
    totalAuctions: viewFun("0x16002f4a", "totalAuctions()", {}, p.uint256),
    acceptOffer: fun("0xc815729d", "acceptOffer(uint256)", {"_offerId": p.uint256}, ),
    cancelOffer: fun("0xef706adf", "cancelOffer(uint256)", {"_offerId": p.uint256}, ),
    getAllOffers: viewFun("0xc1edcfbe", "getAllOffers(uint256,uint256)", {"_startId": p.uint256, "_endId": p.uint256}, p.array(p.struct({"offerId": p.uint256, "tokenId": p.uint256, "quantity": p.uint256, "totalPrice": p.uint256, "expirationTimestamp": p.uint256, "offeror": p.address, "assetContract": p.address, "currency": p.address, "tokenType": p.uint8, "status": p.uint8}))),
    getAllValidOffers: viewFun("0x91940b3e", "getAllValidOffers(uint256,uint256)", {"_startId": p.uint256, "_endId": p.uint256}, p.array(p.struct({"offerId": p.uint256, "tokenId": p.uint256, "quantity": p.uint256, "totalPrice": p.uint256, "expirationTimestamp": p.uint256, "offeror": p.address, "assetContract": p.address, "currency": p.address, "tokenType": p.uint8, "status": p.uint8}))),
    getOffer: viewFun("0x4579268a", "getOffer(uint256)", {"_offerId": p.uint256}, p.struct({"offerId": p.uint256, "tokenId": p.uint256, "quantity": p.uint256, "totalPrice": p.uint256, "expirationTimestamp": p.uint256, "offeror": p.address, "assetContract": p.address, "currency": p.address, "tokenType": p.uint8, "status": p.uint8})),
    makeOffer: fun("0x016767fa", "makeOffer((address,uint256,uint256,address,uint256,uint256))", {"_params": p.struct({"assetContract": p.address, "tokenId": p.uint256, "quantity": p.uint256, "currency": p.address, "totalPrice": p.uint256, "expirationTimestamp": p.uint256})}, p.uint256),
    totalOffers: viewFun("0xa9fd8ed1", "totalOffers()", {}, p.uint256),
}

export class Contract extends ContractBase {

    DEFAULT_ADMIN_ROLE() {
        return this.eth_call(functions.DEFAULT_ADMIN_ROLE, {})
    }

    contractType() {
        return this.eth_call(functions.contractType, {})
    }

    contractURI() {
        return this.eth_call(functions.contractURI, {})
    }

    contractVersion() {
        return this.eth_call(functions.contractVersion, {})
    }

    defaultExtensions() {
        return this.eth_call(functions.defaultExtensions, {})
    }

    getAllExtensions() {
        return this.eth_call(functions.getAllExtensions, {})
    }

    getExtension(extensionName: GetExtensionParams["extensionName"]) {
        return this.eth_call(functions.getExtension, {extensionName})
    }

    getFlatPlatformFeeInfo() {
        return this.eth_call(functions.getFlatPlatformFeeInfo, {})
    }

    getImplementationForFunction(_functionSelector: GetImplementationForFunctionParams["_functionSelector"]) {
        return this.eth_call(functions.getImplementationForFunction, {_functionSelector})
    }

    getMetadataForFunction(functionSelector: GetMetadataForFunctionParams["functionSelector"]) {
        return this.eth_call(functions.getMetadataForFunction, {functionSelector})
    }

    getPlatformFeeInfo() {
        return this.eth_call(functions.getPlatformFeeInfo, {})
    }

    getPlatformFeeType() {
        return this.eth_call(functions.getPlatformFeeType, {})
    }

    getRoleAdmin(role: GetRoleAdminParams["role"]) {
        return this.eth_call(functions.getRoleAdmin, {role})
    }

    getRoleMember(role: GetRoleMemberParams["role"], index: GetRoleMemberParams["index"]) {
        return this.eth_call(functions.getRoleMember, {role, index})
    }

    getRoleMemberCount(role: GetRoleMemberCountParams["role"]) {
        return this.eth_call(functions.getRoleMemberCount, {role})
    }

    getRoyaltyEngineAddress() {
        return this.eth_call(functions.getRoyaltyEngineAddress, {})
    }

    hasRole(role: HasRoleParams["role"], account: HasRoleParams["account"]) {
        return this.eth_call(functions.hasRole, {role, account})
    }

    hasRoleWithSwitch(role: HasRoleWithSwitchParams["role"], account: HasRoleWithSwitchParams["account"]) {
        return this.eth_call(functions.hasRoleWithSwitch, {role, account})
    }

    isTrustedForwarder(forwarder: IsTrustedForwarderParams["forwarder"]) {
        return this.eth_call(functions.isTrustedForwarder, {forwarder})
    }

    supportsInterface(interfaceId: SupportsInterfaceParams["interfaceId"]) {
        return this.eth_call(functions.supportsInterface, {interfaceId})
    }

    _msgData() {
        return this.eth_call(functions._msgData, {})
    }

    _msgSender() {
        return this.eth_call(functions._msgSender, {})
    }

    currencyPriceForListing(_listingId: CurrencyPriceForListingParams["_listingId"], _currency: CurrencyPriceForListingParams["_currency"]) {
        return this.eth_call(functions.currencyPriceForListing, {_listingId, _currency})
    }

    getAllListings(_startId: GetAllListingsParams["_startId"], _endId: GetAllListingsParams["_endId"]) {
        return this.eth_call(functions.getAllListings, {_startId, _endId})
    }

    getAllValidListings(_startId: GetAllValidListingsParams["_startId"], _endId: GetAllValidListingsParams["_endId"]) {
        return this.eth_call(functions.getAllValidListings, {_startId, _endId})
    }

    getListing(_listingId: GetListingParams["_listingId"]) {
        return this.eth_call(functions.getListing, {_listingId})
    }

    isBuyerApprovedForListing(_listingId: IsBuyerApprovedForListingParams["_listingId"], _buyer: IsBuyerApprovedForListingParams["_buyer"]) {
        return this.eth_call(functions.isBuyerApprovedForListing, {_listingId, _buyer})
    }

    isCurrencyApprovedForListing(_listingId: IsCurrencyApprovedForListingParams["_listingId"], _currency: IsCurrencyApprovedForListingParams["_currency"]) {
        return this.eth_call(functions.isCurrencyApprovedForListing, {_listingId, _currency})
    }

    totalListings() {
        return this.eth_call(functions.totalListings, {})
    }

    getAllAuctions(_startId: GetAllAuctionsParams["_startId"], _endId: GetAllAuctionsParams["_endId"]) {
        return this.eth_call(functions.getAllAuctions, {_startId, _endId})
    }

    getAllValidAuctions(_startId: GetAllValidAuctionsParams["_startId"], _endId: GetAllValidAuctionsParams["_endId"]) {
        return this.eth_call(functions.getAllValidAuctions, {_startId, _endId})
    }

    getAuction(_auctionId: GetAuctionParams["_auctionId"]) {
        return this.eth_call(functions.getAuction, {_auctionId})
    }

    getWinningBid(_auctionId: GetWinningBidParams["_auctionId"]) {
        return this.eth_call(functions.getWinningBid, {_auctionId})
    }

    isAuctionExpired(_auctionId: IsAuctionExpiredParams["_auctionId"]) {
        return this.eth_call(functions.isAuctionExpired, {_auctionId})
    }

    isNewWinningBid(_auctionId: IsNewWinningBidParams["_auctionId"], _bidAmount: IsNewWinningBidParams["_bidAmount"]) {
        return this.eth_call(functions.isNewWinningBid, {_auctionId, _bidAmount})
    }

    totalAuctions() {
        return this.eth_call(functions.totalAuctions, {})
    }

    getAllOffers(_startId: GetAllOffersParams["_startId"], _endId: GetAllOffersParams["_endId"]) {
        return this.eth_call(functions.getAllOffers, {_startId, _endId})
    }

    getAllValidOffers(_startId: GetAllValidOffersParams["_startId"], _endId: GetAllValidOffersParams["_endId"]) {
        return this.eth_call(functions.getAllValidOffers, {_startId, _endId})
    }

    getOffer(_offerId: GetOfferParams["_offerId"]) {
        return this.eth_call(functions.getOffer, {_offerId})
    }

    totalOffers() {
        return this.eth_call(functions.totalOffers, {})
    }
}

/// Event types
export type ContractURIUpdatedEventArgs = EParams<typeof events.ContractURIUpdated>
export type ExtensionAddedEventArgs = EParams<typeof events.ExtensionAdded>
export type ExtensionRemovedEventArgs = EParams<typeof events.ExtensionRemoved>
export type ExtensionReplacedEventArgs = EParams<typeof events.ExtensionReplaced>
export type FlatPlatformFeeUpdatedEventArgs = EParams<typeof events.FlatPlatformFeeUpdated>
export type FunctionDisabledEventArgs = EParams<typeof events.FunctionDisabled>
export type FunctionEnabledEventArgs = EParams<typeof events.FunctionEnabled>
export type InitializedEventArgs = EParams<typeof events.Initialized>
export type PlatformFeeInfoUpdatedEventArgs = EParams<typeof events.PlatformFeeInfoUpdated>
export type PlatformFeeTypeUpdatedEventArgs = EParams<typeof events.PlatformFeeTypeUpdated>
export type RoleAdminChangedEventArgs = EParams<typeof events.RoleAdminChanged>
export type RoleGrantedEventArgs = EParams<typeof events.RoleGranted>
export type RoleRevokedEventArgs = EParams<typeof events.RoleRevoked>
export type RoyaltyEngineUpdatedEventArgs = EParams<typeof events.RoyaltyEngineUpdated>
export type BuyerApprovedForListingEventArgs = EParams<typeof events.BuyerApprovedForListing>
export type CancelledListingEventArgs = EParams<typeof events.CancelledListing>
export type CurrencyApprovedForListingEventArgs = EParams<typeof events.CurrencyApprovedForListing>
export type NewListingEventArgs = EParams<typeof events.NewListing>
export type NewSaleEventArgs = EParams<typeof events.NewSale>
export type UpdatedListingEventArgs = EParams<typeof events.UpdatedListing>
export type AuctionClosedEventArgs = EParams<typeof events.AuctionClosed>
export type CancelledAuctionEventArgs = EParams<typeof events.CancelledAuction>
export type NewAuctionEventArgs = EParams<typeof events.NewAuction>
export type NewBidEventArgs = EParams<typeof events.NewBid>
export type AcceptedOfferEventArgs = EParams<typeof events.AcceptedOffer>
export type CancelledOfferEventArgs = EParams<typeof events.CancelledOffer>
export type NewOfferEventArgs = EParams<typeof events.NewOffer>

/// Function types
export type DEFAULT_ADMIN_ROLEParams = FunctionArguments<typeof functions.DEFAULT_ADMIN_ROLE>
export type DEFAULT_ADMIN_ROLEReturn = FunctionReturn<typeof functions.DEFAULT_ADMIN_ROLE>

export type _disableFunctionInExtensionParams = FunctionArguments<typeof functions._disableFunctionInExtension>
export type _disableFunctionInExtensionReturn = FunctionReturn<typeof functions._disableFunctionInExtension>

export type AddExtensionParams = FunctionArguments<typeof functions.addExtension>
export type AddExtensionReturn = FunctionReturn<typeof functions.addExtension>

export type ContractTypeParams = FunctionArguments<typeof functions.contractType>
export type ContractTypeReturn = FunctionReturn<typeof functions.contractType>

export type ContractURIParams = FunctionArguments<typeof functions.contractURI>
export type ContractURIReturn = FunctionReturn<typeof functions.contractURI>

export type ContractVersionParams = FunctionArguments<typeof functions.contractVersion>
export type ContractVersionReturn = FunctionReturn<typeof functions.contractVersion>

export type DefaultExtensionsParams = FunctionArguments<typeof functions.defaultExtensions>
export type DefaultExtensionsReturn = FunctionReturn<typeof functions.defaultExtensions>

export type DisableFunctionInExtensionParams = FunctionArguments<typeof functions.disableFunctionInExtension>
export type DisableFunctionInExtensionReturn = FunctionReturn<typeof functions.disableFunctionInExtension>

export type EnableFunctionInExtensionParams = FunctionArguments<typeof functions.enableFunctionInExtension>
export type EnableFunctionInExtensionReturn = FunctionReturn<typeof functions.enableFunctionInExtension>

export type GetAllExtensionsParams = FunctionArguments<typeof functions.getAllExtensions>
export type GetAllExtensionsReturn = FunctionReturn<typeof functions.getAllExtensions>

export type GetExtensionParams = FunctionArguments<typeof functions.getExtension>
export type GetExtensionReturn = FunctionReturn<typeof functions.getExtension>

export type GetFlatPlatformFeeInfoParams = FunctionArguments<typeof functions.getFlatPlatformFeeInfo>
export type GetFlatPlatformFeeInfoReturn = FunctionReturn<typeof functions.getFlatPlatformFeeInfo>

export type GetImplementationForFunctionParams = FunctionArguments<typeof functions.getImplementationForFunction>
export type GetImplementationForFunctionReturn = FunctionReturn<typeof functions.getImplementationForFunction>

export type GetMetadataForFunctionParams = FunctionArguments<typeof functions.getMetadataForFunction>
export type GetMetadataForFunctionReturn = FunctionReturn<typeof functions.getMetadataForFunction>

export type GetPlatformFeeInfoParams = FunctionArguments<typeof functions.getPlatformFeeInfo>
export type GetPlatformFeeInfoReturn = FunctionReturn<typeof functions.getPlatformFeeInfo>

export type GetPlatformFeeTypeParams = FunctionArguments<typeof functions.getPlatformFeeType>
export type GetPlatformFeeTypeReturn = FunctionReturn<typeof functions.getPlatformFeeType>

export type GetRoleAdminParams = FunctionArguments<typeof functions.getRoleAdmin>
export type GetRoleAdminReturn = FunctionReturn<typeof functions.getRoleAdmin>

export type GetRoleMemberParams = FunctionArguments<typeof functions.getRoleMember>
export type GetRoleMemberReturn = FunctionReturn<typeof functions.getRoleMember>

export type GetRoleMemberCountParams = FunctionArguments<typeof functions.getRoleMemberCount>
export type GetRoleMemberCountReturn = FunctionReturn<typeof functions.getRoleMemberCount>

export type GetRoyaltyParams = FunctionArguments<typeof functions.getRoyalty>
export type GetRoyaltyReturn = FunctionReturn<typeof functions.getRoyalty>

export type GetRoyaltyEngineAddressParams = FunctionArguments<typeof functions.getRoyaltyEngineAddress>
export type GetRoyaltyEngineAddressReturn = FunctionReturn<typeof functions.getRoyaltyEngineAddress>

export type GrantRoleParams = FunctionArguments<typeof functions.grantRole>
export type GrantRoleReturn = FunctionReturn<typeof functions.grantRole>

export type HasRoleParams = FunctionArguments<typeof functions.hasRole>
export type HasRoleReturn = FunctionReturn<typeof functions.hasRole>

export type HasRoleWithSwitchParams = FunctionArguments<typeof functions.hasRoleWithSwitch>
export type HasRoleWithSwitchReturn = FunctionReturn<typeof functions.hasRoleWithSwitch>

export type InitializeParams = FunctionArguments<typeof functions.initialize>
export type InitializeReturn = FunctionReturn<typeof functions.initialize>

export type IsTrustedForwarderParams = FunctionArguments<typeof functions.isTrustedForwarder>
export type IsTrustedForwarderReturn = FunctionReturn<typeof functions.isTrustedForwarder>

export type MulticallParams = FunctionArguments<typeof functions.multicall>
export type MulticallReturn = FunctionReturn<typeof functions.multicall>

export type OnERC1155BatchReceivedParams = FunctionArguments<typeof functions.onERC1155BatchReceived>
export type OnERC1155BatchReceivedReturn = FunctionReturn<typeof functions.onERC1155BatchReceived>

export type OnERC1155ReceivedParams = FunctionArguments<typeof functions.onERC1155Received>
export type OnERC1155ReceivedReturn = FunctionReturn<typeof functions.onERC1155Received>

export type OnERC721ReceivedParams = FunctionArguments<typeof functions.onERC721Received>
export type OnERC721ReceivedReturn = FunctionReturn<typeof functions.onERC721Received>

export type RemoveExtensionParams = FunctionArguments<typeof functions.removeExtension>
export type RemoveExtensionReturn = FunctionReturn<typeof functions.removeExtension>

export type RenounceRoleParams = FunctionArguments<typeof functions.renounceRole>
export type RenounceRoleReturn = FunctionReturn<typeof functions.renounceRole>

export type ReplaceExtensionParams = FunctionArguments<typeof functions.replaceExtension>
export type ReplaceExtensionReturn = FunctionReturn<typeof functions.replaceExtension>

export type RevokeRoleParams = FunctionArguments<typeof functions.revokeRole>
export type RevokeRoleReturn = FunctionReturn<typeof functions.revokeRole>

export type SetContractURIParams = FunctionArguments<typeof functions.setContractURI>
export type SetContractURIReturn = FunctionReturn<typeof functions.setContractURI>

export type SetFlatPlatformFeeInfoParams = FunctionArguments<typeof functions.setFlatPlatformFeeInfo>
export type SetFlatPlatformFeeInfoReturn = FunctionReturn<typeof functions.setFlatPlatformFeeInfo>

export type SetPlatformFeeInfoParams = FunctionArguments<typeof functions.setPlatformFeeInfo>
export type SetPlatformFeeInfoReturn = FunctionReturn<typeof functions.setPlatformFeeInfo>

export type SetPlatformFeeTypeParams = FunctionArguments<typeof functions.setPlatformFeeType>
export type SetPlatformFeeTypeReturn = FunctionReturn<typeof functions.setPlatformFeeType>

export type SetRoyaltyEngineParams = FunctionArguments<typeof functions.setRoyaltyEngine>
export type SetRoyaltyEngineReturn = FunctionReturn<typeof functions.setRoyaltyEngine>

export type SupportsInterfaceParams = FunctionArguments<typeof functions.supportsInterface>
export type SupportsInterfaceReturn = FunctionReturn<typeof functions.supportsInterface>

export type _msgDataParams = FunctionArguments<typeof functions._msgData>
export type _msgDataReturn = FunctionReturn<typeof functions._msgData>

export type _msgSenderParams = FunctionArguments<typeof functions._msgSender>
export type _msgSenderReturn = FunctionReturn<typeof functions._msgSender>

export type ApproveBuyerForListingParams = FunctionArguments<typeof functions.approveBuyerForListing>
export type ApproveBuyerForListingReturn = FunctionReturn<typeof functions.approveBuyerForListing>

export type ApproveCurrencyForListingParams = FunctionArguments<typeof functions.approveCurrencyForListing>
export type ApproveCurrencyForListingReturn = FunctionReturn<typeof functions.approveCurrencyForListing>

export type BuyFromListingParams = FunctionArguments<typeof functions.buyFromListing>
export type BuyFromListingReturn = FunctionReturn<typeof functions.buyFromListing>

export type CancelListingParams = FunctionArguments<typeof functions.cancelListing>
export type CancelListingReturn = FunctionReturn<typeof functions.cancelListing>

export type CreateListingParams = FunctionArguments<typeof functions.createListing>
export type CreateListingReturn = FunctionReturn<typeof functions.createListing>

export type CurrencyPriceForListingParams = FunctionArguments<typeof functions.currencyPriceForListing>
export type CurrencyPriceForListingReturn = FunctionReturn<typeof functions.currencyPriceForListing>

export type GetAllListingsParams = FunctionArguments<typeof functions.getAllListings>
export type GetAllListingsReturn = FunctionReturn<typeof functions.getAllListings>

export type GetAllValidListingsParams = FunctionArguments<typeof functions.getAllValidListings>
export type GetAllValidListingsReturn = FunctionReturn<typeof functions.getAllValidListings>

export type GetListingParams = FunctionArguments<typeof functions.getListing>
export type GetListingReturn = FunctionReturn<typeof functions.getListing>

export type IsBuyerApprovedForListingParams = FunctionArguments<typeof functions.isBuyerApprovedForListing>
export type IsBuyerApprovedForListingReturn = FunctionReturn<typeof functions.isBuyerApprovedForListing>

export type IsCurrencyApprovedForListingParams = FunctionArguments<typeof functions.isCurrencyApprovedForListing>
export type IsCurrencyApprovedForListingReturn = FunctionReturn<typeof functions.isCurrencyApprovedForListing>

export type TotalListingsParams = FunctionArguments<typeof functions.totalListings>
export type TotalListingsReturn = FunctionReturn<typeof functions.totalListings>

export type UpdateListingParams = FunctionArguments<typeof functions.updateListing>
export type UpdateListingReturn = FunctionReturn<typeof functions.updateListing>

export type BidInAuctionParams = FunctionArguments<typeof functions.bidInAuction>
export type BidInAuctionReturn = FunctionReturn<typeof functions.bidInAuction>

export type CancelAuctionParams = FunctionArguments<typeof functions.cancelAuction>
export type CancelAuctionReturn = FunctionReturn<typeof functions.cancelAuction>

export type CollectAuctionPayoutParams = FunctionArguments<typeof functions.collectAuctionPayout>
export type CollectAuctionPayoutReturn = FunctionReturn<typeof functions.collectAuctionPayout>

export type CollectAuctionTokensParams = FunctionArguments<typeof functions.collectAuctionTokens>
export type CollectAuctionTokensReturn = FunctionReturn<typeof functions.collectAuctionTokens>

export type CreateAuctionParams = FunctionArguments<typeof functions.createAuction>
export type CreateAuctionReturn = FunctionReturn<typeof functions.createAuction>

export type GetAllAuctionsParams = FunctionArguments<typeof functions.getAllAuctions>
export type GetAllAuctionsReturn = FunctionReturn<typeof functions.getAllAuctions>

export type GetAllValidAuctionsParams = FunctionArguments<typeof functions.getAllValidAuctions>
export type GetAllValidAuctionsReturn = FunctionReturn<typeof functions.getAllValidAuctions>

export type GetAuctionParams = FunctionArguments<typeof functions.getAuction>
export type GetAuctionReturn = FunctionReturn<typeof functions.getAuction>

export type GetWinningBidParams = FunctionArguments<typeof functions.getWinningBid>
export type GetWinningBidReturn = FunctionReturn<typeof functions.getWinningBid>

export type IsAuctionExpiredParams = FunctionArguments<typeof functions.isAuctionExpired>
export type IsAuctionExpiredReturn = FunctionReturn<typeof functions.isAuctionExpired>

export type IsNewWinningBidParams = FunctionArguments<typeof functions.isNewWinningBid>
export type IsNewWinningBidReturn = FunctionReturn<typeof functions.isNewWinningBid>

export type TotalAuctionsParams = FunctionArguments<typeof functions.totalAuctions>
export type TotalAuctionsReturn = FunctionReturn<typeof functions.totalAuctions>

export type AcceptOfferParams = FunctionArguments<typeof functions.acceptOffer>
export type AcceptOfferReturn = FunctionReturn<typeof functions.acceptOffer>

export type CancelOfferParams = FunctionArguments<typeof functions.cancelOffer>
export type CancelOfferReturn = FunctionReturn<typeof functions.cancelOffer>

export type GetAllOffersParams = FunctionArguments<typeof functions.getAllOffers>
export type GetAllOffersReturn = FunctionReturn<typeof functions.getAllOffers>

export type GetAllValidOffersParams = FunctionArguments<typeof functions.getAllValidOffers>
export type GetAllValidOffersReturn = FunctionReturn<typeof functions.getAllValidOffers>

export type GetOfferParams = FunctionArguments<typeof functions.getOffer>
export type GetOfferReturn = FunctionReturn<typeof functions.getOffer>

export type MakeOfferParams = FunctionArguments<typeof functions.makeOffer>
export type MakeOfferReturn = FunctionReturn<typeof functions.makeOffer>

export type TotalOffersParams = FunctionArguments<typeof functions.totalOffers>
export type TotalOffersReturn = FunctionReturn<typeof functions.totalOffers>

