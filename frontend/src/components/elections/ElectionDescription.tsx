'use client';
import { ELECTION_ABI } from "@/contracts/Election";
import { useAccount, useChainId } from "wagmi";
import { useState, useEffect } from "react";
import Web3 from "web3";

export default function ElectionDescription({ address }: Readonly<{ address: string }>) {
  const chainId = useChainId();
  const { connector } = useAccount();
  const [description, setDescription] = useState('Loading...');

  const getDescription = async () => {
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
        .description()
        .call()
        .then(data => setDescription(String(data)))
        .catch(console.log);
    }
  }

  useEffect(() => {
    getDescription();
  }, [chainId])

  return <span>{description}</span>
}