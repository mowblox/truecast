import { ThumbsUp } from "lucide-react";
import Image from "next/image";
import React from "react";

const candidates = [
  {
    name: "Lisa Mensah",
    team: "Nibh fabulous",
    image: "/images/candidate1.png",
  },
  {
    name: "Alisson Newton",
    team: "Nibh fabulous",
    image: "/images/candidate2.png",
  },
  {
    name: "Nina Hammond",
    team: "Nibh fabulous",
    image: "/images/candidate3.png",
  },
  {
    name: "Anita Brown",
    team: "Nibh fabulous",
    image: "/images/candidate3.png",
  },
];

const page = () => {
  return (
    <main className="mx-[117px] max-md:mx-4 flex flex-col gap-[62px]">
      <header className="flex items-center justify-between border-b-[0.5px] border-[#9393934D]">
        <p className="text-secondary text-2xl">Total votes: 64</p>
        <p className="text-[52px]">2:59:59</p>
      </header>

      <div className="flex flex-col gap-8">
        {candidates.map((candidate) => (
          <>
            <CandidateCard {...candidate} />
            <div className="w-full h-[1px] bg-[#9393934D] last:hidden"></div>
          </>
        ))}
      </div>
    </main>
  );
};

const CandidateCard = ({
  name,
  image,
  team,
}: {
  name: string;
  image: string;
  team: string;
}) => {
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

      <button className="flex items-center gap-3 justify-center px-10 py-2.5 border-[0.5px] border-[#EAEAEA]/15 rounded-full h-fit text-base">
        <span>Vote</span>
        <ThumbsUp className="size-[18px]" />
      </button>
    </article>
  );
};

export default page;
