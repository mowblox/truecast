import React from "react";
import Header from "./_components/Header";
import ElectionCard from "./_components/ElectionCard";

const elections = [
  {
    title: "Vel consequat",
    description:
      "Cras vel imperdiet non aliquet. Interdum sed in tortor tempus. Velit...",
    id: "25",
  },
  {
    title: "Vel consequat",
    description:
      "Cras vel imperdiet non aliquet. Interdum sed in tortor tempus. Velit...",
    id: "25",
  },
  {
    title: "Vel consequat",
    description:
      "Cras vel imperdiet non aliquet. Interdum sed in tortor tempus. Velit...",
    id: "25",
  },
  {
    title: "Vel consequat",
    description:
      "Cras vel imperdiet non aliquet. Interdum sed in tortor tempus. Velit...",
    id: "25",
  },
  {
    title: "Vel consequat",
    description:
      "Cras vel imperdiet non aliquet. Interdum sed in tortor tempus. Velit...",
    id: "25",
  },
  {
    title: "Vel consequat",
    description:
      "Cras vel imperdiet non aliquet. Interdum sed in tortor tempus. Velit...",
    id: "25",
  },
];

const page = () => {
  return (
    <main className="flex flex-col gap-12 mx-4 md:mx-[85px]">
      <Header />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {elections.map((election) => (
          <ElectionCard {...election} />
        ))}
      </div>
    </main>
  );
};

export default page;
