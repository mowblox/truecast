import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import React from "react";

const Voters = () => {
  return (
    <Accordion value="voters" type="single" className="flex flex-col text-base">
      <AccordionItem value="voters" className="border-none">
        <AccordionTrigger className="bg-primary py-3 px-[18px] rounded-t-xl text-white/60">
          Enter Voters Manually
        </AccordionTrigger>
        <AccordionContent>
          <form className="flex flex-col gap-6 pt-[42px] pb-12">
            <textarea
              className="border border-[#EAEAEA]/30 focus:border-primary outline-none rounded-lg p-4 resize-none bg-transparent"
              rows={12}
              placeholder="Enter addresses here"
            ></textarea>

            <div className="flex justify-between gap-2 items-center">
              <label
                htmlFor="voters"
                className="text-secondary italic font-mulish"
              >
                Enter each Voter’s wallet address on a new line
              </label>

              <p className="text-white/60">O Voter(s)</p>
            </div>

            <div className="flex justify-end">
              <button className="bg-secondary dark:bg-primary rounded-full px-12 text-white py-2.5 mt-24">
                Next
              </button>
            </div>
          </form>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default Voters;
