"use client";
import { ElectionDescription } from "@/components/web3/ElectionDescription";
import { ElectionTitle } from "@/components/web3/ElectionTitle";
import { ELECTION_FACTORY_ABI, getFactoryAddress } from "@/contracts/ElectionFactory";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useChainId, useReadContract } from "wagmi";

export default function MyElections() {
  const chainId = useChainId();
  const result = useReadContract({
    abi: ELECTION_FACTORY_ABI,
    address: getFactoryAddress(chainId),
    functionName: "getElections",
  });

  return (
    <div>
      {(result.data as string[] || []).map((address) => (
        <Link
          key={address}
          href={`/dashboard/results/${address}`}
          className="flex justify-between items-center gap-7 py-5 border-b  border-[#9393934D] text-dark dark:text-white/60 pr-5"
        >
          <div className="w-full">
            <h5 className="text-xl">
              <ElectionTitle address={address} />
            </h5>
            <p className="mt-3 text-sm">
              <ElectionDescription address={address} />
            </p>
          </div>

          <ChevronRight className="size-6" />
        </Link>
      ))}
    </div>
  );
}