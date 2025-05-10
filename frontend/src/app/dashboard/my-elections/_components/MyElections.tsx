"use client";
import { ELECTION_FACTORY_ABI, getFactoryAddress } from "@/contracts/ElectionFactory";
import { useAccount, useChainId, useReadContract } from "wagmi";
import ElectionTile from "./ElectionTile";

export default function MyElections() {
  const account = useAccount();
  const chainId = useChainId();
  const result = useReadContract({
    abi: ELECTION_FACTORY_ABI,
    address: getFactoryAddress(chainId),
    functionName: "getOwnerElections",
    args: [account.address]
  });

  return (
    <div>
      {(result.data as string[] || []).map((address) => <ElectionTile key={address} address={address} />)}
    </div>
  );
}