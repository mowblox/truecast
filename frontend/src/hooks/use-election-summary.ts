import { ELECTION_ABI } from "@/contracts/Election";
import { useReadContract } from "wagmi";

export default function useElectionSummary({ address }: {
  address: string | any
}) {
  const result = useReadContract({
    abi: ELECTION_ABI,
    address: address,
    functionName: 'getElectionSummary',
  });
  console.log(result?.data);

  return result?.data;
}