"use client";
import { ELECTION_ABI } from "@/contracts/Election";
import { useReadContract } from "wagmi";

export const ElectionDescription = ({
  address,
  trim,
}: {
  address: string | any;
  trim?: boolean;
}) => {
  const result = useReadContract({
    abi: ELECTION_ABI,
    address: address,
    functionName: "description",
  });

  const value = result?.data as string;

  return (
    <span>
      {trim && value?.length > 100 ? value.slice(0, 100) + "..." : value}
    </span>
  );
};