"use client";
import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import { TabsTrigger } from "@radix-ui/react-tabs";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";

const tabHeaders = [
  { value: "all", label: "All" },
  { value: "ongoing", label: "Ongoing" },
  { value: "closed", label: "Closed" },
];

type Election = {
  title: string;
  description: string;
  id: string;
  status: "ongoing" | "closed";
};

const elections: Election[] = [
  {
    title: "Vel consequat",
    description:
      "Ut consectetur metus diam eu mauris orci. Dictum tellus consectetur dignissim id eleifend. Etiam massa vitae iaculis ipsum dictumst libero. Id consequat at et condimentum.",
    id: "1",
    status: "ongoing",
  },
  {
    title: "Vel consequat",
    description:
      "Ut consectetur metus diam eu mauris orci. Dictum tellus consectetur dignissim id eleifend. Etiam massa vitae iaculis ipsum dictumst libero. Id consequat at et condimentum.",
    id: "3",
    status: "ongoing",
  },
  {
    title: "Vel consequat",
    description:
      "Ut consectetur metus diam eu mauris orci. Dictum tellus consectetur dignissim id eleifend. Etiam massa vitae iaculis ipsum dictumst libero. Id consequat at et condimentum.",
    id: "8",
    status: "ongoing",
  },
  {
    title: "Vel consequat",
    description:
      "Ut consectetur metus diam eu mauris orci. Dictum tellus consectetur dignissim id eleifend. Etiam massa vitae iaculis ipsum dictumst libero. Id consequat at et condimentum.",
    id: "32",
    status: "closed",
  },
];

const ElectionsPage = () => {
  const searchParams = useSearchParams();
  let tab = searchParams.get("tab");
  tab = tabHeaders.find(({ value }) => value === tab)?.value || "all";
  const filteredElections =
    tab === "all"
      ? elections
      : elections.filter((election) => election.status === tab);
  return (
    <main className="flex flex-col ml-[117px] w-full max-w-[672px] max-md:px-4">
      <Tabs value={tab} className="w-full">
        <TabsList className="w-full flex justify-between border-b px-0 border-gray/30 dark:border-[#EAEAEA]/15 rounded-none">
          {tabHeaders.map(({ value, label }) => (
            <TabsTrigger
              key={value}
              className="px-0 text-xl transition duration-300 data-[state=active]:text-secondary dark:text-white/60 dark:data-[state=active]:text-secondary relative before:absolute before:w-full before:h-1 before:bg-secondary before:rounded-full before:bottom-0 before:translate-y-1/2 before:opacity-0 data-[state=active]:before:opacity-100 before:transition before:duration-3000 disabled:opacity-100"
              value={value}
            >
              <Link href={`/dashboard/my-elections?tab=${value}`}>{label}</Link>
            </TabsTrigger>
          ))}
        </TabsList>
        {tabHeaders.map((header) => (
          <TabsContent
            key={header.value}
            value={header.value}
            className="flex flex-col gap-6"
          >
            {filteredElections.map((election) => (
              <Election key={election.id} {...election} />
            ))}
          </TabsContent>
        ))}
      </Tabs>
    </main>
  );
};

const Election = ({ title, description, id }: Election) => {
  return (
    <Link
      href={`/dashboard/results/${id}`}
      className="flex justify-between items-center gap-7 py-5 border-b border-[#9393934D] text-white/60 pr-5"
    >
      <div className="w-full">
        <h5 className="text-xl">{title}</h5>
        <p className="mt-3 text-sm">{description}</p>
      </div>

      <ChevronRight className="size-6" />
    </Link>
  );
};

export default ElectionsPage;
