"use client";
import React from "react";
import { StatusPill } from "@/components/dashboard/StatusPill";
import { Link } from "lucide-react";
import { useChainId, useReadContract } from "wagmi";
import { ELECTION_FACTORY_ABI, getFactoryAddress } from "@/contracts/ElectionFactory";

const headers = [
  "Election",
  "Voters",
  "Candidates",
  "Status",
  "Winner",
  "Actions",
];


export const RecentElections = () => {
  const chainId = useChainId();
  const result = useReadContract({
    abi: ELECTION_FACTORY_ABI,
    address: getFactoryAddress(chainId),
    functionName: 'getElections',
  });
  console.log(result.data);

  return (
    <div className="table-container w-full overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr>
            {headers.map((header) => (
              <th
                key={header}
                className="first:pl-6 last:pr-6 text-left text-lg last:sr-only pb-5"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {!result.data ? (
            <tr>
              <td>No elections found!</td>
            </tr>
          ) :
            (result.data as string[]).map((item) => (
              <tr
                key={item}
                className="odd:bg-secondary odd:dark:bg-[#0B1739] odd:text-white/60"
              >
                <td className="py-3.5 pl-6">SRC President 2024</td>
                <td className="py-3.5 ">25</td>
                <td className="py-3.5 ">3</td>
                <td className="py-3.5 ">
                  <StatusPill status={"Ongoing"} />
                </td>
                <td className="py-3.5 ">Undetermined</td>
                <td className="py-3.5 ">
                  <Link
                    href={"/dashboard/results/" + item}
                    className="dark:text-secondary pr-6"
                  >
                    View results
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}