import Link from "next/link";
import React from "react";

const ElectionCard = ({
  title,
  description,
  id,
}: {
  title: string;
  description: string;
  id: string;
}) => {
  return (
    <article className="w-full flex flex-col justify-between rounded-[10px] text-dark dark:text-white/60 hover:bg-primary hover:text-white/60 transition duration-200 px-5 py-3 gap-20 border border-gray/30 dark:border-[#EAEAEA]/30 group">
      <div className="top flex flex-col gap-[18px] hover:text-white">
        <h5 className="text-2xl">{title}</h5>
        <p className="text-lg">{description}</p>
      </div>

      <div className="flex justify-end">
        <Link
          href={`/dashboard/elections/${id}`}
          className="rounded-full px-6 py-2 text-sm font-mulish bg-primary group-hover:bg-white dark:group-hover:bg-primary text-white group-hover:text-dark dark:group-hover:text-white"
        >
          See details
        </Link>
      </div>
    </article>
  );
};

export default ElectionCard;
