"use client";
import React, { useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { ELECTION_ABI } from "@/contracts/Election";
import { useConfig, useReadContract } from "wagmi";
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
import useElectionVoters from "@/hooks/use-election-voters";
import { DateTimePicker } from "@/components/ui/datetime-picker";
import { waitForTransactionReceipt, simulateContract, writeContract } from '@wagmi/core'
import { toast } from "sonner";

type Period = {
  startDate: Date | undefined;
  endDate: Date | undefined;
};

const Summary = ({ isPublished }: { isPublished?: boolean }) => {
  const config = useConfig();
  const [isPending, setIsPending] = useState<boolean>(false);
  const [period, setPeriod] = useState<Period>({
    startDate: undefined,
    endDate: undefined,
  });
  const searchParams = useSearchParams();
  const router = useRouter();
  const result = useReadContract({
    abi: ELECTION_ABI,
    address: searchParams.get("election") as any,
    functionName: "getCandidates",
  });
  const voters = useElectionVoters({
    address: searchParams.get("election"),
  });

  const updateElectionDates = async () => {
    setIsPending(true);
    // Simulate transaction
    try {
      await simulateContract(config, {
        abi: ELECTION_ABI,
        address: searchParams.get("election") as any,
        functionName: "updateElectionDates",
        args: [
          period.startDate?.valueOf(),
          period.endDate?.valueOf(),
        ],
      });
    } catch (error: any) {
      setIsPending(false);
      console.log(error?.message.split('Contract Call:')[0].trim());
      return toast.error(error?.message.split('Contract Call:')[0].trim());
    }
    // Perform transaction
    const hash = await writeContract(config, {
      abi: ELECTION_ABI,
      address: searchParams.get("election") as any,
      functionName: "updateElectionDates",
      args: [
        period.startDate?.valueOf(),
        period.endDate?.valueOf(),
      ],
    });
    // Wait for transaction to complete
    await waitForTransactionReceipt(config, { hash });
    location.reload();
  }

  const onConfirmPublish = async () => {
    setIsPending(true);
    // Simulate transaction
    try {
      await simulateContract(config, {
        abi: ELECTION_ABI,
        address: searchParams.get("election") as any,
        functionName: "goLive",
      });
    } catch (error: any) {
      setIsPending(false);
      console.log(error?.message.split('Contract Call:')[0].trim());
      return toast.error(error?.message.split('Contract Call:')[0].trim());
    }
    // Perform transaction
    const hash = await writeContract(config, {
      abi: ELECTION_ABI,
      address: searchParams.get("election") as any,
      functionName: "goLive",
    });
    // Wait for transaction to complete
    await waitForTransactionReceipt(config, { hash });
    router.push(
      `/dashboard/results/${searchParams.get("election")}`
    );
  };

  return (
    <div className="w-full flex flex-col gap-12">
      <div className="flex flex-col gap-3">
        <label htmlFor="period" className="text-lg dark:text-white/87">
          <span className="font-bold">Timeline</span> (Choose when your election starts and ends.)
        </label>
        <div className="grid md:grid-cols-3 gap-x-8 gap-y-4">
          <DateTimePicker
            disabled={{ before: new Date() }}
            selected={period.startDate}
            onSelect={(value) => setPeriod({ ...period, startDate: value })}
            placeholder="Start date"
            required
          />
          <DateTimePicker
            disabled={{ before: new Date(period.startDate || "") }}
            selected={period.endDate}
            onSelect={(value) => setPeriod({ ...period, endDate: value })}
            placeholder="End date"
            required
          />
          <Button loading={isPending} as="span" size="lg" onClick={updateElectionDates}>
            Set Timeline
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <label className="text-lg">Election Title</label>
        <div className="flex flex-col gap-2 text-text dark:text-white/40 text-lg">
          <ElectionTitle
            address={searchParams.get("election")}
          />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <label className="text-lg">Election Description</label>
        <div className="flex flex-col gap-2 text-text dark:text-white/40 text-lg">
          <ElectionDescription
            address={searchParams.get("election")}
          />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <label className="text-lg">Election Period</label>
        <div className="flex flex-col gap-2 text-text dark:text-white/40 text-lg">
          <p>
            <ElectionStartDate
              address={searchParams.get("election")}
            />{" "}
            -{" "}
            <ElectionEndDate
              address={searchParams.get("election")}
            />
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <label className="text-lg">Election Type</label>
        <div className="flex flex-col gap-2 text-text dark:text-white/40 text-lg">
          <ElectionType
            address={searchParams.get("election")}
          />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <label className="text-lg">Candidates</label>
        <div className="flex flex-col gap-2">
          {(result?.data as any[])?.map((candidate) => (
            <p
              key={candidate.id}
              className="text-text dark:text-white/40 text-lg"
            >
              {candidate.name}
            </p>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <label className="text-lg">Voter Count</label>
        <div className="flex flex-col gap-2 text-text dark:text-white/40 text-lg">
          <p>{voters ? Number(voters as string) : "unlimited".toUpperCase()}</p>
        </div>
      </div>

      {isPublished ? null : (
        <div className="flex justify-end mt-24">
          <SubmitDialog isLoading={isPending} onConfirmPublish={onConfirmPublish} />
        </div>
      )}
    </div>
  );
};

const SubmitDialog = ({ onConfirmPublish, isLoading }: { onConfirmPublish: Function, isLoading: boolean }) => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button as="div" className="px-12">
          <div>Publish</div>
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-white dark:bg-dark text-center border border-gray/30 dark:border-[#EAEAEA]/30 py-16 px-[52px] sm:rounded-[18px]">
        <DialogTitle className="text-[32px] font-semibold">
          Are you sure?
        </DialogTitle>
        <p className="dark:text-white/60 text-lg">
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
          <Button loading={isLoading} as="span" size="lg" onClick={() => onConfirmPublish()}>
            Publish
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Summary;
