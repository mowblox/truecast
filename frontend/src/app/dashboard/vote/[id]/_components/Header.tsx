"use client";
import useElectionEndDate from "@/hooks/use-election-end-date";
import useElectionSummary from "@/hooks/use-election-summary";
import { useParams } from "next/navigation";
import Countdown from 'react-countdown';

export default function Header() {
  const { id } = useParams();
  const summary = useElectionSummary({ address: id });
  const endDate = useElectionEndDate({ address: id });

  return (
    <header className="flex items-center justify-between border-b-[0.5px] border-[#9393934D]">
      <p className="text-secondary text-2xl">
        Total votes: {summary ? Number((summary as any[])[1]) : 0}
      </p>
      <p className="text-[52px]">
        {endDate ? <Countdown date={Number(endDate as number)} /> : null}
      </p>
    </header>
  );
}