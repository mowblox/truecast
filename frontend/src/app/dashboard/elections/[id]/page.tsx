import React from "react";
import CheckEligibilityForm from "../../vote/_components/CheckEligibilityForm";
import { StatusPill } from "@/components/dashboard/StatusPill";
import Summary from "../../create-election/_components/Summary";

const page = () => {
  return (
    <main className="mx-4 md:mx-[117px] max-w-xl flex flex-col gap-24">
      <div className="flex flex-col gap-3">
        <StatusPill status="Ongoing" />
        <Summary />
      </div>

      <CheckEligibilityForm labelClass="text-xl" />
    </main>
  );
};

export default page;
