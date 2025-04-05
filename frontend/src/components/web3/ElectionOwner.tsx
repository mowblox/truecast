"use client";
import { ELECTION_ABI } from "@/contracts/Election";
import { useReadContract } from "wagmi";

export const ElectionOwner = ({ address }: {
  address: string | any
}) => {
  const result = useReadContract({
    abi: ELECTION_ABI,
    address: address,
    functionName: 'owner',
  });

  return <span>{(result?.data as string)?.substring(0, 6)}...{(result?.data as string)?.substring(36)}</span>
}