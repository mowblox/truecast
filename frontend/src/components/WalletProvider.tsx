"use client";
import '@rainbow-me/rainbowkit/styles.css';
import { darkTheme, getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { rainbowWeb3AuthConnector } from "./RainbowWeb3AuthConnector";
import { WagmiProvider, http } from 'wagmi';
import { rainbowWallet, metaMaskWallet } from '@rainbow-me/rainbowkit/wallets';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { sepolia, scrollSepolia, mainnet } from 'wagmi/chains';

const queryClient = new QueryClient();

const config = getDefaultConfig({
  appName: 'TrueCast',
  projectId: process.env.NEXT_PUBLIC_MAGIC_API_KEY || "", 
  chains: [mainnet, sepolia, scrollSepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [scrollSepolia.id]: http(),
  },
  wallets: [{
    groupName: 'Recommended',
    wallets: [
      rainbowWallet,
      rainbowWeb3AuthConnector,
      metaMaskWallet,
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