import React from "react";
import { Candidates } from "./_components/Candidates";
import dynamic from "next/dynamic";

const NoSSRHeader = dynamic(() => import('./_components/Header'), { ssr: false })

const page = () => {
  return (
    <main className="mx-[117px] max-md:mx-4 flex flex-col gap-[62px]">
      <NoSSRHeader />
      <div className="flex flex-col gap-8">
        <Candidates />
      </div>
    </main>
  );
};

export default page;
