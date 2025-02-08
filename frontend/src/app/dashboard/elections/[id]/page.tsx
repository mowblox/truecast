import React from "react";
import InputWrapper from "../../create-election/_components/inputs/InputWrapper";
import CheckEligibilityForm from "../../vote/_components/CheckEligibilityForm";
import { StatusPill } from "@/components/dashboard/StatusPill";

const items = [
  {
    title: "Election Title",
    values: ["2024 SRC President - UG"],
  },
  {
    title: "Description",
    values: [
      "This election is being held to elect a new SRC president for the University of Ghana",
    ],
  },
  {
    title: "Election Period",
    values: ["Aug 17, 2024 - Aug 29, 2024"],
  },
  {
    title: "Election Type",
    values: ["Private"],
  },
  {
    title: "Candidates",
    values: [
      "Joshua Mensah",
      "Alisson Newton",
      "James Hammond",
      "Michael Brown",
    ],
  },
  {
    title: "Voter Count",
    values: ["24"],
  },
];

const page = () => {
  return (
    <main className="mx-4 md:mx-[117px] max-w-xl flex flex-col gap-24">
      <div className="flex flex-col gap-3">
        <StatusPill status="Ongoing" />
        <div className="flex flex-col gap-3">
          {items.map((item, index) => (
            <InputWrapper key={index} label={item.title} name={item.title}>
              <div className="flex flex-col gap-2">
                {item.values.map((value, index) => (
                  <p key={index} className="text-white/40 text-lg">
                    {value}
                  </p>
                ))}
              </div>
            </InputWrapper>
          ))}
        </div>
      </div>

      <CheckEligibilityForm labelClass="text-xl" />
    </main>
  );
};

export default page;
