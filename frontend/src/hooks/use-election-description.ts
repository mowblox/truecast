import { ELECTION_ABI } from "@/contracts/Election";
import { useReadContract } from "wagmi";

export default function useElectionDescription({ address }: {
  address: string | any
}) {
  const result = useReadContract({
    abi: ELECTION_ABI,
    address: address,
    functionName: 'description',
  });
  // console.log(result);

  return result?.data;
}