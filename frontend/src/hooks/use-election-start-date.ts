import { ELECTION_ABI } from "@/contracts/Election";
import { useReadContract } from "wagmi";

export default function useElectionStartDate({ address }: {
  address: string | any
}) {
  const result = useReadContract({
    abi: ELECTION_ABI,
    address: address,
    functionName: 'startDate',
  });
  // console.log(result?.data);

  return result?.data;
}