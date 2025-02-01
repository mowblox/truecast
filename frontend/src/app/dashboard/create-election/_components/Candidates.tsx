import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import TextInput from "./inputs/TextInput";
import ImagePicker from "./inputs/ImagePicker";

const Candidates = () => {
  const arr = [1, 2, 3];
  return (
    <Accordion type="single" collapsible className="flex flex-col gap-[18px]">
      {arr.map((item) => (
        <CandidateForm key={item} i={item} />
      ))}

      <div className="flex flex-col items-end mt-8">
        <button className="border-b-4 border-secondary">Add more</button>

        <button className="bg-secondary dark:bg-primary rounded-full px-12 text-white py-2.5 mt-24">
          Next
        </button>
      </div>
    </Accordion>
  );
};

const CandidateForm = ({ i }: { i: number }) => {
  return (
    <AccordionItem value={`candidate-${i}`} className="border-none">
      <AccordionTrigger className="bg-primary py-3 px-[18px] rounded-t-xl text-white/60">
        Candidate {i}
      </AccordionTrigger>
      <AccordionContent>
        <form className="flex flex-col gap-16 pt-[42px] pb-12">
          <TextInput name="name" label="Full Name" placeholder="Eg. John Doe" />
          <TextInput name="name" label="Team" placeholder="Eg. Dreamweaver" />
          <ImagePicker />
        </form>
      </AccordionContent>
    </AccordionItem>
  );
};

export default Candidates;