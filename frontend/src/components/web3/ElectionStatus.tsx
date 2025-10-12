"use client";
import useElectionStatus from "@/hooks/use-election-status";

export const ElectionStatus = ({ address }: {
  address: string | any
}) => {
  const status = useElectionStatus({ address });

  return <span>{status}</span>
}