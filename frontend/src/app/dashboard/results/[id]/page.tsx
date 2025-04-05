import React, { ReactNode } from "react";
import BackButton from "@/components/dashboard/BackButton";
import ElectionDetail from "./_components/ElectionDetail";
import Standings from "./_components/Standings";

const standings = [
  { name: "Lisa Mensah", voteCount: 29 },
  { name: "Alisson Newton", voteCount: 6 },
  { name: "James Hammond", voteCount: 4 },
  { name: "Michael Brown", voteCount: 3 },
];

const total = standings.reduce((prev, current) => ({
  name: "Total",
  voteCount: prev.voteCount + current.voteCount,
}));

const electionDetails = [
  { label: "Created by", value: "0x4d...39dd" },
  { label: "Start date", value: "Aug 17, 2024" },
  { label: "End date", value: "Aug 29, 2024" },
  { label: "Election type", value: "Private" },
  { label: "Voters", value: "50" },
];

const page = () => {
  return (
    <main className="mx-4 md:ml-[117px] md:mr-8">
      <BackButton />

      <div className="election-details flex flex-col lg:flex-row justify-between gap-x-24 gap-y-12 mt-10">
        <ElectionDetail />
        <aside className="flex flex-col gap-9 md:flex-[0.7]">
          <AsideContainer title="Results">
            <div className="flex flex-col gap-8">
              <Standings />
            </div>
          </AsideContainer>
          <AsideContainer title="Election Information">
            <div className="flex flex-col gap-8">
              {electionDetails.map((detail) => (
                <div key={detail.value} className="flex justify-between">
                  <p>{detail.label}</p>
                  <p className="text-secondary">{detail.value}</p>
                </div>
              ))}
            </div>
          </AsideContainer>
        </aside>
      </div>
    </main>
  );
};

const AsideContainer = ({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) => {
  return (
    <article className="px-7 py-5 rounded-xl border border-[#EAEAEA]/30 flex flex-col gap-6">
      <h4 className="text-2xl">{title}</h4>
      {children}
    </article>
  );
};

export default page;
