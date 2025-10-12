"use client";
import useElectionTitle from "@/hooks/use-election-title";

export const ElectionTitle = ({ address }: {
  address: string | any
}) => {
  const title = useElectionTitle({ address });

  return <span>{title as string}</span>
}