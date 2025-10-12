"use client";
import useElectionDescription from "@/hooks/use-election-description";

export const ElectionDescription = ({
  address,
  trim,
}: {
  address: string | any;
  trim?: boolean;
}) => {
  const description = useElectionDescription({ address });

  const value = description as string;

  return (
    <span>
      {trim && value?.length > 100 ? value.slice(0, 100) + "..." : value}
    </span>
  );
};