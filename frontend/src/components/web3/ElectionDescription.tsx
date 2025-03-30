"use client";
import { ELECTION_ABI } from "@/contracts/Election";
import { useReadContract } from "wagmi";

export const ElectionDescription = ({ address }: {
  address: string | any
}) => {
  const result = useReadContract({
    abi: ELECTION_ABI,
    address: address,
    functionName: 'description',
  });

  return <span>{result?.data as string}</span>
}