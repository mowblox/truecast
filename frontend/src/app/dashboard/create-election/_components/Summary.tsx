"use client";
import React from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { ELECTION_ABI } from "@/contracts/Election";
import { useReadContract } from "wagmi";
import { ElectionTitle } from "@/components/web3/ElectionTitle";
import { ElectionDescription } from "@/components/web3/ElectionDescription";
import { ElectionStartDate } from "@/components/web3/ElectionStartDate";
import { ElectionEndDate } from "@/components/web3/ElectionEndDate";
import { ElectionType } from "@/components/web3/ElectionType";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import useElectionSummary from "@/hooks/use-election-summary";

const Summary = ({ isPublished }: { isPublished?: boolean }) => {
  const { id: electionAddress } = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const result = useReadContract({
    abi: ELECTION_ABI,
    address: searchParams.get("election") || (electionAddress as any),
    functionName: "getCandidates",
  });
  const summary = useElectionSummary({
    address: searchParams.get("election") || (electionAddress as any),
  });

  const onConfirmPublish = () => {
    // Implement publish logic here...
    router.push(
      `/dashboard/results/${searchParams.get("election") || electionAddress}`
    );
  };

  return (
    <div className="w-full flex flex-col gap-12">
      <div className="flex flex-col gap-3">
        <label className="text-lg">Election Title</label>
        <div className="flex flex-col gap-2 text-white/40 text-lg">
          <ElectionTitle
            address={searchParams.get("election") || electionAddress}
          />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <label className="text-lg">Election Description</label>
        <div className="flex flex-col gap-2 text-white/40 text-lg">
          <ElectionDescription
            address={searchParams.get("election") || electionAddress}
          />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <label className="text-lg">Election Period</label>
        <div className="flex flex-col gap-2 text-white/40 text-lg">
          <p>
            <ElectionStartDate
              address={searchParams.get("election") || electionAddress}
            />{" "}
            -{" "}
            <ElectionEndDate
              address={searchParams.get("election") || electionAddress}
            />
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <label className="text-lg">Election Type</label>
        <div className="flex flex-col gap-2 text-white/40 text-lg">
          <ElectionType
            address={searchParams.get("election") || electionAddress}
          />
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
          <p>{summary ? Number((summary as any[])[1]) || "unlimited" : 0}</p>
        </div>
      </div>

      {isPublished ? null : (
        <div className="flex justify-end mt-24">
          <SubmitDialog onConfirmPublish={onConfirmPublish} />
        </div>
      )}
    </div>
  );
};

const SubmitDialog = ({ onConfirmPublish }: { onConfirmPublish: Function }) => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button as="div" className="px-12">
          <div>Publish</div>
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-dark text-center border border-[#EAEAEA]/30 py-16 px-[52px] sm:rounded-[18px]">
        <DialogTitle className="text-[32px] font-semibold">
          Are you sure?
        </DialogTitle>
        <p className="text-white/60 text-lg">
          This action cannot be reversed. Once you publish, you will not be able
          to make changes. Cancel, to make changes or publish to generate
          election link.
        </p>

        <div className="flex items-center justify-center gap-5 mt-12">
          <DialogClose>
            <Button as="span" size="lg" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button as="span" size="lg" onClick={() => onConfirmPublish()}>
            Publish
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Summary;
