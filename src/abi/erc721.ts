import * as p from '@subsquid/evm-codec'
import { event, fun, viewFun, indexed, ContractBase } from '@subsquid/evm-abi'
import type { EventParams as EParams, FunctionArguments, FunctionReturn } from '@subsquid/evm-abi'

export const events = {
    Approval: event("0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925", "Approval(address,address,uint256)", {"owner": indexed(p.address), "approved": indexed(p.address), "tokenId": indexed(p.uint256)}),
    ApprovalForAll: event("0x17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31", "ApprovalForAll(address,address,bool)", {"owner": indexed(p.address), "operator": indexed(p.address), "approved": p.bool}),
    BatchMetadataUpdate: event("0x6bd5c950a8d8df17f772f5af37cb3655737899cbf903264b9795592da439661c", "BatchMetadataUpdate(uint256,uint256)", {"_fromTokenId": p.uint256, "_toTokenId": p.uint256}),
    DefaultRoyalty: event("0x90d7ec04bcb8978719414f82e52e4cb651db41d0e6f8cea6118c2191e6183adb", "DefaultRoyalty(address,uint256)", {"newRoyaltyRecipient": indexed(p.address), "newRoyaltyBps": p.uint256}),
    EIP712DomainChanged: event("0x0a6387c9ea3628b88a633bb4f3b151770f70085117a15f9bf3787cda53f13d31", "EIP712DomainChanged()", {}),
    FlatPlatformFeeUpdated: event("0xf8086cee80709bd44c82f89dbca54115ebd05e840a88ab81df9cf5be9754eb63", "FlatPlatformFeeUpdated(address,uint256)", {"platformFeeRecipient": p.address, "flatFee": p.uint256}),
    Initialized: event("0x7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb3847402498", "Initialized(uint8)", {"version": p.uint8}),
    MetadataFrozen: event("0xeef043febddf4e1d1cf1f72ff1407b84e036e805aa0934418cb82095da8d7164", "MetadataFrozen()", {}),
    MetadataUpdate: event("0xf8e1a15aba9398e019f0b49df1a4fde98ee17ae345cb5f6b5e2c27f5033e8ce7", "MetadataUpdate(uint256)", {"_tokenId": p.uint256}),
    OwnerUpdated: event("0x8292fce18fa69edf4db7b94ea2e58241df0ae57f97e0a6c9b29067028bf92d76", "OwnerUpdated(address,address)", {"prevOwner": indexed(p.address), "newOwner": indexed(p.address)}),
    PlatformFeeInfoUpdated: event("0xe2497bd806ec41a6e0dd992c29a72efc0ef8fec9092d1978fd4a1e00b2f18304", "PlatformFeeInfoUpdated(address,uint256)", {"platformFeeRecipient": indexed(p.address), "platformFeeBps": p.uint256}),
    PlatformFeeTypeUpdated: event("0xd246da9440709ce0dd3f4fd669abc85ada012ab9774b8ecdcc5059ba1486b9c1", "PlatformFeeTypeUpdated(uint8)", {"feeType": p.uint8}),
    PrimarySaleRecipientUpdated: event("0x299d17e95023f496e0ffc4909cff1a61f74bb5eb18de6f900f4155bfa1b3b333", "PrimarySaleRecipientUpdated(address)", {"recipient": indexed(p.address)}),
    RoleAdminChanged: event("0xbd79b86ffe0ab8e8776151514217cd7cacd52c909f66475c3af44e129f0b00ff", "RoleAdminChanged(bytes32,bytes32,bytes32)", {"role": indexed(p.bytes32), "previousAdminRole": indexed(p.bytes32), "newAdminRole": indexed(p.bytes32)}),
    RoleGranted: event("0x2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d", "RoleGranted(bytes32,address,address)", {"role": indexed(p.bytes32), "account": indexed(p.address), "sender": indexed(p.address)}),
    RoleRevoked: event("0xf6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b", "RoleRevoked(bytes32,address,address)", {"role": indexed(p.bytes32), "account": indexed(p.address), "sender": indexed(p.address)}),
    RoyaltyForToken: event("0x7365cf4122f072a3365c20d54eff9b38d73c096c28e1892ec8f5b0e403a0f12d", "RoyaltyForToken(uint256,address,uint256)", {"tokenId": indexed(p.uint256), "royaltyRecipient": indexed(p.address), "royaltyBps": p.uint256}),
    TokensMinted: event("0x9d89e36eadf856db0ad9ffb5a569e07f95634dddd9501141ecf04820484ad0dc", "TokensMinted(address,uint256,string)", {"mintedTo": indexed(p.address), "tokenIdMinted": indexed(p.uint256), "uri": p.string}),
    TokensMintedWithSignature: event("0x110d160a1bedeea919a88fbc4b2a9fb61b7e664084391b6ca2740db66fef80fe", "TokensMintedWithSignature(address,address,uint256,(address,address,uint256,address,string,uint256,address,uint128,uint128,bytes32))", {"signer": indexed(p.address), "mintedTo": indexed(p.address), "tokenIdMinted": indexed(p.uint256), "mintRequest": p.struct({"to": p.address, "royaltyRecipient": p.address, "royaltyBps": p.uint256, "primarySaleRecipient": p.address, "uri": p.string, "price": p.uint256, "currency": p.address, "validityStartTimestamp": p.uint128, "validityEndTimestamp": p.uint128, "uid": p.bytes32})}),
    Transfer: event("0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef", "Transfer(address,address,uint256)", {"from": indexed(p.address), "to": indexed(p.address), "tokenId": indexed(p.uint256)}),
}

