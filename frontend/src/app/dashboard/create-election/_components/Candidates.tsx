"use client";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import TextInput from "./inputs/TextInput";
import ImagePicker from "./inputs/ImagePicker";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useWriteContract } from "wagmi";
import { ELECTION_ABI } from "@/contracts/Election";
import { useRouter, useSearchParams } from "next/navigation";

const Candidates = () => {
  return (
    <Accordion
      value="candidate"
      type="single"
      collapsible
      className="flex flex-col gap-[18px]"
    >
      <CandidateForm />
    </Accordion>
  );
};

const CandidateForm = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { writeContract } = useWriteContract();

  const onConfirmCandidates = () =>
    router.push("/dashboard/create-election?tab=voters"); //implement confirm candidates logic here...

  const addCandidate = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    writeContract({
      abi: ELECTION_ABI,
      address: searchParams.get("election") as any,
      functionName: "addCandidate",
      args: [formData.get("name"), formData.get("team"), formData.get("team")],
    });
  };

  const placeholderCandidates = [
    "Joshua Mensah",
    "Alisson Newton",
    "James Hammond",
    "Michael Brown",
  ];

  return (
    <AccordionItem value="candidate" className="border-none">
      <AccordionTrigger className="bg-primary py-3 px-[18px] rounded-t-xl text-white/60">
        Candidate
      </AccordionTrigger>
      <AccordionContent>
        <form
          onSubmit={addCandidate}
          className="flex flex-col gap-16 pt-[42px] pb-12"
        >
          <TextInput name="name" label="Full Name" placeholder="Eg. John Doe" />
          <TextInput name="team" label="Team" placeholder="Eg. Dreamweaver" />
          <ImagePicker />
          <div className="flex justify-end">
            <SubmitDialog onAddCandidate={addCandidate} />
          </div>
        </form>
        <section className="flex flex-col mt-8 gap-6">
          <h4 className="dark:text-white text-xl">Uploaded Candidates</h4>

          <div className="flex flex-col gap-2 text-lg">
            {placeholderCandidates.map((candidate, i) => (
              <p key={"candidate" + i}>{candidate}</p>
            ))}
          </div>

          <button
            onClick={onConfirmCandidates}
            className="border border-text dark:border-dark-text rounded-full px-12 dark:text-white py-2.5 ml-auto"
          >
            Confirm candidates
          </button>
        </section>
      </AccordionContent>
    </AccordionItem>
  );
};

const SubmitDialog = ({ onAddCandidate }: { onAddCandidate: Function }) => {
  return (
    <Dialog>
      <DialogTrigger>
        <span className="rounded-full px-12 dark:text-white py-2.5 bg-primary ml-auto">
          Add Candidate
        </span>
      </DialogTrigger>

      <DialogContent className="bg-dark text-center border border-[#EAEAEA]/30 py-16 px-[52px] sm:rounded-[18px]">
        <h1 className="text-[32px] font-semibold">Are you sure?</h1>
        <p className="text-white/60 text-lg">
          Once you add a candidate, you will not be able to make changes to it.
        </p>

        <div className="flex items-center justify-center gap-5 mt-12">
          <DialogClose>
            <button className="px-8 py-3 bg-dark border border-[#EAEAEA]/30 rounded-full w-fit">
              Cancel
            </button>
          </DialogClose>
          <button
            onClick={() => onAddCandidate()}
            className="px-8 py-3 bg-primary rounded-full w-fit"
          >
            Add candidate
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Candidates;