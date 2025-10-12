"use client";
import useElectionOwner from "@/hooks/use-election-owner";

export const ElectionOwner = ({ address }: {
  address: string | any
}) => {
  const owner = useElectionOwner({ address });

  return <span>{(owner as string)?.substring(0, 6)}...{(owner as string)?.substring(36)}</span>
}