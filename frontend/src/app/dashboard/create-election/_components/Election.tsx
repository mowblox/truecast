"use client";
import { DatePicker } from "@/components/ui/date-picker";
import { RadioGroupItem, RadioGroup } from "@/components/ui/radio-group";
import React, { useState } from "react";
import TextInput from "./inputs/TextInput";
import InputWrapper from "./inputs/InputWrapper";
import { useRouter } from "next/navigation";
import { useChainId, useWatchContractEvent, useWriteContract } from "wagmi";
import {
  ELECTION_FACTORY_ABI,
  getFactoryAddress,
} from "@/contracts/ElectionFactory";
import { Button } from "@/components/ui/button";

type Period = {
  startDate: Date | undefined;
  endDate: Date | undefined;
};

const Election = () => {
  const router = useRouter();
  const chainId = useChainId();
  const { writeContract } = useWriteContract();
  const [period, setPeriod] = useState<Period>({
    startDate: undefined,
    endDate: undefined,
  });

  useWatchContractEvent({
    address: getFactoryAddress(chainId),
    abi: ELECTION_FACTORY_ABI,
    eventName: "ElectionCreated",
    onLogs(logs) {
      // console.log('New logs!', logs);
      if (logs.length) {
        router.push(
          // @ts-expect-error
          `?tab=candidates&election=${logs[0]?.args?.electionAddress}`
        );
      }
    },
  });

  const createElection = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    // console.log(formData.get("election-type"));
    writeContract({
      abi: ELECTION_FACTORY_ABI,
      address: getFactoryAddress(chainId),
      functionName: "createElection",
      args: [
        formData.get("title"),
        formData.get("description"),
        formData.get("election-type") === 'public',
        period.startDate?.valueOf(),
        period.endDate?.valueOf(),
      ],
    });
  };

  return (
    <form onSubmit={createElection} className="flex flex-col gap-14 w-full">
      <TextInput
        name="title"
        label="Election Title"
        placeholder="Eg. 2024 SRC President - UG"
      />
      <TextInput
        name="description"
        label="Description"
        placeholder="Write a brief summary about the purpose of the election"
      />

      <div className="flex flex-col gap-3">
        <label htmlFor="period" className="text-lg dark:text-white/87">
          Election Period
        </label>
        <div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
          <DatePicker
            selected={period.startDate}
            onSelect={(value) => setPeriod({ ...period, startDate: value })}
            placeholder="Start date"
          />
          <DatePicker
            selected={period.endDate}
            onSelect={(value) => setPeriod({ ...period, endDate: value })}
            placeholder="End date"
          />
        </div>
      </div>

      <InputWrapper name="election-type" label="Election Type">
        <RadioGroup
          name="election-type"
          defaultValue="public"
          className="flex gap-10"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="public" id="public" />
            <label htmlFor="public">Public</label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="private" id="private" />
            <label htmlFor="private">Private</label>
          </div>
        </RadioGroup>
      </InputWrapper>

      <div className="mt-5 flex justify-end">
        <Button type="submit" className="px-12" size="lg">
          Next
        </Button>
      </div>
    </form>
  );
};

export default Election;
