"use client";
import { RadioGroupItem, RadioGroup } from "@/components/ui/radio-group";
import React, { useState } from "react";
import TextInput from "./inputs/TextInput";
import InputWrapper from "./inputs/InputWrapper";
import { useRouter } from "next/navigation";
import { useChainId, useConfig } from "wagmi";
import { waitForTransactionReceipt, simulateContract, writeContract } from '@wagmi/core'
import { parseEventLogs } from "viem";
import {
  ELECTION_FACTORY_ABI,
  getFactoryAddress,
} from "@/contracts/ElectionFactory";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Election = () => {
  const router = useRouter();
  const config = useConfig();
  const chainId = useChainId();
  const [isPending, setIsPending] = useState<boolean>(false);

  // const validatePeriod = (period: Period) => {
  //   if (!(period.startDate && period.endDate)) {
  //     return { status: false, message: "Please select a start and end date." };
  //   }
  //   if (period.startDate.getTime() > period.endDate.getTime()) {
  //     return {
  //       status: false,
  //       message: "Start date must come before end date.",
  //     };
  //   }
  //   return { status: true, message: "" };
  // };

  const createElection = async (event: React.SyntheticEvent<HTMLFormElement>) => {
    setIsPending(true);
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    // Simulate transaction
    try {
      await simulateContract(config, {
        abi: ELECTION_FACTORY_ABI,
        address: getFactoryAddress(chainId),
        functionName: "createElection",
        args: [
          formData.get("title"),
          formData.get("description"),
          formData.get("election-type") === "public",
          // period.startDate?.valueOf(),
          // period.endDate?.valueOf(),
        ],
      });
    } catch (error: any) {
      setIsPending(false);
      console.log(error?.message.split('Contract Call:')[0].trim());
      return toast.error(error?.message.split('Contract Call:')[0].trim());
    }
    // Perform transaction
    const hash = await writeContract(config, {
      abi: ELECTION_FACTORY_ABI,
      address: getFactoryAddress(chainId),
      functionName: "createElection",
      args: [
        formData.get("title"),
        formData.get("description"),
        formData.get("election-type") === "public",
        // period.startDate?.valueOf(),
        // period.endDate?.valueOf(),
      ],
    });
    // Wait for transaction to complete
    const receipt = await waitForTransactionReceipt(config, { hash })
    const logs = parseEventLogs({
      abi: ELECTION_FACTORY_ABI,
      logs: receipt.logs,
    });
    // console.log(logs);
    if (logs.length) {
      router.push(
        // @ts-expect-error
        `?tab=candidates&election=${logs[0]?.args?.electionAddress}`
      );
    }
    toast.success("Election created successfully.");
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
