"use client";
import { ELECTION_ABI } from "@/contracts/Election";
import { useReadContract } from "wagmi";

export const ElectionTitle = ({ address }: {
  address: string | any
}) => {
  const result = useReadContract({
    abi: ELECTION_ABI,
    address: address,
    functionName: 'title',
  });
  console.log(result?.data);

  return <span>{result?.data as string}</span>
}