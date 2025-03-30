"use client";
import React from "react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { ELECTION_ABI } from "@/contracts/Election";
import { useReadContract } from "wagmi";
import { ElectionTitle } from "@/components/web3/ElectionTitle";
import { ElectionDescription } from "@/components/web3/ElectionDescription";
import { ElectionStartDate } from "@/components/web3/ElectionStartDate";
import { ElectionEndDate } from "@/components/web3/ElectionEndDate";
import { ElectionType } from "@/components/web3/ElectionType";

const Summary = () => {
  const { id: electionAddress } = useParams();
  const searchParams = useSearchParams();
  const result = useReadContract({
    abi: ELECTION_ABI,
    address: searchParams.get("election") || electionAddress as any,
    functionName: "getCandidates",
  });

  return (
    <div className="w-full flex flex-col gap-12">
      <div className="flex flex-col gap-3">
        <label className="text-lg">Election Title</label>
        <div className="flex flex-col gap-2 text-white/40 text-lg">
          <ElectionTitle address={searchParams.get("election") || electionAddress} />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <label className="text-lg">Election Description</label>
        <div className="flex flex-col gap-2 text-white/40 text-lg">
          <ElectionDescription address={searchParams.get("election") || electionAddress} />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <label className="text-lg">Election Period</label>
        <div className="flex flex-col gap-2 text-white/40 text-lg">
          <p>
            <ElectionStartDate address={searchParams.get("election") || electionAddress} />
            {" "} - {" "}
            <ElectionEndDate address={searchParams.get("election") || electionAddress} />
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <label className="text-lg">Election Type</label>
        <div className="flex flex-col gap-2 text-white/40 text-lg">
          <ElectionType address={searchParams.get("election") || electionAddress} />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <label className="text-lg">Candidates</label>
        <div className="flex flex-col gap-2">
          {(result?.data as any[])?.map((candidate) => (
            <p key={candidate.id} className="text-white/40 text-lg">
              {candidate.name}
            </p>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <label className="text-lg">Voter Count</label>
        <div className="flex flex-col gap-2 text-white/40 text-lg">
          <p>24</p>
        </div>
      </div>
      <div className="flex justify-end mt-24">
        <Link
          href={`/dashboard/elections/${searchParams.get("election") || electionAddress}`}
          className="bg-secondary dark:bg-primary rounded-full px-12 text-white py-2.5">
          Publish
        </Link>
      </div>
    </div>
  );
};

export default Summary;
