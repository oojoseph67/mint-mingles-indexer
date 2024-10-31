import {
  getContract as getContractThirdweb,
  NFT as NFTThirdweb,
} from "thirdweb";
import { getNFT as getNFTThirdweb } from "thirdweb/extensions/erc721";
import { v4 as uuidv4 } from "uuid";
import type { AbiFunction } from "abitype";
import { testnetChainInfo, client } from "./config";
import erc721Abi from "../../abi/erc721.json";
import { tryParseJSON } from "./utils";
import { NFT, NFTAttribute, NFTMetadata, NFTProperty } from "../model";
import { ContextType } from "../main";

export function getContractCustom({
  contractAddress,
}: {
  contractAddress: string;
}) {
  const contract = getContractThirdweb({
    client: client,
    chain: testnetChainInfo,
    address: contractAddress,
    abi: erc721Abi as readonly AbiFunction[],
  });

  return contract;
}

export async function getNFTCustom({
  contractAddress,
  tokenId,
}: {
  contractAddress: string;
  tokenId: bigint;
}) {
  const thirdwebAssetContract = getContractCustom({
    contractAddress: contractAddress,
  });

  const nft: NFTThirdweb = await getNFTThirdweb({
    contract: thirdwebAssetContract,
    tokenId: tokenId,
    includeOwner: true,
  });

  const initialNFT = {
    owner: nft.owner || null,
    tokenId: nft.id || tokenId,
    tokenURI: nft.tokenURI || "",
    type: nft.type || null,
    // @ts-ignore
    metadata: {
      name: nft.metadata.name,
      description: nft.metadata.description,
      image: nft.metadata.image,
      animationUrl: nft.metadata.animation_url,
      externalUrl: nft.metadata.external_url,
      backgroundColor: nft.metadata.background_color,
      properties: Array.isArray(nft.metadata.properties)
        ? nft.metadata.properties.map((prop) => ({
            name: String(prop.name || prop.key),
            value: String(prop.value),
          }))
        : [],
      attributes: Array.isArray(nft.metadata.attributes)
        ? nft.metadata.attributes.map((attr) => ({
            traitType: String(attr.trait_type || attr.traitType),
            value: String(attr.value),
          }))
        : [],
      supply: nft.metadata.supply as number | undefined,
      imageUrl: nft.metadata.image_url,
      customImage: nft.metadata.customImage as string | undefined,
      customAnimationUrl: nft.metadata.customAnimationUrl as string | undefined,
    },
  };

  let updatedNFT = initialNFT;

  const uri = nft.tokenURI;
  const parsedMetadata = typeof uri === "string" ? tryParseJSON(uri) : uri;

  if (parsedMetadata && typeof parsedMetadata === "object") {
    updatedNFT = {
      ...updatedNFT,
      tokenURI: parsedMetadata.image || updatedNFT.tokenURI,
      metadata: {
        ...updatedNFT.metadata,
        ...parsedMetadata,
      },
    };
  }

  return updatedNFT;
}

export async function saveNFT({
  contractAddress,
  tokenId,
  ctx,
}: {
  contractAddress: string;
  tokenId: bigint;
  ctx: ContextType;
}) {
  const existingNFT = await ctx.store.findOne(NFT, {
    where: {
      tokenId: tokenId,
      assetContract: contractAddress.toLowerCase(),
    },
  });

  if (existingNFT) {
    console.log("returning existing NFT");
    return existingNFT;
  }

  let dbNFT: NFT;

  const nft = await getNFTCustom({
    contractAddress: contractAddress,
    tokenId: tokenId,
  });

  console.log("NFT: for loop", nft);
  console.log("NFT: for loop metadata", nft.metadata);
  console.log("NFT: for loop attributes", nft.metadata.attributes);
  console.log("NFT: for loop properties", nft.metadata.properties);

  const attributes = nft.metadata.attributes.map(
    (attr) =>
      new NFTAttribute({
        traitType: attr.traitType,
        value: attr.value,
      })
  );

  const properties = nft.metadata.properties.map(
    (prop) =>
      new NFTProperty({
        name: prop.name,
        value: prop.value,
      })
  );

  const metadata = new NFTMetadata({
    name: nft.metadata.name || "",
    description: nft.metadata.description || "",
    image: nft.metadata.image || "",
    animationUrl: nft.metadata.animationUrl || "",
    externalUrl: nft.metadata.externalUrl || "",
    backgroundColor: nft.metadata.backgroundColor || "",
    supply: nft.metadata.supply || 0,
    imageUrl: nft.metadata.imageUrl || "",
    customImage: nft.metadata.customImage || "",
    customAnimationUrl: nft.metadata.customAnimationUrl || "",
    attributes: attributes,
    properties: properties,
  });

  dbNFT = new NFT({
    id: uuidv4(),
    owner: nft.owner || "",
    tokenId: tokenId,
    tokenURI: nft.tokenURI || "",
    type: nft.type || "",
    assetContract: contractAddress,
    metadata: metadata,
  });

  await ctx.store.insert(dbNFT);
}
