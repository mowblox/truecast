"use client";
import useElectionSummary from "@/hooks/use-election-summary";
import { useParams } from "next/navigation";

type Standing = {
  id: number;
  name: string;
  image: string;
  team: string;
  voteCount: number;
};

export default function Standings() {
  const { id } = useParams();
  const electionSummary = useElectionSummary({ address: id });
  // console.log(electionSummary);

  const standings: Standing[] = (
    electionSummary ? (electionSummary as any[])[0] : []
  ).map((item: Standing) => ({
    ...item,
    id: Number(item.id),
    voteCount: Number(item.voteCount),
  }));

  const total = standings.reduce(
    (prev, current) => prev + current.voteCount,
    0
  );

  return (
    <>
      {standings.map((standing) => (
        <Standing
          key={standing.id}
          {...standing}
          percentage={
            total ? Math.floor((standing.voteCount * 100) / total) : 0
          }
        />
      ))}
    </>
  );
}

const Standing = ({
  name,
  voteCount,
  percentage,
}: {
  name: string;
  voteCount: number;
  percentage: number;
}) => {
  return (
    <div className="w-full">
      <div className="flex items-center w-full justify-between">
        <p className="text-lg">{name}</p>

        <div className="mr-1.5 flex gap-3 text-secondary">
          <p>{`${voteCount} votes`}</p>
          <p>{`${percentage}%`}</p>
        </div>
      </div>
      <div className="rounded-full h-2 bg-text/15 dark:bg-white/10 w-full overflow-hidden">
        <div
          style={{ width: `${percentage}%` }}
          className="bg-secondary rounded-full h-2"
        ></div>
      </div>
    </div>
  );
};
