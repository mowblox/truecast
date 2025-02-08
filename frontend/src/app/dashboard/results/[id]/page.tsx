import { ArrowLeft } from "lucide-react";
import React, { ReactNode } from "react";
import { StatusPill } from "../../page";

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
      <button className="flex text-white/60 gap-4 items-center text-sm">
        <ArrowLeft className="size-6" />
        <span>back</span>
      </button>

      <div className="election-details flex flex-col md:flex-row justify-between gap-x-24 gap-y-12 mt-10">
        <section className="flex flex-col gap-8 md:gap-[60px] text-white/60 md:flex-1">
          <header className="flex flex-col gap-3">
            <StatusPill status="Closed" />
            <h1 className="text-[32px]">2024 SRC President - UG</h1>
          </header>

          <article className="flex flex-col gap-3">
            <p className="text-2xl">Description</p>
            <p>
              This election is being held to elect a new SRC president for the
              University of Ghana.
            </p>
          </article>

          <article className="flex flex-col gap-3">
            <p className="text-2xl">Outcome</p>
            <p className="text-success">Lisa Mensah</p>
          </article>
        </section>
        <aside className="flex flex-col gap-9 md:flex-[0.7]">
          <AsideContainer title="Results">
            <div className="flex flex-col gap-8">
              {standings.map((standing) => (
                <Standing {...standing} />
              ))}
            </div>
          </AsideContainer>
          <AsideContainer title="Election Information">
            <div className="flex flex-col gap-8">
              {electionDetails.map((detail) => (
                <div className="flex justify-between">
                  <p className="text-white/60">{detail.label}</p>
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
      <h4 className="text-white/60 text-2xl">{title}</h4>
      {children}
    </article>
  );
};

const Standing = ({ name, voteCount }: { name: string; voteCount: number }) => {
  const percentage = Math.floor((voteCount / total.voteCount) * 100);
  return (
    <div className="w-full">
      <div className="flex items-center w-full justify-between">
        <p className="text-lg text-white/60">{name}</p>

        <div className="mr-1.5 flex gap-3 text-secondary">
          <p>{`${voteCount} votes`}</p>
          <p>{`${percentage}%`}</p>
        </div>
      </div>
      <div className="rounded-full h-2 bg-white/10 w-full overflow-hidden">
        <div
          style={{ width: `${percentage}%` }}
          className="bg-secondary rounded-full h-2"
        ></div>
      </div>
    </div>
  );
};

export default page;
