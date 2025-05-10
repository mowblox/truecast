"use client";
import { ELECTION_ABI } from "@/contracts/Election";
import { ThumbsUp } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { useReadContract, useWriteContract } from "wagmi";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

function getRandomNumber() {
  return Math.floor(Math.random() * 3) + 1;
}

export const Candidates = () => {
  const { id } = useParams();

  const result = useReadContract({
    abi: ELECTION_ABI,
    address: id as any,
    functionName: "getCandidates",
  });
  console.log(result?.data);

  return (
    <>
      {(result.data as any[])
        ?.map((candidate) => {
          return {
            id: candidate.id,
            name: candidate.name,
            team: candidate.team,
            image: `https://obliged-emerald-zebra.myfilebase.com/ipfs/${candidate.image}`,
          };
        })
        .map((candidate) => (
          <React.Fragment key={candidate.id}>
            <CandidateCard {...candidate} />
            <div className="w-full h-[1px] bg-[#9393934D] last:hidden"></div>
          </React.Fragment>
        ))}
    </>
  );
};

const CandidateCard = ({
  name,
  image,
  team,
  id: candidateId,
}: {
  name: string;
  image: string;
  team: string;
  id: number;
}) => {
  const { id } = useParams();
  const { writeContract, isPending } = useWriteContract();
  const router = useRouter();

  const castVote = () => {
    writeContract(
      {
        abi: ELECTION_ABI,
        address: id as any,
        functionName: "castVote",
        args: [candidateId],
      },
      {
        onSuccess() {
          toast.success("Your vote has been casted successfully!");
          setTimeout(() => {
            router.push(`/dashboard/results/${id}`);
          }, 2000);
        },
        onError(error) {
          console.log(error);
        },
      }
    );
  };

  return (
    <article className="flex justify-between">
      <div className="flex gap-6">
        <Image
          width={80}
          height={80}
          alt={name}
          src={image}
          className="size-20 rounded-[11px] bg-subtle-text text-text dark:text-white/90"
        />

        <div>
          <p className="font-mullish text-xl">{name}</p>
          <p className="mt-1.5 dark:text-white/60">{team}</p>
        </div>
      </div>

      <Button
        loading={isPending}
        variant={"outline"}
        icon={<ThumbsUp className="size-[18px]" />}
        onClick={castVote}
        className="px-10 py-2.5 text-base flex-row-reverse"
      >
        Vote
      </Button>
    </article>
  );
};