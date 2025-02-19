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
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useWriteContract } from "wagmi";
import { ELECTION_ABI } from "@/contracts/Election";
import { useSearchParams } from "next/navigation";

const Candidates = () => {
  const onAddCandidate = () => { }; //implement add candidate logic here...
  const onConfirmCandidates = () => { }; //implement confirm candidates logic here...
  return (
    <Accordion
      value="candidate"
      type="single"
      collapsible
      className="flex flex-col gap-[18px]"
    >
      <CandidateForm />

      <div className="flex flex-col items-end mt-8">
        <SubmitDialog
          onAddCandidate={onAddCandidate}
          onConfirmCandidates={onConfirmCandidates}
        />
      </div>
    </Accordion>
  );
};

const CandidateForm = () => {
  const searchParams = useSearchParams();
  const { writeContract } = useWriteContract();

  const addCandidate = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    writeContract({
      abi: ELECTION_ABI,
      address: searchParams.get('election') as any,
      functionName: 'addCandidate',
      args: [
        formData.get('name'),
        formData.get('team'),
        formData.get('team'),
      ],
    });
  }

  return (
    <AccordionItem value="candidate" className="border-none">
      <AccordionTrigger className="bg-primary py-3 px-[18px] rounded-t-xl text-white/60">
        Candidate
      </AccordionTrigger>
      <AccordionContent>
        <form onSubmit={addCandidate} className="flex flex-col gap-16 pt-[42px] pb-12">
          <TextInput name="name" label="Full Name" placeholder="Eg. John Doe" />
          <TextInput name="team" label="Team" placeholder="Eg. Dreamweaver" />
          <ImagePicker />
          <button type="submit" className="bg-secondary dark:bg-primary rounded-full px-12 text-white py-2.5">
            Add Candidate
          </button>
        </form>
      </AccordionContent>
    </AccordionItem>
  );
};

const SubmitDialog = ({
  onAddCandidate,
  onConfirmCandidates,
}: {
  onAddCandidate: Function;
  onConfirmCandidates: Function;
}) => {
  return (
    <Dialog>
      <DialogTrigger>
        {/* <span className="bg-secondary dark:bg-primary rounded-full px-12 text-white py-2.5 mt-24">
          Add Candidate
        </span> */}
      </DialogTrigger>

      <DialogContent className="bg-dark text-center border border-[#EAEAEA]/30 py-16 px-[52px] sm:rounded-[18px]">
        <h1 className="text-[32px] font-semibold">Are you sure?</h1>
        <p className="text-white/60">
          You need to have atleast 2 candidates to enable voting. Add another
          candidate to continue or confirm candidates to continue..
        </p>

        <div className="flex items-center justify-center gap-5 mt-12">
          <button
            onClick={() => onAddCandidate()}
            className="px-8 py-3 bg-dark border border-[#EAEAEA]/30 rounded-full w-fit"
          >
            Add candidate
          </button>
          <button
            onClick={() => onConfirmCandidates()}
            className="px-8 py-3 bg-primary rounded-full w-fit"
          >
            Confirm candidates
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Candidates;