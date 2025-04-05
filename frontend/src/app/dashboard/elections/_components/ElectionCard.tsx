import { ElectionDescription } from "@/components/web3/ElectionDescription";
import { ElectionTitle } from "@/components/web3/ElectionTitle";
import Link from "next/link";
import React from "react";

const ElectionCard = ({
  address,
}: {
  address: string;
}) => {
  return (
    <article className="w-full flex flex-col justify-between rounded-[10px] text-dark dark:text-white/60 hover:border-none hover:bg-secondary dark:hover:bg-primary hover:text-white/60 transition duration-200 px-5 py-3 gap-20 border border-gray/30 dark:border-[#EAEAEA]/30 group">
      <div className="top flex flex-col gap-[18px] hover:text-white">
        <h5 className="text-2xl">
          <ElectionTitle address={address} />
        </h5>
        <p className="text-lg">
          <ElectionDescription address={address} />
        </p>
      </div>

      <div className="flex justify-end">
        <Link
          href={`/dashboard/results/${address}`}
          className="rounded-full px-6 py-2 text-sm font-mulish bg-secondary dark:bg-white group-hover:bg-white dark:group-hover:text-dark text-white dark:text-dark group-hover:text-dark"
        >
          See details
        </Link>
      </div>
    </article>
  );
};

export default ElectionCard;
