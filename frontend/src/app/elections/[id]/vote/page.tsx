import { Metadata } from "next";
import Image from "next/image";
export const metadata: Metadata = {
  title: "ABVS | Election Vote",
};

export default function ElectionVotePage() {
  interface Candidate {
    name: string;
    about: string;
    image: string;
  }
  interface Election {
    timer: string;
    totalVotes: number;
    candidates: Candidate[];
  }
  const candidates: Candidate[] = [
    {
      name: "Lisa Mensah",
      about: "Nibh faucibus",
      image: "/images/candidate1.png",
    },
    {
      name: "Alisson Newton",
      about: "Vel tellus dolor",
      image: "/images/candidate2.png",
    },
    {
      name: "James Hammond",
      about: "Convallis elementum",
      image: "/images/candidate3.png",
    },
    {
      name: "Michael Brown",
      about: "Amet convallis in",
      image: "/images/candidate4.png",
    },
  ];
  const electionData: Election = {
    timer: "2:59:59",
    totalVotes: 24,
    candidates: candidates,
  };

  // condidate card
  const candidatesCard = ({ candidate }: { candidate: Candidate }) => {
    return (
      <div className="py-10 border-y border-subtle-text border-opacity-20">
        <div className="full flex justify-between">
          <div className="flex gap-2 md:gap-6">
            <Image
              src={candidate.image}
              width={100}
              height={100}
              alt={candidate.name}
              className="w-auto h-auto"
            />
            <div className="flex flex-col gap-1.5">
              <span className="md:text-xl font-roboto-flex text-base">
                {candidate.name}
              </span>
              <span className="text-sm md:text-base text-subtle-text font-roboto-flex">
                {candidate.about}
              </span>
            </div>
          </div>
          <button className="bg-gradient-to-r from-primary to-secondary w-20 h-8 md:w-36 md:h-10 rounded-full text-base">
            vote
          </button>
        </div>
      </div>
    );
  };
  return (
    <main className="px-12">
      <div className="w-full flex justify-between h-[71px] items-center">
        <span className="text-xs md:text-2xl font-space-grotesk text-chart-1">
          Total votes : {electionData.totalVotes}
        </span>
        <span className="text-base md:text-5xl font-space-grotesk tracking-widest">
          {electionData.timer}
        </span>
      </div>
      <section className="w-full">
        {electionData.candidates.map((candidate, k) => (
          <div key={k}>{candidatesCard({ candidate: candidate })}</div>
        ))}
      </section>
    </main>
  );
}