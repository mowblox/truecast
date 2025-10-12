"use client";
import useElectionCandidates from "@/hooks/use-election-candidates";

export const ElectionCandidates = ({ address }: {
  address: string | any
}) => {
  const candidates = useElectionCandidates({ address });

  return <span>{Number(candidates as string)}</span>
}