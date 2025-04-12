"use client";
import React from "react";
import { StatusPill } from "@/components/dashboard/StatusPill";
import { Search } from "lucide-react";
import { useChainId, useReadContract } from "wagmi";
import {
  ELECTION_FACTORY_ABI,
  getFactoryAddress,
} from "@/contracts/ElectionFactory";
import { ElectionTitle } from "@/components/web3/ElectionTitle";
import Link from "next/link";

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
    functionName: "getElections",
  });
  // console.log(result)

  return (
    <div className="table-container w-full overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr>
            {headers.map((header) => (
              <th
                key={header}
                className="first:pl-6 last:pr-6 text-left text-lg pb-5"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {!result || !result.data || !(result.data as string[]).length ? (
            <tr>
              <td colSpan={6}>
                <div className="px-5 py-24 text-center flex flex-col justify-center items-center w-full">
                  <span className="rounded-full p-4">
                    <Search className="size-20 inline-block" />
                  </span>
                  <h4 className="text-2xl font-medium text-white mt-2">
                    Nope, nothing to see here
                  </h4>
                  <p>
                    There are no running elections currently. Please check back
                    later
                  </p>
                </div>
              </td>
            </tr>
          ) : (
            (result.data as string[]).map((address) => (
              <tr
                key={address}
                className="odd:bg-secondary dark:odd:bg-[#0B1739] odd:text-white/60"
              >
                <td className="py-3.5 pl-6">
                  <ElectionTitle address={address} />
                </td>
                <td className="py-3.5 ">25</td>
                <td className="py-3.5 ">3</td>
                <td className="py-3.5 ">
                  <StatusPill status={"Ongoing"} />
                </td>
                <td className="py-3.5 ">Undetermined</td>
                <td className="py-3.5 ">
                  <Link
                    href={"/dashboard/results/" + address}>
                    View results
                  </Link>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};