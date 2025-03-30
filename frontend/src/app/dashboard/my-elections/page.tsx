"use client";
import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import { TabsTrigger } from "@radix-ui/react-tabs";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";
import MyElections from "./_components/MyElections";

const tabHeaders = [
  { value: "all", label: "All" },
  { value: "ongoing", label: "Ongoing" },
  { value: "closed", label: "Closed" },
];

const ElectionsPage = () => {
  const searchParams = useSearchParams();
  let tab = searchParams.get("tab");
  tab = tabHeaders.find(({ value }) => value === tab)?.value || "all";

  return (
    <main className="flex flex-col lg:ml-[117px] w-full lg:max-w-[672px] max-md:px-4 max-lg:px-12">
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
            <MyElections />
          </TabsContent>
        ))}
      </Tabs>
    </main>
  );
};

export default ElectionsPage;
