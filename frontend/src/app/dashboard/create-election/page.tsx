"use client";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Election from "./_components/Election";
import Candidates from "./_components/Candidates";
import Voters from "./_components/Voters";
import Summary from "./_components/Summary";
import { useSearchParams } from "next/navigation";

const tabHeaders = [
  { value: "election", label: "Election" },
  { value: "candidates", label: "Candidates" },
  { value: "voters", label: "Voters" },
  { value: "summary", label: "Summary" },
];

const tabsContent = [
  { value: "election", component: <Election /> },
  { value: "candidates", component: <Candidates /> },
  { value: "voters", component: <Voters /> },
  { value: "summary", component: <Summary /> },
];

const CreateElection = () => {
  const searchParams = useSearchParams();
  let tab = searchParams.get("tab");
  tab = tabHeaders.find(({ value }) => value === tab)?.value || "election";

  return (
    <main className="flex flex-col lg:ml-[117px] w-full max-w-[672px] max-md:px-4">
      <Tabs value={tab} className="w-full">
        <TabsList className="w-full flex justify-between border-b px-0 border-gray/30 dark:border-[#EAEAEA]/15 rounded-none">
          {tabHeaders.map(({ value, label }) => (
            <TabsTrigger
              disabled // can be removed if you want to control with tabs
              key={value}
              className="px-0 text-xl transition duration-300 data-[state=active]:text-secondary dark:text-white/60 dark:data-[state=active]:text-secondary relative before:absolute before:w-full before:h-1 before:bg-secondary before:rounded-full before:bottom-0 before:translate-y-1/2 before:opacity-0 data-[state=active]:before:opacity-100 before:transition before:duration-3000 disabled:opacity-100"
              value={value}
            >
              {label}
            </TabsTrigger>
          ))}
        </TabsList>
        {tabsContent.map(({ value, component }) => (
          <TabsContent key={value} value={value} className="mt-10">
            {component}
          </TabsContent>
        ))}
      </Tabs>
    </main>
  );
};

export default CreateElection;
