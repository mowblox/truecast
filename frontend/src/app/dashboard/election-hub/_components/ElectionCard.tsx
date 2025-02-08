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
    <article className="w-full flex flex-col justify-between rounded-[10px] hover:bg-primary transition duration-200 px-5 py-3 text-white/60 gap-20 border border-[#EAEAEA]/30">
      <div className="top flex flex-col gap-[18px] hover:text-white">
        <h5 className="text-2xl">{title}</h5>
        <p className="text-lg">{description}</p>
      </div>

      <div className="flex justify-end">
        <Link
          href={`/election-hub/${id}`}
          className="rounded-full px-6 py-2 text-sm text-dark font-mulish bg-white"
        >
          See details
        </Link>
      </div>
    </article>
  );
};

export default ElectionCard;
