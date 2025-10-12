"use client";
import useElectionType from "@/hooks/use-election-type";

export const ElectionType = ({ address }: {
  address: string | any
}) => {
  const type = useElectionType({ address });

  return <span>{type as boolean ? 'Public' : 'Private'}</span>
}