export const functions = {
    DEFAULT_ADMIN_ROLE: viewFun("0xa217fddf", "DEFAULT_ADMIN_ROLE()", {}, p.bytes32),
    approve: fun("0x095ea7b3", "approve(address,uint256)", {"to": p.address, "tokenId": p.uint256}, ),
    balanceOf: viewFun("0x70a08231", "balanceOf(address)", {"owner": p.address}, p.uint256),
    burn: fun("0x42966c68", "burn(uint256)", {"tokenId": p.uint256}, ),
    contractType: viewFun("0xcb2ef6f7", "contractType()", {}, p.bytes32),
    contractURI: viewFun("0xe8a3d485", "contractURI()", {}, p.string),
    contractVersion: viewFun("0xa0a8e460", "contractVersion()", {}, p.uint8),
    eip712Domain: viewFun("0x84b0196e", "eip712Domain()", {}, {"fields": p.bytes1, "name": p.string, "version": p.string, "chainId": p.uint256, "verifyingContract": p.address, "salt": p.bytes32, "extensions": p.array(p.uint256)}),
    freezeMetadata: fun("0xd111515d", "freezeMetadata()", {}, ),
    getApproved: viewFun("0x081812fc", "getApproved(uint256)", {"tokenId": p.uint256}, p.address),
    getDefaultRoyaltyInfo: viewFun("0xb24f2d39", "getDefaultRoyaltyInfo()", {}, {"_0": p.address, "_1": p.uint16}),
    getPlatformFeeInfo: viewFun("0xd45573f6", "getPlatformFeeInfo()", {}, {"_0": p.address, "_1": p.uint16}),
    getRoleAdmin: viewFun("0x248a9ca3", "getRoleAdmin(bytes32)", {"role": p.bytes32}, p.bytes32),
    getRoleMember: viewFun("0x9010d07c", "getRoleMember(bytes32,uint256)", {"role": p.bytes32, "index": p.uint256}, p.address),
    getRoleMemberCount: viewFun("0xca15c873", "getRoleMemberCount(bytes32)", {"role": p.bytes32}, p.uint256),
    getRoyaltyInfoForToken: viewFun("0x4cc157df", "getRoyaltyInfoForToken(uint256)", {"_tokenId": p.uint256}, {"_0": p.address, "_1": p.uint16}),
    grantRole: fun("0x2f2ff15d", "grantRole(bytes32,address)", {"role": p.bytes32, "account": p.address}, ),
    hasRole: viewFun("0x91d14854", "hasRole(bytes32,address)", {"role": p.bytes32, "account": p.address}, p.bool),
    initialize: fun("0xe1591634", "initialize(address,string,string,string,address[],address,address,uint128,uint128,address)", {"_defaultAdmin": p.address, "_name": p.string, "_symbol": p.string, "_contractURI": p.string, "_trustedForwarders": p.array(p.address), "_saleRecipient": p.address, "_royaltyRecipient": p.address, "_royaltyBps": p.uint128, "_platformFeeBps": p.uint128, "_platformFeeRecipient": p.address}, ),
    isApprovedForAll: viewFun("0xe985e9c5", "isApprovedForAll(address,address)", {"owner": p.address, "operator": p.address}, p.bool),
    isTrustedForwarder: viewFun("0x572b6c05", "isTrustedForwarder(address)", {"forwarder": p.address}, p.bool),
    mintTo: fun("0x0075a317", "mintTo(address,string)", {"_to": p.address, "_uri": p.string}, p.uint256),
    mintWithSignature: fun("0x2c4510f8", "mintWithSignature((address,address,uint256,address,string,uint256,address,uint128,uint128,bytes32),bytes)", {"_req": p.struct({"to": p.address, "royaltyRecipient": p.address, "royaltyBps": p.uint256, "primarySaleRecipient": p.address, "uri": p.string, "price": p.uint256, "currency": p.address, "validityStartTimestamp": p.uint128, "validityEndTimestamp": p.uint128, "uid": p.bytes32}), "_signature": p.bytes}, p.uint256),
    multicall: fun("0xac9650d8", "multicall(bytes[])", {"data": p.array(p.bytes)}, p.array(p.bytes)),
    name: viewFun("0x06fdde03", "name()", {}, p.string),
    nextTokenIdToMint: viewFun("0x3b1475a7", "nextTokenIdToMint()", {}, p.uint256),
    owner: viewFun("0x8da5cb5b", "owner()", {}, p.address),
    ownerOf: viewFun("0x6352211e", "ownerOf(uint256)", {"tokenId": p.uint256}, p.address),
    platformFeeRecipient: viewFun("0xeb13554f", "platformFeeRecipient()", {}, p.address),
    primarySaleRecipient: viewFun("0x079fe40e", "primarySaleRecipient()", {}, p.address),
    renounceRole: fun("0x36568abe", "renounceRole(bytes32,address)", {"role": p.bytes32, "account": p.address}, ),
    revokeRole: fun("0xd547741f", "revokeRole(bytes32,address)", {"role": p.bytes32, "account": p.address}, ),
    royaltyInfo: viewFun("0x2a55205a", "royaltyInfo(uint256,uint256)", {"tokenId": p.uint256, "salePrice": p.uint256}, {"receiver": p.address, "royaltyAmount": p.uint256}),
    'safeTransferFrom(address,address,uint256)': fun("0x42842e0e", "safeTransferFrom(address,address,uint256)", {"from": p.address, "to": p.address, "tokenId": p.uint256}, ),
    'safeTransferFrom(address,address,uint256,bytes)': fun("0xb88d4fde", "safeTransferFrom(address,address,uint256,bytes)", {"from": p.address, "to": p.address, "tokenId": p.uint256, "data": p.bytes}, ),
    setApprovalForAll: fun("0xa22cb465", "setApprovalForAll(address,bool)", {"operator": p.address, "approved": p.bool}, ),
    setContractURI: fun("0x938e3d7b", "setContractURI(string)", {"_uri": p.string}, ),
    setDefaultRoyaltyInfo: fun("0x600dd5ea", "setDefaultRoyaltyInfo(address,uint256)", {"_royaltyRecipient": p.address, "_royaltyBps": p.uint256}, ),
    setOwner: fun("0x13af4035", "setOwner(address)", {"_newOwner": p.address}, ),
    setPlatformFeeInfo: fun("0x1e7ac488", "setPlatformFeeInfo(address,uint256)", {"_platformFeeRecipient": p.address, "_platformFeeBps": p.uint256}, ),
    setPrimarySaleRecipient: fun("0x6f4f2837", "setPrimarySaleRecipient(address)", {"_saleRecipient": p.address}, ),
    setRoyaltyInfoForToken: fun("0x9bcf7a15", "setRoyaltyInfoForToken(uint256,address,uint256)", {"_tokenId": p.uint256, "_recipient": p.address, "_bps": p.uint256}, ),
    setTokenURI: fun("0x162094c4", "setTokenURI(uint256,string)", {"_tokenId": p.uint256, "_uri": p.string}, ),
    supportsInterface: viewFun("0x01ffc9a7", "supportsInterface(bytes4)", {"interfaceId": p.bytes4}, p.bool),
    symbol: viewFun("0x95d89b41", "symbol()", {}, p.string),
    tokenByIndex: viewFun("0x4f6ccce7", "tokenByIndex(uint256)", {"index": p.uint256}, p.uint256),
    tokenOfOwnerByIndex: viewFun("0x2f745c59", "tokenOfOwnerByIndex(address,uint256)", {"owner": p.address, "index": p.uint256}, p.uint256),
    tokenURI: viewFun("0xc87b56dd", "tokenURI(uint256)", {"_tokenId": p.uint256}, p.string),
    totalSupply: viewFun("0x18160ddd", "totalSupply()", {}, p.uint256),
    transferFrom: fun("0x23b872dd", "transferFrom(address,address,uint256)", {"from": p.address, "to": p.address, "tokenId": p.uint256}, ),
    uriFrozen: viewFun("0x274e4a1d", "uriFrozen()", {}, p.bool),
    verify: viewFun("0xde903774", "verify((address,address,uint256,address,string,uint256,address,uint128,uint128,bytes32),bytes)", {"_req": p.struct({"to": p.address, "royaltyRecipient": p.address, "royaltyBps": p.uint256, "primarySaleRecipient": p.address, "uri": p.string, "price": p.uint256, "currency": p.address, "validityStartTimestamp": p.uint128, "validityEndTimestamp": p.uint128, "uid": p.bytes32}), "_signature": p.bytes}, {"_0": p.bool, "_1": p.address}),
}

