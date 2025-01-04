"use client";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Trophy, ThumbsUp, DotIcon } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();
  const data = [
    {
      election: "SRC President 2024",
      voters: 224,
      candidates: 4,
      status: "Ongoing",
      winner: "Undetermined",
    },
    {
      election: "Justo sodales sed",
      voters: 24,
      candidates: 7,
      status: "Ongoing",
      winner: "Undetermined",
    },
    {
      election: "Amet ut ipsum est",
      voters: 24,
      candidates: 10,
      status: "Ongoing",
      winner: "Undetermined",
    },
    {
      election: "Felis id libero",
      voters: 24,
      candidates: 12,
      status: "Ongoing",
      winner: "Undetermined",
    },
    {
      election: "Tempus arcu iaculis",
      voters: 24,
      candidates: 6,
      status: "Closed",
      winner: "Determined",
    },
  ];

  // Framer Motion variants for animations
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const tableRowVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  };

  const buttonHover = {
    hover: { scale: 1.05 },
  };

  

  return (
    <SidebarProvider>
      <SidebarInset className="bg-transparent">
        <motion.div
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.2 }}
          className="flex flex-1 flex-col gap-4 p-4"
        >
          {/* Dashboard Cards */}
          <div className="grid gap-4 md:grid-cols-5">
            <motion.div
              variants={cardVariants}
              className="h-80 flex flex-col gap-6 p-4 col-span-3 rounded-xl bg-[#1D57C21A]"
            >
              <h1 className="text-3xl font-bold">Hi there!</h1>
              <p className="w-[70%]">
                Create, manage, and participate in transparent and secure voting
                processes in just a few steps.
              </p>
              <div className="grid gap-4 auto-rows-auto md:grid-cols-2">
                <motion.div
                  variants={cardVariants}
                  transition={{ duration: 0.5 }}
                  className="h-36 flex flex-col p-4 gap-4 justify-center rounded-xl bg-[#0B1739]"
                >
                  <div className="flex gap-2 items-center">
                    <Trophy className="w-5 h-5 text-white" />
                    <p className="text-white">Elections Created</p>
                  </div>
                  <h1 className="text-4xl font-bold">25</h1>
                </motion.div>
                <motion.div
                  variants={cardVariants}
                  transition={{ duration: 0.5 }}
                  className="h-36 flex flex-col p-4 gap-4 justify-center rounded-xl bg-[#0B1739]"
                >
                  <div className="flex gap-2 items-center">
                    <ThumbsUp className="w-5 h-5 text-white" />
                    <p className="text-white">Total Votes</p>
                  </div>
                  <h1 className="text-4xl font-bold">127</h1>
                </motion.div>
              </div>
            </motion.div>
            <motion.div
              variants={cardVariants}
              transition={{ duration: 0.5 }}
              className="h-80 flex flex-col justify-between col-span-2 rounded-xl p-8 bg-cover bg-no-repeat bg-top-center border-2 border-gray-300"
              style={{ backgroundImage: "url('/images/hero-bg.png')" }}
            >
              <div className="w-[60%]">
                <h1 className="text-2xl font-bold">Got a voting link?</h1>
                <p className="text-subtle-text text-l">
                  Click the button below to check eligibility and vote
                </p>
              </div>
              <div className="flex justify-end w-full">
                <motion.button
                  variants={buttonHover}
                  onClick={() => router.push(`/elections/1/verify`)}
                  className="px-4 w-fit py-2 bg-primary rounded-2xl hover:bg-chart-1"
                >
                  Cast Vote
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Elections Table */}
          <div className="max-h-dvh flex-1 rounded-xl md:min-h-min bg-[#1D57C21A]">
            <div className="flex w-full justify-between pr-8 pl-4 py-4">
              <h1 className="text-2xl font-bold">Elections</h1>
              <motion.button
                variants={buttonHover}
                whileHover="hover"
                className="px-4 py-2 bg-primary rounded-2xl hover:bg-chart-1"
              >
                Create election
              </motion.button>
            </div>
            <div className="overflow-x-auto bg-transparent">
              <table className="table-auto w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 text-start">Election</th>
                    <th className="p-2">Voters</th>
                    <th className="p-2">Candidates</th>
                    <th className="p-2">Status</th>
                    <th className="p-2">Winner</th>
                    <th className="p-2"></th>
                  </tr>
                </thead>
                <motion.tbody
                  initial="hidden"
                  animate="visible"
                  transition={{ staggerChildren: 0.1 }}
                >
                  {data.map((row, index) => (
                    <motion.tr
                      key={index}
                      variants={tableRowVariants}
                      className={`${
                        (index + 1) % 2 === 0
                          ? "bg-[#1D57C21A] text-white"
                          : "bg-transparent font-space-grotesk font-thin"
                      }`}
                    >
                      <td className="py-2 px-4">{row.election}</td>
                      <td className="p-2 text-center">{row.voters}</td>
                      <td className="p-2 text-center">{row.candidates}</td>
                      <td className="p-2 flex justify-center">
                        <div
                          className={`flex w-fit items-center rounded-full px-4 font-bold ${
                            row.status === "Ongoing"
                              ? "bg-[#05C16833] text-[#14CA74] border-[#14CA74]"
                              : "bg-[#FF4D4D33] text-[#FF4D4D] border-[#FF4D4D]"
                          }`}
                        >
                          <DotIcon
                            className={`w-8 h-8 ${
                              row.status === "Ongoing"
                                ? "text-[#14CA74]"
                                : "text-[#FF4D4D]"
                            }`}
                          />
                          {row.status}
                        </div>
                      </td>
                      <td className="p-2 text-center">{row.winner}</td>
                      <td className="p-2 text-center">
                        <motion.button
                          variants={buttonHover}
                          whileHover="hover"
                          className="px-4 py-2 rounded bg-blue-500 text-[#4C9FE4] hover:bg-blue-600"
                        >
                          view results
                        </motion.button>
                      </td>
                    </motion.tr>
                  ))}
                </motion.tbody>
              </table>
            </div>
          </div>
        </motion.div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Home;
