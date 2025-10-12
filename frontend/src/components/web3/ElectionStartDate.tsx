"use client";
import useElectionStartDate from "@/hooks/use-election-start-date";

export const ElectionStartDate = ({ address }: {
  address: string | any
}) => {
  const startDate = useElectionStartDate({ address });

  return <span>{new Date(Number(startDate as string)).toLocaleString()}</span>
}