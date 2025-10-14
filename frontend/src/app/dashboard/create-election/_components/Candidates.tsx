"use client";
import React, { useState } from "react";
import TextInput from "./inputs/TextInput";
import ImagePicker from "./inputs/ImagePicker";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useConfig, useReadContract } from "wagmi";
import { writeContract, simulateContract, waitForTransactionReceipt } from "@wagmi/core";
import { ELECTION_ABI } from "@/contracts/Election";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import useElectionType from "@/hooks/use-election-type";
import { toast } from "sonner";

const Candidates = () => <CandidateForm />;

const CandidateForm = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const config = useConfig();
  const formRef = React.useRef<HTMLFormElement>();
  const [image, setImage] = useState<File | null>(null);
  const [isPending, setIsPending] = useState<boolean>(false);

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

  const addCandidate = async () => {
    setIsPending(true);
    // Access form data
    const formData = new FormData(formRef.current);
    // Simulate transaction
    try {
      await simulateContract(config, {
        abi: ELECTION_ABI,
        address: searchParams.get("election") as any,
        functionName: "addCandidate",
        args: [
          formData.get("name"),
          formData.get("team"),
          'QmY2mBcJoeeghnjXRC8JmitgUkq2Tr55MP1Ufhbu1GmURC',
        ],
      });
    } catch (error: any) {
      setIsPending(false);
      console.log(error?.message.split('Contract Call:')[0].trim());
      return toast.error(error?.message.split('Contract Call:')[0].trim());
    }
    // Upload image
    const uploadFormData = new FormData();
    uploadFormData.append('image', image as File);
    const response = await fetch('/api/filebase', {
      method: 'POST',
      body: uploadFormData
    });
    const uploadResponse = await response.json();
    // Perform transaction
    const hash = await writeContract(config, {
      abi: ELECTION_ABI,
      address: searchParams.get("election") as any,
      functionName: "addCandidate",
      args: [
        formData.get("name"),
        formData.get("team"),
        uploadResponse.success ? uploadResponse.cid : 'QmY2mBcJoeeghnjXRC8JmitgUkq2Tr55MP1Ufhbu1GmURC',
      ],
    });
    // Wait for transaction reciept
    await waitForTransactionReceipt(config, { hash });
    toast.success("Candidate added successfully.");
    location.reload();
  };

  return (
    <>
      {result?.data ? (
        <section className="flex flex-col my-8 gap-6">
          <h4 className="dark:text-white text-xl font-bold">Uploaded Candidates</h4>

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
      <section className="flex flex-col my-8">
        <h4 className="dark:text-white text-xl font-bold">Add New Candidate</h4>

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
          <ImagePicker onImage={file => setImage(file)} />
          <div className="flex justify-end">
            <SubmitDialog onAddCandidate={addCandidate} loading={isPending} />
          </div>
        </form>
      </section>
    </>
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

      <DialogContent className="bg-white dark:text-white/60 dark:bg-dark text-center border border-[#EAEAEA]/30 py-16 px-[52px] sm:rounded-[18px]">
        <DialogTitle className="text-[32px] font-semibold">
          Are you sure?
        </DialogTitle>
        <p className="text-lg">
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