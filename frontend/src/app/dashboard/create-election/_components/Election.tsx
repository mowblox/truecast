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
    const startDate = Math.floor(Date.now() / 1000) + 3600; // 1 hour in the future
    const endDate = startDate + 86400; // 1 day after start date
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    writeContract({
      abi: ELECTION_FACTORY_ABI,
      address: getFactoryAddress(chainId),
      functionName: "createElection",
      args: [
        formData.get("title"),
        formData.get("description"),
        true,
        startDate,
        endDate,
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
          defaultValue="option-one"
          className="flex gap-10"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-one" id="option-one" />
            <label htmlFor="option-one">Public</label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-two" id="option-two" />
            <label htmlFor="option-two">Private</label>
          </div>
        </RadioGroup>
      </InputWrapper>

      <div className="mt-5 flex justify-end">
        <button
          type="submit"
          className="bg-secondary dark:bg-primary rounded-full px-12 text-white py-2.5"
        >
          Next
        </button>
      </div>
    </form>
  );
};

export default Election;
