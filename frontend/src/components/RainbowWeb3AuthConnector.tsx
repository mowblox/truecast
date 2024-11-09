import { Web3AuthConnector } from "@web3auth/web3auth-wagmi-connector";
import { Web3Auth } from "@web3auth/modal";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { CHAIN_NAMESPACES, UX_MODE, WEB3AUTH_NETWORK } from "@web3auth/base";
import { Wallet, WalletDetailsParams } from "@rainbow-me/rainbowkit";
import { createConnector as createWagmiConnector } from "wagmi";

const clientId: string = process.env.NEXT_PUBLIC_WEB3AUTH_CLIENT_ID || ""; // get from https://dashboard.web3auth.io
  
// testnet config
const chainConfig = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: "0xaa36a7", // Sepolia Testnet
  rpcTarget: "https://rpc.sepolia.org", // or another RPC provider
  displayName: "Ethereum Sepolia Testnet",
  blockExplorerUrl: "https://sepolia.etherscan.io/",
  ticker: "ETH",
  tickerName: "Ethereum",
  logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
};

// mainnet config
const mainnetChainConfig = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: "0x1", // Mainnet
  rpcTarget: "https://rpc.ankr.com/eth",
  displayName: "Ethereum Mainnet",
  blockExplorerUrl: "https://etherscan.io/",
  ticker: "ETH",
  tickerName: "Ethereum",
  logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
};

const privateKeyProvider = new EthereumPrivateKeyProvider({ config: { chainConfig } });

const web3AuthInstance = new Web3Auth({
  clientId,
  web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_MAINNET,
  privateKeyProvider,
  uiConfig: {
    mode: "dark",
    useLogoLoader: true,
    logoLight: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
    logoDark: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
    defaultLanguage: "en",
    theme: {
      primary: "#768729",
    },
    uxMode: UX_MODE.REDIRECT,
    modalZIndex: "2147483647"
  }
});

export const rainbowWeb3AuthConnector = (): Wallet => ({
  id: "web3auth",
  name: "Web3auth",
  rdns: "web3auth",
  iconUrl: "https://web3auth.io/images/web3authlog.png",
  iconBackground: "#fff",
  installed: true,
  downloadUrls: {},
  createConnector: (walletDetails: WalletDetailsParams) =>
    createWagmiConnector((config) => ({
      ...Web3AuthConnector({
        web3AuthInstance,
      })(config),
      ...walletDetails,
    })),
});