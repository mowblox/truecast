"use client";
import { StatusPill } from "@/components/dashboard/StatusPill";
import { ElectionDescription } from "@/components/web3/ElectionDescription";
import { ElectionTitle } from "@/components/web3/ElectionTitle";
import useElectionSummary from "@/hooks/use-election-summary";
import { useParams } from "next/navigation";

export default function ElectionDetail() {
  const { id } = useParams();
  const electionSummary = useElectionSummary({ address: id });
  console.log(electionSummary);

  return (
    <section className="flex flex-col gap-8 md:gap-[60px] md:flex-1">
      <header className="flex flex-col gap-3">
        <StatusPill status="Closed" />
        <h1 className="text-[32px]">
          <ElectionTitle address={id} />
        </h1>
      </header>

      <article className="flex flex-col gap-3">
        <p className="text-2xl">Description</p>
        <p>
          <ElectionDescription address={id} />
        </p>
      </article>

      <article className="flex flex-col gap-3">
        <p className="text-2xl">Outcome</p>
        <p className="text-success">Lisa Mensah</p>
      </article>
    </section>
  );
}