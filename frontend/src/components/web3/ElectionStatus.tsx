"use client";
import useElectionEndDate from "@/hooks/use-election-end-date";
import useElectionStartDate from "@/hooks/use-election-start-date";

export const ElectionStatus = ({ address }: {
  address: string | any
}) => {
  const startDate = useElectionStartDate({ address });
  const endDate = useElectionEndDate({ address });
  // console.log(Number(startDate), Number(endDate), Date.now());

  return <span>{Number(startDate) > Date.now() ? 'Upcoming' : Number(endDate) < Date.now() ? 'Closed' : 'Ongoing'}</span>
}