"use client";
import { ELECTION_ABI } from "@/contracts/Election";
import { useReadContract } from "wagmi";

export const ElectionStartDate = ({ address }: {
  address: string | any
}) => {
  const result = useReadContract({
    abi: ELECTION_ABI,
    address: address,
    functionName: 'startDate',
  });

  return <span>{new Date(Number(result?.data as string)).toLocaleString()}</span>
}