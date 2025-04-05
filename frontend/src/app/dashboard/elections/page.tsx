import React from "react";
import Header from "./_components/Header";
import AllElections from "./_components/AllElections";

const page = () => {
  return (
    <main className="flex flex-col gap-12 mx-4 md:mx-[85px]">
      <Header />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AllElections />
      </div>
    </main>
  );
};

export default page;
