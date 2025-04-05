import React from "react";
import { PlusIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { OverallInfo } from "./_components/OveralInfo";
import { RecentElections } from "./_components/RecentElections";

const page = () => {
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

          <OverallInfo />
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
              href={"/dashboard/elections"}
              className="bg-secondary dark:bg-primary rounded-full px-6 text-white py-2.5"
            >
              Explore the Hub
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

        <RecentElections />
      </section>
    </main>
  );
};

export default page;