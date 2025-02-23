import React from "react";
import InputWrapper from "./inputs/InputWrapper";
import Link from "next/link";

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

const Summary = () => {
  return (
    <div className="w-full flex flex-col gap-12">
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
      <div className="flex justify-end mt-24">
        <Link href={'/dashboard'} className="bg-secondary dark:bg-primary rounded-full px-12 text-white py-2.5">
          Next
        </Link>
      </div>
    </div>
  );
};

export default Summary;
