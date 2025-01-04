'use client';
import { ELECTION_ABI } from "@/contracts/Election";
import { useAccount, useChainId } from "wagmi";
import { useState, useEffect } from "react";
import Web3 from "web3";

export default function ElectionTitle({ address }: { address: string }) {
  const chainId = useChainId();
  const { connector } = useAccount();
  const [title, setTitle] = useState('Loading...');

  const getTitle = async () => {
    // Call transaction
    if (connector) {
      // Initialize web3
      // @ts-ignore
      const web3 = new Web3(await connector.getProvider());
      // Initialize contract
      const election = new web3.eth.Contract(ELECTION_ABI, address);
      // Invote method
      election
        .methods
        .title()
        .call()
        .then(data => setTitle(String(data)))
        .catch(console.log);
    }
  }

  useEffect(() => {
    getTitle();
  }, [chainId]);

  return <span>{title}</span>;
}
