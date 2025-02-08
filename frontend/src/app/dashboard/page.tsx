import React from "react";
import { Trophy, ThumbsUp, PlusIcon, Dot } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { StatusPill } from "@/components/dashboard/StatusPill";
import Link from "next/link";

const page = () => {
  const info = [
    {
      title: "Elections Created",
      description: "25",
      icon: Trophy,
    },
    {
      title: "Total Votes",
      description: "127",
      icon: ThumbsUp,
    },
  ];

  const headers = [
    "Election",
    "Voters",
    "Candidates",
    "Status",
    "Winner",
    "Actions",
  ];

  type Field = {
    id: number;
    election: string;
    voters: string;
    candidates: string;
    status: "Ongoing" | "Closed";
    winner: string;
  };
  const data: Field[] = [
    {
      id: 1,
      election: "SRC President 2024",
      voters: "25",
      candidates: "3",
      status: "Ongoing",
      winner: "Undetermined",
    },
    {
      id: 1,
      election: "SRC President 2024",
      voters: "25",
      candidates: "3",
      status: "Ongoing",
      winner: "Undetermined",
    },
    {
      id: 1,
      election: "SRC President 2024",
      voters: "25",
      candidates: "3",
      status: "Ongoing",
      winner: "Undetermined",
    },
    {
      id: 1,
      election: "SRC President 2024",
      voters: "25",
      candidates: "3",
      status: "Closed",
      winner: "Undetermined",
    },
  ];

  return (
    <main className="flex flex-col mx-11 max-md:mx-4 gap-12">
      <section className="flex flex-col lg:flex-row gap-x-8 gap-y-4">
        <article className="flex-1 bg-primary/5 dark:bg-[#1D57C21A] px-5 py-4 rounded-lg flex flex-col gap-8">
          <div className="top">
            <h1 className="text-[42px] text-secondary">Hi there!</h1>
            <p className="text-lg text-dark dark:text-white/60 max-w-md">
              Create, manage, and participate in transparent and secure voting
              processes in just a few steps.
            </p>
          </div>

          <div className="flex w-full gap-5">
            {info.map((item) => (
              <InfoCard key={item.title} {...item} />
            ))}
          </div>
        </article>
        <article className="flex-1 border rounded-lg border-gray/15 dark:border-[#4C9FE41A] flex flex-col justify-between relative text-white/60 p-8">
          <div className="top">
            <h1 className="text-2xl mb-2.5">Got a voting link?</h1>
            <p className="text-base">Check eligibitlity and vote.</p>
          </div>

          <Image
            src="/images/hero_bg.svg"
            alt="background-decorations"
            fill
            className="object-cover object-center -z-10"
          />

          <div className="flex justify-end">
            <Link
              href={"/dashboard/vote"}
              className="bg-secondary dark:bg-primary rounded-full px-6 text-white py-2.5"
            >
              Cast vote
            </Link>
          </div>
        </article>
      </section>

      <section className="flex-1 bg-primary/5 dark:bg-[#1D57C21A] py-4 rounded-lg flex flex-col gap-8 text-dark dark:text-white/60">
        <header className="flex justify-between px-5">
          <p className="uppercase">Elections</p>

          <Link
            href={"dashboard/create-election"}
            className="flex items-center gap-3"
          >
            <p className="text-secondary">Create election</p>
            <PlusIcon className="size-6" />
          </Link>
        </header>

        <div className="table-container w-full overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                {headers.map((header) => (
                  <th
                    key={header}
                    className="first:pl-6 last:pr-6 text-left text-lg last:sr-only pb-5"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr
                  key={item.election}
                  className="odd:bg-secondary odd:dark:bg-[#0B1739] odd:text-white/60"
                >
                  <td className="py-3.5 pl-6">{item.election}</td>
                  <td className="py-3.5 ">{item.voters}</td>
                  <td className="py-3.5 ">{item.candidates}</td>
                  <td className="py-3.5 ">
                    <StatusPill status={item.status} />
                  </td>
                  <td className="py-3.5 ">{item.winner}</td>
                  <td className="py-3.5 ">
                    <Link
                      href={"/dashboard/results/" + item.id}
                      className="dark:text-secondary pr-6"
                    >
                      View results
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
};

const InfoCard = ({
  title,
  description,
  icon: Icon,
}: {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}) => {
  return (
    <article className="w-full bg-secondary dark:bg-[#0B1739] px-3.5 py-2 rounded-lg text-white/60">
      <div className="flex items-center gap-2.5">
        <Icon className="size-5" />
        <h2>{title}</h2>
      </div>
      <p className="text-[52px]">{description}</p>
    </article>
  );
};

export default page;