export class Contract extends ContractBase {

    DEFAULT_ADMIN_ROLE() {
        return this.eth_call(functions.DEFAULT_ADMIN_ROLE, {})
    }

    balanceOf(owner: BalanceOfParams["owner"]) {
        return this.eth_call(functions.balanceOf, {owner})
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

    eip712Domain() {
        return this.eth_call(functions.eip712Domain, {})
    }

    getApproved(tokenId: GetApprovedParams["tokenId"]) {
        return this.eth_call(functions.getApproved, {tokenId})
    }

    getDefaultRoyaltyInfo() {
        return this.eth_call(functions.getDefaultRoyaltyInfo, {})
    }

    getPlatformFeeInfo() {
        return this.eth_call(functions.getPlatformFeeInfo, {})
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

    getRoyaltyInfoForToken(_tokenId: GetRoyaltyInfoForTokenParams["_tokenId"]) {
        return this.eth_call(functions.getRoyaltyInfoForToken, {_tokenId})
    }

    hasRole(role: HasRoleParams["role"], account: HasRoleParams["account"]) {
        return this.eth_call(functions.hasRole, {role, account})
    }

    isApprovedForAll(owner: IsApprovedForAllParams["owner"], operator: IsApprovedForAllParams["operator"]) {
        return this.eth_call(functions.isApprovedForAll, {owner, operator})
    }

    isTrustedForwarder(forwarder: IsTrustedForwarderParams["forwarder"]) {
        return this.eth_call(functions.isTrustedForwarder, {forwarder})
    }

    name() {
        return this.eth_call(functions.name, {})
    }

    nextTokenIdToMint() {
        return this.eth_call(functions.nextTokenIdToMint, {})
    }

    owner() {
        return this.eth_call(functions.owner, {})
    }

    ownerOf(tokenId: OwnerOfParams["tokenId"]) {
        return this.eth_call(functions.ownerOf, {tokenId})
    }

    platformFeeRecipient() {
        return this.eth_call(functions.platformFeeRecipient, {})
    }

    primarySaleRecipient() {
        return this.eth_call(functions.primarySaleRecipient, {})
    }

    royaltyInfo(tokenId: RoyaltyInfoParams["tokenId"], salePrice: RoyaltyInfoParams["salePrice"]) {
        return this.eth_call(functions.royaltyInfo, {tokenId, salePrice})
    }

    supportsInterface(interfaceId: SupportsInterfaceParams["interfaceId"]) {
        return this.eth_call(functions.supportsInterface, {interfaceId})
    }

    symbol() {
        return this.eth_call(functions.symbol, {})
    }

    tokenByIndex(index: TokenByIndexParams["index"]) {
        return this.eth_call(functions.tokenByIndex, {index})
    }

    tokenOfOwnerByIndex(owner: TokenOfOwnerByIndexParams["owner"], index: TokenOfOwnerByIndexParams["index"]) {
        return this.eth_call(functions.tokenOfOwnerByIndex, {owner, index})
    }

    tokenURI(_tokenId: TokenURIParams["_tokenId"]) {
        return this.eth_call(functions.tokenURI, {_tokenId})
    }

    totalSupply() {
        return this.eth_call(functions.totalSupply, {})
    }

    uriFrozen() {
        return this.eth_call(functions.uriFrozen, {})
    }

    verify(_req: VerifyParams["_req"], _signature: VerifyParams["_signature"]) {
        return this.eth_call(functions.verify, {_req, _signature})
    }
}

/// Event types
export type ApprovalEventArgs = EParams<typeof events.Approval>
export type ApprovalForAllEventArgs = EParams<typeof events.ApprovalForAll>
export type BatchMetadataUpdateEventArgs = EParams<typeof events.BatchMetadataUpdate>
export type DefaultRoyaltyEventArgs = EParams<typeof events.DefaultRoyalty>
export type EIP712DomainChangedEventArgs = EParams<typeof events.EIP712DomainChanged>
export type FlatPlatformFeeUpdatedEventArgs = EParams<typeof events.FlatPlatformFeeUpdated>
export type InitializedEventArgs = EParams<typeof events.Initialized>
export type MetadataFrozenEventArgs = EParams<typeof events.MetadataFrozen>
export type MetadataUpdateEventArgs = EParams<typeof events.MetadataUpdate>
export type OwnerUpdatedEventArgs = EParams<typeof events.OwnerUpdated>
export type PlatformFeeInfoUpdatedEventArgs = EParams<typeof events.PlatformFeeInfoUpdated>
export type PlatformFeeTypeUpdatedEventArgs = EParams<typeof events.PlatformFeeTypeUpdated>
export type PrimarySaleRecipientUpdatedEventArgs = EParams<typeof events.PrimarySaleRecipientUpdated>
export type RoleAdminChangedEventArgs = EParams<typeof events.RoleAdminChanged>
export type RoleGrantedEventArgs = EParams<typeof events.RoleGranted>
export type RoleRevokedEventArgs = EParams<typeof events.RoleRevoked>
export type RoyaltyForTokenEventArgs = EParams<typeof events.RoyaltyForToken>
export type TokensMintedEventArgs = EParams<typeof events.TokensMinted>
export type TokensMintedWithSignatureEventArgs = EParams<typeof events.TokensMintedWithSignature>
export type TransferEventArgs = EParams<typeof events.Transfer>

/// Function types
export type DEFAULT_ADMIN_ROLEParams = FunctionArguments<typeof functions.DEFAULT_ADMIN_ROLE>
export type DEFAULT_ADMIN_ROLEReturn = FunctionReturn<typeof functions.DEFAULT_ADMIN_ROLE>

export type ApproveParams = FunctionArguments<typeof functions.approve>
export type ApproveReturn = FunctionReturn<typeof functions.approve>

export type BalanceOfParams = FunctionArguments<typeof functions.balanceOf>
export type BalanceOfReturn = FunctionReturn<typeof functions.balanceOf>

export type BurnParams = FunctionArguments<typeof functions.burn>
export type BurnReturn = FunctionReturn<typeof functions.burn>

export type ContractTypeParams = FunctionArguments<typeof functions.contractType>
export type ContractTypeReturn = FunctionReturn<typeof functions.contractType>

export type ContractURIParams = FunctionArguments<typeof functions.contractURI>
export type ContractURIReturn = FunctionReturn<typeof functions.contractURI>

export type ContractVersionParams = FunctionArguments<typeof functions.contractVersion>
export type ContractVersionReturn = FunctionReturn<typeof functions.contractVersion>

export type Eip712DomainParams = FunctionArguments<typeof functions.eip712Domain>
export type Eip712DomainReturn = FunctionReturn<typeof functions.eip712Domain>

export type FreezeMetadataParams = FunctionArguments<typeof functions.freezeMetadata>
export type FreezeMetadataReturn = FunctionReturn<typeof functions.freezeMetadata>

export type GetApprovedParams = FunctionArguments<typeof functions.getApproved>
export type GetApprovedReturn = FunctionReturn<typeof functions.getApproved>

export type GetDefaultRoyaltyInfoParams = FunctionArguments<typeof functions.getDefaultRoyaltyInfo>
export type GetDefaultRoyaltyInfoReturn = FunctionReturn<typeof functions.getDefaultRoyaltyInfo>

export type GetPlatformFeeInfoParams = FunctionArguments<typeof functions.getPlatformFeeInfo>
export type GetPlatformFeeInfoReturn = FunctionReturn<typeof functions.getPlatformFeeInfo>

export type GetRoleAdminParams = FunctionArguments<typeof functions.getRoleAdmin>
export type GetRoleAdminReturn = FunctionReturn<typeof functions.getRoleAdmin>

export type GetRoleMemberParams = FunctionArguments<typeof functions.getRoleMember>
export type GetRoleMemberReturn = FunctionReturn<typeof functions.getRoleMember>

export type GetRoleMemberCountParams = FunctionArguments<typeof functions.getRoleMemberCount>
export type GetRoleMemberCountReturn = FunctionReturn<typeof functions.getRoleMemberCount>

export type GetRoyaltyInfoForTokenParams = FunctionArguments<typeof functions.getRoyaltyInfoForToken>
export type GetRoyaltyInfoForTokenReturn = FunctionReturn<typeof functions.getRoyaltyInfoForToken>

export type GrantRoleParams = FunctionArguments<typeof functions.grantRole>
export type GrantRoleReturn = FunctionReturn<typeof functions.grantRole>

export type HasRoleParams = FunctionArguments<typeof functions.hasRole>
export type HasRoleReturn = FunctionReturn<typeof functions.hasRole>

export type InitializeParams = FunctionArguments<typeof functions.initialize>
export type InitializeReturn = FunctionReturn<typeof functions.initialize>

export type IsApprovedForAllParams = FunctionArguments<typeof functions.isApprovedForAll>
export type IsApprovedForAllReturn = FunctionReturn<typeof functions.isApprovedForAll>

export type IsTrustedForwarderParams = FunctionArguments<typeof functions.isTrustedForwarder>
export type IsTrustedForwarderReturn = FunctionReturn<typeof functions.isTrustedForwarder>

export type MintToParams = FunctionArguments<typeof functions.mintTo>
export type MintToReturn = FunctionReturn<typeof functions.mintTo>

export type MintWithSignatureParams = FunctionArguments<typeof functions.mintWithSignature>
export type MintWithSignatureReturn = FunctionReturn<typeof functions.mintWithSignature>

export type MulticallParams = FunctionArguments<typeof functions.multicall>
export type MulticallReturn = FunctionReturn<typeof functions.multicall>

export type NameParams = FunctionArguments<typeof functions.name>
export type NameReturn = FunctionReturn<typeof functions.name>

export type NextTokenIdToMintParams = FunctionArguments<typeof functions.nextTokenIdToMint>
export type NextTokenIdToMintReturn = FunctionReturn<typeof functions.nextTokenIdToMint>

export type OwnerParams = FunctionArguments<typeof functions.owner>
export type OwnerReturn = FunctionReturn<typeof functions.owner>

export type OwnerOfParams = FunctionArguments<typeof functions.ownerOf>
export type OwnerOfReturn = FunctionReturn<typeof functions.ownerOf>

export type PlatformFeeRecipientParams = FunctionArguments<typeof functions.platformFeeRecipient>
export type PlatformFeeRecipientReturn = FunctionReturn<typeof functions.platformFeeRecipient>

export type PrimarySaleRecipientParams = FunctionArguments<typeof functions.primarySaleRecipient>
export type PrimarySaleRecipientReturn = FunctionReturn<typeof functions.primarySaleRecipient>

export type RenounceRoleParams = FunctionArguments<typeof functions.renounceRole>
export type RenounceRoleReturn = FunctionReturn<typeof functions.renounceRole>

export type RevokeRoleParams = FunctionArguments<typeof functions.revokeRole>
export type RevokeRoleReturn = FunctionReturn<typeof functions.revokeRole>

export type RoyaltyInfoParams = FunctionArguments<typeof functions.royaltyInfo>
export type RoyaltyInfoReturn = FunctionReturn<typeof functions.royaltyInfo>

export type SafeTransferFromParams_0 = FunctionArguments<typeof functions['safeTransferFrom(address,address,uint256)']>
export type SafeTransferFromReturn_0 = FunctionReturn<typeof functions['safeTransferFrom(address,address,uint256)']>

export type SafeTransferFromParams_1 = FunctionArguments<typeof functions['safeTransferFrom(address,address,uint256,bytes)']>
export type SafeTransferFromReturn_1 = FunctionReturn<typeof functions['safeTransferFrom(address,address,uint256,bytes)']>

export type SetApprovalForAllParams = FunctionArguments<typeof functions.setApprovalForAll>
export type SetApprovalForAllReturn = FunctionReturn<typeof functions.setApprovalForAll>

export type SetContractURIParams = FunctionArguments<typeof functions.setContractURI>
export type SetContractURIReturn = FunctionReturn<typeof functions.setContractURI>

export type SetDefaultRoyaltyInfoParams = FunctionArguments<typeof functions.setDefaultRoyaltyInfo>
export type SetDefaultRoyaltyInfoReturn = FunctionReturn<typeof functions.setDefaultRoyaltyInfo>

export type SetOwnerParams = FunctionArguments<typeof functions.setOwner>
export type SetOwnerReturn = FunctionReturn<typeof functions.setOwner>

export type SetPlatformFeeInfoParams = FunctionArguments<typeof functions.setPlatformFeeInfo>
export type SetPlatformFeeInfoReturn = FunctionReturn<typeof functions.setPlatformFeeInfo>

export type SetPrimarySaleRecipientParams = FunctionArguments<typeof functions.setPrimarySaleRecipient>
export type SetPrimarySaleRecipientReturn = FunctionReturn<typeof functions.setPrimarySaleRecipient>

export type SetRoyaltyInfoForTokenParams = FunctionArguments<typeof functions.setRoyaltyInfoForToken>
export type SetRoyaltyInfoForTokenReturn = FunctionReturn<typeof functions.setRoyaltyInfoForToken>

export type SetTokenURIParams = FunctionArguments<typeof functions.setTokenURI>
export type SetTokenURIReturn = FunctionReturn<typeof functions.setTokenURI>

export type SupportsInterfaceParams = FunctionArguments<typeof functions.supportsInterface>
export type SupportsInterfaceReturn = FunctionReturn<typeof functions.supportsInterface>

export type SymbolParams = FunctionArguments<typeof functions.symbol>
export type SymbolReturn = FunctionReturn<typeof functions.symbol>

export type TokenByIndexParams = FunctionArguments<typeof functions.tokenByIndex>
export type TokenByIndexReturn = FunctionReturn<typeof functions.tokenByIndex>

export type TokenOfOwnerByIndexParams = FunctionArguments<typeof functions.tokenOfOwnerByIndex>
export type TokenOfOwnerByIndexReturn = FunctionReturn<typeof functions.tokenOfOwnerByIndex>

export type TokenURIParams = FunctionArguments<typeof functions.tokenURI>
export type TokenURIReturn = FunctionReturn<typeof functions.tokenURI>

export type TotalSupplyParams = FunctionArguments<typeof functions.totalSupply>
export type TotalSupplyReturn = FunctionReturn<typeof functions.totalSupply>

export type TransferFromParams = FunctionArguments<typeof functions.transferFrom>
export type TransferFromReturn = FunctionReturn<typeof functions.transferFrom>

export type UriFrozenParams = FunctionArguments<typeof functions.uriFrozen>
export type UriFrozenReturn = FunctionReturn<typeof functions.uriFrozen>

export type VerifyParams = FunctionArguments<typeof functions.verify>
export type VerifyReturn = FunctionReturn<typeof functions.verify>

