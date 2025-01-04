"use client";

import {
  ELECTION_FACTORY_ABI,
  getFactoryAddress,
} from "@/contracts/ElectionFactory";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAccount, useChainId } from "wagmi";
import Web3 from "web3";
import searchIcon from "../../../../public/images/search-icon.svg";
import Image from "next/image";
import ElectionDescription from "../../../components/elections/ElectionDescription";
import rectangle from "../../../../public/images/Rectangle 7.svg";
import { toast } from "sonner";
import { ELECTION_ABI } from "@/contracts/Election";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { motion } from "framer-motion";

interface Election {
  address: string;
  title: string;
  type: string;
}

export default function AllElections() {
  const chainId = useChainId();
  const { connector } = useAccount();
  const [elections, setElections] = useState<Election[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("all");

  const fetchElections = async () => {
    if (!connector) {
      toast.warning("Please connect your wallet to view elections.");
      setLoading(false); // Stop loading if no connector
      return;
    }

    // @ts-ignore
    const web3 = new Web3(await connector.getProvider());
    const electionFactory = new web3.eth.Contract(
      ELECTION_FACTORY_ABI,
      getFactoryAddress(chainId)
    );

    try {
      const addresses: string[] = (await electionFactory.methods
        .getElections()
        .call()) as string[];

      const fetchedElections: Election[] = await Promise.all(
        addresses.map(async (address: string) => {
          const election = new web3.eth.Contract(ELECTION_ABI, address);
          const title: string = await election.methods.title().call();
          return {
            address,
            title,
            type: Math.random() > 0.5 ? "public" : "private", 
          };
        })
      );
      setElections(fetchedElections);
    } catch (error: any) {
      toast.error("Error fetching elections.");
    } finally {
      setLoading(false); // Stop loading once fetching is done
    }
  };

  useEffect(() => {
    fetchElections();
  }, [chainId]);

  const filteredElections = elections.filter((election) => {
    const matchesSearchTerm = election.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesSearchType =
      searchType === "all" || election.type === searchType;
    return matchesSearchTerm && matchesSearchType;
  });

  return (
    <SidebarProvider>
      <SidebarInset>
        <div className="flex flex-col gap-5 w-full py-4 px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="flex flex-col md:flex-row items-center gap-4 mb-5"
          >
            <div className="relative w-full md:w-[90%]">
              <Image
                src={searchIcon}
                alt="Search Icon"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              />
              <input
                type="text"
                placeholder="Search for election eg. SRC 2024 election"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 px-4 py-2 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-600 w-full bg-[#1B1A23] h-11"
              />
            </div>
            <Select
              value={searchType}
              onValueChange={(value: string) => setSearchType(value)}
            >
              <SelectTrigger className="py-2 px-4 h-11 w-[80%] md:w-[18%] lg:w-[12%] rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-600 bg-gradient-to-r from-primary to-[#4595DF] hover:from-[#4595DF] hover:to-primary cursor-pointer transition-all duration-300 ease-in-out">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="public">Public</SelectItem>
                <SelectItem value="private">Private</SelectItem>
              </SelectContent>
            </Select>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7"
          >
            {loading ? (
              Array.from({ length: 6 }).map((_, index) => (
                <Skeleton
                  key={index}
                  className="h-72 rounded-xl bg-[#1B1A23]"
                />
              ))
            ) : filteredElections.length > 0 ? (
              filteredElections.map((election) => (
                <motion.div
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                  key={election.address}
                >
                  <Link href={`/elections/${election.address}`}>
                    <div className="grid col-span-1 overflow-clip bg-[#1B1A23] rounded-xl p-6 h-72 mb-3 bg-gradient-to-r hover:from-[#4595DF] hover:to-primary transition-all duration-800 ease-in-out group leading-tight">
                      <h1 className="text-2xl font-space-grotesk font-bold group-hover:text-[#fff]">
                        {election.title}
                      </h1>
                      <Image src={rectangle as any} alt="Rectangle" />
                      <p className="text-subtle-text group-hover:text-[#fff]">
                        <ElectionDescription address={election.address} />
                      </p>
                      <div className="flex items-end justify-end">
                        <button className="bg-dark group-hover:bg-text group-hover:text-dark rounded-3xl py-2 px-4 mt-4 group-hover:font-bold">
                          See Details
                        </button>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))
            ) : (
              <p className="text-center text-gray-400">No elections found.</p>
            )}
          </motion.div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
