import AllElections from "@/components/elections/AllElections";
import { Metadata } from "next";
import Image from "next/image";
import write from "../../../public/images/write-icon.svg";

export const metadata: Metadata = {
  title: "ABVS | Elections",
}

export default function ElectionsPage() {
  return (
    <div className="p-4 md:p-6 lg:p-8 mb-32 lg:mb-0 lg:flex justify-between gap-8">
      <div className="flex flex-col text-center lg:text-start items-center gap-2 mb-6 lg:w-[30%]">
        <h1 className="gradient-text-vertical text-[32px] md:text-[60px] lg:text-[70px] font-bold font-space-grotesk leading-tight">
          Ongoing Elections
        </h1>
        <p className="text-subtle-text text-[16px] lg:text-[20px]">
          Turpis non molestie amet tortor. Diam amet volutpat
        </p>
        <div className="flex items-center gap-2 mt-8 mb-4 lg:mt-12 lg:w-full cursor-pointer">
          <Image src={write} alt="Write Icon" />
          <h3 className="text-[#4C9FE4]">Create a new election</h3>
        </div>
      </div>
      <AllElections/>
    </div>
  );
}