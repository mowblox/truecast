"use client";
import { ElectionEndDate } from "@/components/web3/ElectionEndDate";
import { ElectionOwner } from "@/components/web3/ElectionOwner";
import { ElectionStartDate } from "@/components/web3/ElectionStartDate";
import { ElectionType } from "@/components/web3/ElectionType";
import useElectionSummary from "@/hooks/use-election-summary";
import { useParams } from "next/navigation";

export default function ElectionSummary() {
  const { id } = useParams();
  const summary = useElectionSummary({ address: id })

  return (
    <>
      <div className="flex justify-between">
        <p>Created by</p>
        <p className="text-secondary">
          <ElectionOwner address={id} />
        </p>
      </div>
      <div className="flex justify-between">
        <p>Start date</p>
        <p className="text-secondary">
          <ElectionStartDate address={id} />
        </p>
      </div>
      <div className="flex justify-between">
        <p>End date</p>
        <p className="text-secondary">
          <ElectionEndDate address={id} />
        </p>
      </div>
      <div className="flex justify-between">
        <p>Election type</p>
        <p className="text-secondary">
          <ElectionType address={id} />
        </p>
      </div>
      <div className="flex justify-between">
        <p>Voters</p>
        <p className="text-secondary">{summary ? Number((summary as any[])[1]) : 0}</p>
      </div>
    </>
  );
}