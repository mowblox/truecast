"use client";
import useElectionEndDate from "@/hooks/use-election-end-date";

export const ElectionEndDate = ({ address }: {
  address: string | any
}) => {
  const endDate = useElectionEndDate({ address });

  return <span>{new Date(Number(endDate as string)).toLocaleString()}</span>
}