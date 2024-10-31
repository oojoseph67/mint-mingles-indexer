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
import { NFTAttribute, NFTProperty } from "../model";

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

  console.log("updatedNFT", { updatedNFT });

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
