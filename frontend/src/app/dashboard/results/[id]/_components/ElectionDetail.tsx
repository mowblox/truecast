"use client";
import { StatusPill } from "@/components/dashboard/StatusPill";
import { ElectionDescription } from "@/components/web3/ElectionDescription";
import { ElectionTitle } from "@/components/web3/ElectionTitle";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function ElectionDetail() {
  const { id } = useParams();
  const [url, setUrl] = useState('');

  const copyUrl = async () => {
    await navigator.clipboard.writeText(url);
    toast.info("URL copied to clipboard!");
  };

  useEffect(() => {
    setUrl(`${location.origin}/dashboard/vote/${id}`);
  }, [id]);

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

      <article className="flex flex-col gap-3 lg:max-w-[672px]">
        <p className="text-2xl">Your election sharing URL</p>
        <div className="h-[75px] bg-primary/10 w-full p-6 overflow-hidden">
          <p className="text-wrap">{url}</p>
        </div>

        <button
          onClick={copyUrl}
          className="bg-secondary p-2 text-center flex items-center justify-center h-[55px] mt-5 lg:mt-24 text-dark text-lg"
        >
          Copy sharing URL
        </button>
      </article>
    </section>
  );
}