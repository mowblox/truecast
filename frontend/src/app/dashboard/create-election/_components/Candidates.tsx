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
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useReadContract, useWriteContract } from "wagmi";
import { ELECTION_ABI } from "@/contracts/Election";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import useElectionType from "@/hooks/use-election-type";
import { toast } from "sonner";

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
  const { writeContract, isPending } = useWriteContract();
  const formRef = React.useRef<HTMLFormElement>();

  const result = useReadContract({
    abi: ELECTION_ABI,
    address: searchParams.get("election") as any,
    functionName: "getCandidates",
  });
  // console.log(result?.data);

  const isPublic = useElectionType({
    address: searchParams.get("election") as any,
  });
  // console.log(isPublic);

  const onConfirmCandidates = () => {
    // Ensure minimum of 2 candidates
    if (!((result.data as any[]).length >= 2)) {
      return toast.info("Minimum of 2 candidates are required.");
    }
    // Skip Voters and Goto Summary Page if Election Type is Public
    if (isPublic) {
      return router.push(
        `?tab=summary&election=${searchParams.get("election")}`
      );
    }
    // Move on to add voters
    router.push(`?tab=voters&election=${searchParams.get("election")}`);
  };

  const addCandidate = () => {
    const formData = new FormData(formRef.current);
    writeContract(
      {
        abi: ELECTION_ABI,
        address: searchParams.get("election") as any,
        functionName: "addCandidate",
        args: [
          formData.get("name"),
          formData.get("team"),
          formData.get("team"),
        ],
      },
      {
        onSuccess() {
          toast.success("Candidate added successfully.");
          result.refetch();
          setTimeout(() => {
            window.location.reload(); // TODO: Very hacky, and very much not ideal. Why does result.refetch not work?
          }, 2000);
        },
        onError(error) {
          console.log(error);
        },
      }
    );
  };

  return (
    <AccordionItem value="candidate" className="border-none">
      <AccordionTrigger className="bg-secondary dark:bg-primary py-3 px-[18px] rounded-t-xl text-white dark:text-white/60">
        Candidate
      </AccordionTrigger>
      <AccordionContent>
        <form
          ref={formRef as React.LegacyRef<HTMLFormElement> | undefined}
          className="flex flex-col gap-16 pt-[42px] pb-12"
        >
          <TextInput name="name" label="Full Name" placeholder="Eg. John Doe" />
          <TextInput
            name="team"
            label="Team (Optional)"
            placeholder="Eg. Dreamweaver"
          />
          <ImagePicker />
          <div className="flex justify-end">
            <SubmitDialog onAddCandidate={addCandidate} loading={isPending} />
          </div>
        </form>
        {result?.data ? (
          <section className="flex flex-col mt-8 gap-6">
            <h4 className="dark:text-white text-xl">Uploaded Candidates</h4>

            <div className="flex flex-col gap-2 text-lg">
              {(result?.data as any[])?.map((candidate) => (
                <p key={candidate.id}>{candidate.name}</p>
              ))}
            </div>

            <Button
              variant="outline"
              className="px-12 ml-auto"
              onClick={onConfirmCandidates}
            >
              Confirm candidates
            </Button>
          </section>
        ) : null}
      </AccordionContent>
    </AccordionItem>
  );
};

const SubmitDialog = ({
  onAddCandidate,
  loading,
}: {
  onAddCandidate: Function;
  loading: boolean;
}) => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button
          loading={loading}
          as="div"
          className="px-12 ml-auto cursor-pointer"
        >
          <div>Add Candidate</div>
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-dark text-center border border-[#EAEAEA]/30 py-16 px-[52px] sm:rounded-[18px]">
        <DialogTitle className="text-[32px] font-semibold">
          Are you sure?
        </DialogTitle>
        <p className="text-white/60 text-lg">
          Once you add a candidate, you will not be able to make changes to it.
        </p>

        <div className="flex items-center justify-center gap-5 mt-12">
          <DialogClose>
            <Button
              as="span"
              size="lg"
              variant="outline"
              className="cursor-pointer"
            >
              Cancel
            </Button>
          </DialogClose>
          <DialogClose>
            <Button
              loading={loading}
              as="span"
              size="lg"
              onClick={() => onAddCandidate()}
              className="cursor-pointer"
            >
              Add Candidate
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Candidates;