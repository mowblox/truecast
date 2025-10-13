"use client";
import useElectionEndDate from "@/hooks/use-election-end-date";
import useElectionSummary from "@/hooks/use-election-summary";
import { useParams, useSearchParams } from "next/navigation";
import Countdown from 'react-countdown';
import { useChainId, useSwitchChain } from "wagmi";

export default function Header() {
  const { id } = useParams();
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();
  const searchParams = useSearchParams();
  const summary = useElectionSummary({ address: id });
  const endDate = useElectionEndDate({ address: id });

  return (
    <>
      {searchParams.get("chainId") && chainId !== Number(searchParams.get("chainId")) ? (
        <header className="flex flex-col h-[50vh] w-full justify-center items-center">
          <p className="text-2xl">You are on the wrong network please click the button below to switch</p>
          <button
            className="bg-secondary cursor-pointer p-2 text-center flex items-center justify-center h-[55px] mt-5 text-white text-lg w-[50%]"
            onClick={() => switchChain({ chainId: Number(searchParams.get("chainId")) })}>Switch Network</button>
        </header>
      ) : (
        <header className="flex items-center justify-between border-b-[0.5px] border-[#9393934D]">
          <p className="text-secondary text-2xl">
            Total votes: {summary ? Number((summary as any[])[1]) : 0}
          </p>
          <p className="text-[52px]">
            {endDate ? <Countdown date={Number(endDate as number)} /> : null}
          </p>
        </header>
      )}
    </>
  );
}