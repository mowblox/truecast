"use client";
import '@rainbow-me/rainbowkit/styles.css';
import { darkTheme, getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';
// import { rainbowWeb3AuthConnector } from "./RainbowWeb3AuthConnector";
import { WagmiProvider, http } from 'wagmi';
import { rainbowWallet, metaMaskWallet, walletConnectWallet } from '@rainbow-me/rainbowkit/wallets';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { sepolia, scrollSepolia, mainnet, lineaSepolia, hoodi } from 'wagmi/chains';

const queryClient = new QueryClient();

const config = getDefaultConfig({
  appName: 'TrueCast',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "",
  chains: [mainnet, sepolia, hoodi, scrollSepolia, lineaSepolia],
  transports: {
    [mainnet.id]: http('https://ethereum-rpc.publicnode.com'),
    [sepolia.id]: http('https://ethereum-sepolia-rpc.publicnode.com'),
    [hoodi.id]: http('https://ethereum-hoodi-rpc.publicnode.com'),
    [scrollSepolia.id]: http('https://sepolia-rpc.scroll.io'),
    [lineaSepolia.id]: http('https://rpc.sepolia.linea.build'),
  },
  wallets: [{
    groupName: 'Recommended',
    wallets: [
      rainbowWallet,
      // rainbowWeb3AuthConnector,
      metaMaskWallet,
      walletConnectWallet
    ],
  }],
});

export default function WalletProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={darkTheme()}>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}