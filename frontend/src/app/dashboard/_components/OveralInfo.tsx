"use client";
import React from "react";
import { Trophy, ThumbsUp } from "lucide-react";
import { useChainId, useReadContract } from "wagmi";
import { ELECTION_FACTORY_ABI, getFactoryAddress } from "@/contracts/ElectionFactory";

const info = [
  {
    title: "Elections Created",
    description: "25",
    icon: Trophy,
  },
  {
    title: "Total Votes",
    description: "127",
    icon: ThumbsUp,
  },
];

export const OverallInfo = () => {
  const chainId = useChainId();
  const result = useReadContract({
    abi: ELECTION_FACTORY_ABI,
    address: getFactoryAddress(chainId),
    functionName: 'getTotalElections',
  });
  console.log(result.data);

  const info = [
    {
      title: "Elections Created",
      description: `${result.data || 0}`,
      icon: Trophy,
    },
    {
      title: "Total Votes",
      description: "0",
      icon: ThumbsUp,
    },
  ];

  return (
    <div className="flex w-full gap-5">
      {info.map((item) => (
        <InfoCard key={item.title} {...item} />
      ))}
    </div>
  );
}

const InfoCard = ({
  title,
  description,
  icon: Icon,
}: {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}) => {
  return (
    <article className="w-full bg-secondary dark:bg-[#0B1739] px-3.5 py-2 rounded-lg text-white/60">
      <div className="flex items-center gap-2.5">
        <Icon className="size-5" />
        <h2>{title}</h2>
      </div>
      <p className="text-[52px]">{description}</p>
    </article>
  );
};