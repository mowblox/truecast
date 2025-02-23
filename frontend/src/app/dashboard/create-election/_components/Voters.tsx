import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { ELECTION_ABI } from "@/contracts/Election";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { useWriteContract } from "wagmi";

const Voters = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { writeContract } = useWriteContract();

  const addVoters = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    // console.log(formData.get('voters')?.toString().split('\n').map(voter => voter.trim()));
    writeContract({
      abi: ELECTION_ABI,
      address: searchParams.get("election") as any,
      functionName: "addVoters",
      args: [formData.get('voters')?.toString().split('\n').map(voter => voter.trim())],
    }, {
      onSuccess() {
        router.push(`?tab=summary&election=${searchParams.get("election")}`);
      },
      onError(error) {
        console.log(error);
      }
    });
  }

  return (
    <Accordion value="voters" type="single" className="flex flex-col text-base">
      <AccordionItem value="voters" className="border-none">
        <AccordionTrigger className="bg-primary py-3 px-[18px] rounded-t-xl text-white/60">
          Enter Voters Manually
        </AccordionTrigger>
        <AccordionContent>
          <form
            onSubmit={addVoters}
            className="flex flex-col gap-6 pt-[42px] pb-12">
            <textarea
              className="border border-[#EAEAEA]/30 focus:border-primary outline-none rounded-lg p-4 resize-none bg-transparent"
              rows={12}
              name="voters"
              placeholder="Enter addresses here"></textarea>

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
              <button className="bg-secondary dark:bg-primary rounded-full px-12 text-white py-2.5 mt-24">
                Next
              </button>
            </div>
          </form>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default Voters;
