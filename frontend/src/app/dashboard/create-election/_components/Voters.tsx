import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ELECTION_ABI } from "@/contracts/Election";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";
import { useConfig } from "wagmi";
import { simulateContract, writeContract, waitForTransactionReceipt } from "@wagmi/core";

const Voters = () => {
  const searchParams = useSearchParams();
  const config = useConfig();
  const router = useRouter();
  const [isPending, setIsPending] = useState<boolean>(false);

  const addVoters = async (event: React.SyntheticEvent<HTMLFormElement>) => {
    setIsPending(true);
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    // console.log(formData.get('voters')?.toString().split('\n').map(voter => voter.trim()));
    // Simulate transaction
    try {
      await simulateContract(config, {
        abi: ELECTION_ABI,
        address: searchParams.get("election") as any,
        functionName: "addVoters",
        args: [
          formData
            .get("voters")
            ?.toString()
            .split("\n")
            .map((voter) => voter.trim()),
        ],
      });
    } catch (error: any) {
      setIsPending(false);
      console.log(error?.message.split('Contract Call:')[0].trim());
      return toast.error(error?.message.split('Contract Call:')[0].trim());
    }
    // Perform the transaction
    const hash = await writeContract(config, {
      abi: ELECTION_ABI,
      address: searchParams.get("election") as any,
      functionName: "addVoters",
      args: [
        formData
          .get("voters")
          ?.toString()
          .split("\n")
          .map((voter) => voter.trim()),
      ],
    });
    // Wait for transaction receipt
    await waitForTransactionReceipt(config, { hash });
    toast.success("Voters added successfully.");
    router.push(`?tab=summary&election=${searchParams.get("election")}`);
  };

  return (
    <Accordion value="voters" type="single" className="flex flex-col text-base">
      <AccordionItem value="voters" className="border-none">
        <AccordionTrigger className="bg-secondary dark:bg-primary py-3 px-[18px] rounded-t-xl text-white dark:text-white/60">
          Enter Voters Manually
        </AccordionTrigger>
        <AccordionContent>
          <form
            onSubmit={addVoters}
            className="flex flex-col gap-6 pt-[42px] pb-12"
          >
            <textarea
              className="border border-[#EAEAEA]/30 focus:border-primary outline-hidden rounded-lg p-4 resize-none bg-transparent"
              rows={12}
              name="voters"
              placeholder="Enter addresses here"
            ></textarea>

            <div className="flex justify-between gap-2 items-center">
              <label
                htmlFor="voters"
                className="text-secondary italic font-mulish"
              >
                Enter each Voter’s wallet address on a new line
              </label>

              <p className="text-white/60">O Voter(s)</p>
            </div>

            <div className="flex justify-end">
              <Button loading={isPending} size="lg" className="px-12">
                Submit
              </Button>
            </div>
          </form>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default Voters;
