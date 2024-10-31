import { createThirdwebClient, defineChain } from "thirdweb";

export const providerUrl = "https://rpc.xfi.ms/archive/4157";

export const SECRET_KEY =
  "WFFmiXygjKheXYtxdb8jcbRUUG5-DXFEXD_YX67nASMePTMwmLUNXrxbZil4FySn517D23ZQ0XEA8YzjPycM3g";

export const client = createThirdwebClient({
  secretKey: SECRET_KEY,
});

export const testnetChainInfo = defineChain({
  id: 4157,
  rpc: providerUrl,
  nativeCurrency: {
    decimals: 18,
    name: "XFI",
    symbol: "XFI",
  },
  testnet: true,
  blockExplorers: [
    { name: "Testnet Explorer", url: "https://test.xfiscan.com/" },
  ],
});
