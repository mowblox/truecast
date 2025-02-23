import React from "react";
import { Candidates } from "./_components/Candidates";

const page = () => {
  return (
    <main className="mx-[117px] max-md:mx-4 flex flex-col gap-[62px]">
      <header className="flex items-center justify-between border-b-[0.5px] border-[#9393934D]">
        <p className="text-secondary text-2xl">Total votes: 64</p>
        <p className="text-[52px]">2:59:59</p>
      </header>

      <div className="flex flex-col gap-8">
        <Candidates />
      </div>
    </main>
  );
};

export default page;
