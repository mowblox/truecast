import React from "react";
import { Candidates } from "./_components/Candidates";
import Header from "./_components/Header";

const page = () => {
  return (
    <main className="mx-[117px] max-md:mx-4 flex flex-col gap-[62px]">
      <Header />
      <div className="flex flex-col gap-8">
        <Candidates />
      </div>
    </main>
  );
};

export default page;
