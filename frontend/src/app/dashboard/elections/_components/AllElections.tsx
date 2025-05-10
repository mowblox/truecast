"use client";
import { ELECTION_FACTORY_ABI, getFactoryAddress } from "@/contracts/ElectionFactory";
import { useChainId, useReadContract } from "wagmi";
import ElectionCard from "./ElectionCard";

export default function AllElections() {
  const chainId = useChainId();
  const result = useReadContract({
    abi: ELECTION_FACTORY_ABI,
    address: getFactoryAddress(chainId),
    functionName: "getPublicElections",
  });

  return (
    <>
      {(result.data as string[] || []).map((address) => (
        <ElectionCard key={address} address={address} />
      ))}
    </>
  );
}