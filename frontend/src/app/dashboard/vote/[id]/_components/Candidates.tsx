"use client";
import { ELECTION_ABI } from "@/contracts/Election";
import { ThumbsUp } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import React from "react";
import { useReadContract, useWriteContract } from "wagmi";

function getRandomNumber() {
  return Math.floor(Math.random() * 3) + 1;
}

export const Candidates = () => {
  const { id } = useParams();

  const result = useReadContract({
    abi: ELECTION_ABI,
    address: id as any,
    functionName: 'getCandidates',
  });
  console.log(result?.data);

  return (
    <>
      {(result.data as any[])?.map(candidate => {
        return {
          id: candidate.id,
          name: candidate.name,
          team: candidate.team,
          image: `/images/candidate${getRandomNumber()}.png`,
        }
      }).map((candidate) => (
        <React.Fragment key={candidate.id}>
          <CandidateCard {...candidate} />
          <div className="w-full h-[1px] bg-[#9393934D] last:hidden"></div>
        </React.Fragment>
      ))}
    </>
  );
}

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
  const { writeContract } = useWriteContract();

  const castVote = () => {
    writeContract({
      abi: ELECTION_ABI,
      address: id as any,
      functionName: "castVote",
      args: [candidateId],
    }, {
      onSuccess() {
        // router.push(`?tab=summary&election=${id}`);
      },
      onError(error) {
        console.log(error);
      }
    });
  }

  return (
    <article className="flex justify-between">
      <div className="flex gap-6">
        <Image
          width={80}
          height={80}
          alt={name}
          src={image}
          className="size-20 rounded-[11px] bg-subtle-text"
        />

        <div>
          <p className="font-mullish text-white/90 text-xl">{name}</p>
          <p className="mt-1.5 text-white/60">{team}</p>
        </div>
      </div>

      <button
        onClick={castVote}
        className="flex items-center gap-3 justify-center px-10 py-2.5 border-[0.5px] border-[#EAEAEA]/15 rounded-full h-fit text-base">
        <span>Vote</span>
        <ThumbsUp className="size-[18px]" />
      </button>
    </article>
  );
};