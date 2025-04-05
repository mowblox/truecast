import { ELECTION_ABI } from "@/contracts/Election";
import { useReadContract } from "wagmi";

export default function useElectionEndDate({ address }: {
  address: string | any
}) {
  const result = useReadContract({
    abi: ELECTION_ABI,
    address: address,
    functionName: 'endDate',
  });
  // console.log(result?.data);

  return result?.data;
}