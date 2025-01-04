import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-verify";
import "@nomicfoundation/hardhat-ignition-ethers";
import * as dotenv from 'dotenv';

dotenv.config();


const config: HardhatUserConfig = {
  solidity: "0.8.24",
  gasReporter: {
    enabled: true
  },
  networks: {
    sepolia_testnet: {
      url: `https://ethereum-sepolia-rpc.publicnode.com`,
      accounts: [process.env.PRIVATE_KEY as string],
    },
    ethereum_mainnet: {
      url: `https://ethereum-rpc.publicnode.com`,
      accounts: [process.env.MAINNET_PRIVATE_KEY as string],
    },
    linea_sepolia: {
      url: `https://rpc.sepolia.linea.build`,
      accounts: [process.env.PRIVATE_KEY as string],
    },
    linea_mainnet: {
      url: `https://rpc.linea.build/`,
      accounts: [process.env.PRIVATE_KEY as string],
    },
    scroll_sepolia: {
      url: `https://sepolia-rpc.scroll.io/`,
      accounts: [process.env.PRIVATE_KEY as string],
    },
    scroll_mainnet: {
      url: `https://rpc.scroll.io/`,
      accounts: [process.env.PRIVATE_KEY as string],
    },
    holesky: {
      url: 'https://1rpc.io/holesky',
      accounts: [process.env.PRIVATE_KEY as string]
    }
  },
  etherscan: {
    apiKey: {
      sepolia: process.env.ETHERSCAN_API_KEY as string,
      linea: process.env.LINEA_API_KEY as string,
      scroll: process.env.SCROLL_API_KEY as string,
      scroll_sepolia: process.env.SCROLL_API_KEY as string,
      holesky: process.env.ETHERSCAN_API_KEY as string
    },
    customChains: [
      {
        network: "linea",
        chainId: 59141, // Linea's chain ID
        urls: {
          apiURL: "https://lineascan.io/api",
          browserURL: "https://lineascan.io",
        },
      },
      {
        network: "scroll",
        chainId: 534351, // Scroll's chain ID
        urls: {
          apiURL: "https://api.scrollscan.com",
          browserURL: "https://scrollscan.com",
        },
      },
      {
        network: "scroll_sepolia",
        chainId: 534351, // Scroll's chain ID
        urls: {
          apiURL: "https://api.scrollscan.com",
          browserURL: "https://scrollscan.com",
        },
      },
    ],
  },
  sourcify: {
    enabled: true, //optional to enable sourcify verification
  },
};

export default config;
