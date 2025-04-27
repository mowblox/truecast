import useElectionStartDate from "./use-election-start-date";
import useElectionEndDate from "./use-election-end-date";

export default function useElectionStatus({ address }: {
  address: string | any
}) {
  const startDate = useElectionStartDate({ address });
  const endDate = useElectionEndDate({ address });
  // console.log(Number(startDate), Number(endDate), Date.now());

  return Number(startDate) > Date.now() ? 'Upcoming' : Number(endDate) < Date.now() ? 'Closed' : 'Ongoing';
}