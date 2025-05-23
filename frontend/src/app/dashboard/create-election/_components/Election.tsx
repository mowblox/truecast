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
import { toast } from "sonner";
import { DateTimePicker } from "@/components/ui/datetime-picker";

type Period = {
  startDate: Date | undefined;
  endDate: Date | undefined;
};

const Election = () => {
  const router = useRouter();
  const chainId = useChainId();
  const { writeContract, isPending } = useWriteContract();
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

  const validatePeriod = (period: Period) => {
    if (!(period.startDate && period.endDate)) {
      return { status: false, message: "Please select a start and end date." };
    }
    if (period.startDate.getTime() > period.endDate.getTime()) {
      return {
        status: false,
        message: "Start date must come before end date.",
      };
    }
    return { status: true, message: "" };
  };

  const createElection = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const result = validatePeriod(period);
    if (!result.status) {
      toast.error(result.message);
      return;
    }
    // console.log(formData.get("election-type"));
    writeContract(
      {
        abi: ELECTION_FACTORY_ABI,
        address: getFactoryAddress(chainId),
        functionName: "createElection",
        args: [
          formData.get("title"),
          formData.get("description"),
          formData.get("election-type") === "public",
          period.startDate?.valueOf(),
          period.endDate?.valueOf(),
        ],
      },
      {
        onSuccess: () => {
          toast.success("Election created successfully.");
        },
      }
    );
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
        <Button loading={isPending} type="submit" className="px-12" size="lg">
          Next
        </Button>
      </div>
    </form>
  );
};

export default Election;
