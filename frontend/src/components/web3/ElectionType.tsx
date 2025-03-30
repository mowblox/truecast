"use client";
import { ELECTION_ABI } from "@/contracts/Election";
import { useReadContract } from "wagmi";

export const ElectionType = ({ address }: {
  address: string | any
}) => {
  const result = useReadContract({
    abi: ELECTION_ABI,
    address: address,
    functionName: 'isPublic',
  });

  return <span>{result?.data as boolean ? 'Public' : 'Private'}</span>
}