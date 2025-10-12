"use client";
import useElectionVoters from "@/hooks/use-election-voters";

export const ElectionVoters = ({ address }: {
  address: string | any
}) => {
  const voters = useElectionVoters({ address });

  return <span>{voters ? Number(voters as string) : "unlimited".toUpperCase()}</span>
}