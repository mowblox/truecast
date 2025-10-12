import { ELECTION_ABI } from "@/contracts/Election";
import { useReadContract } from "wagmi";

export default function useElectionTitle({ address }: {
  address: string | any
}) {
  const result = useReadContract({
    abi: ELECTION_ABI,
    address: address,
    functionName: 'title',
  });
  // console.log(result);

  return result?.data;
}