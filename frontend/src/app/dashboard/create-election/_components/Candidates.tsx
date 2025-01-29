import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import TextInput from "./inputs/TextInput";

const Candidates = () => {
  const arr = [1, 2, 3];
  return (
    <Accordion type="single" collapsible className="flex flex-col gap-[18px]">
      {arr.map((item) => (
        <CandidateForm key={item} i={item} />
      ))}
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
        </form>
      </AccordionContent>
    </AccordionItem>
  );
};

export default Candidates;

// // /////////////////////////////////////////////////////////////////////////////

// /**
//  * v0 by Vercel.
//  * @see https://v0.dev/t/RKme14JYJ2p
//  * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
//  */
// import { Button } from "@/components/ui/button"

// export default function Component() {
//   return (
//     <div className="flex flex-col items-center justify-center gap-6 p-8 md:p-12">
//       <div className="text-center space-y-2">
//         <h2 className="text-2xl font-bold">Upload Images</h2>
//         <p className="text-gray-500 dark:text-gray-400">Drag and drop your images here or click to browse.</p>
//       </div>
//       <div className="w-full max-w-md border-2 border-gray-300 border-dashed rounded-lg p-6 flex flex-col items-center justify-center space-y-4 dark:border-gray-700">
//         <UploadIcon className="w-12 h-12 text-gray-400" />
//         <p className="text-gray-500 dark:text-gray-400">Drag and drop your images here</p>
//         <Button variant="outline">
//           <input type="file" className="hidden" multiple />
//           Browse Files
//         </Button>
//       </div>
//     </div>
//   )
// }

// function UploadIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
//       <polyline points="17 8 12 3 7 8" />
//       <line x1="12" x2="12" y1="3" y2="15" />
//     </svg>
//   )
// }
