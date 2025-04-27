"use client";
import { StatusPill } from "@/components/dashboard/StatusPill";
import { ElectionDescription } from "@/components/web3/ElectionDescription";
import { ElectionTitle } from "@/components/web3/ElectionTitle";
import { ElectionType } from "@/components/web3/ElectionType";
import useElectionStatus from "@/hooks/use-election-status";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";

const ElectionTile = ({
  address,
}: {
  address: string;
}) => {
  const status = useElectionStatus({ address });

  return (
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
        <p className="mt-3 text-sm flex justify-between">
          <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-gray-500/10 ring-inset">
            <ElectionType address={address} />
          </span>
          <StatusPill status={status} />
        </p>
      </div>

      <ChevronRight className="size-6" />
    </Link>
  );
};

export default ElectionTile;
