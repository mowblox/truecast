"use client";

import React from "react";
import { AppSidebar } from "@/components/AppSideBar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useState } from "react";
import { useChainId, useAccount } from "wagmi";
import { useRouter } from "next/navigation";
import {
  ELECTION_FACTORY_ABI,
  getFactoryAddress,
} from "@/contracts/ElectionFactory";
import Web3 from "web3";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CalendarIcon, Loader2 } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import LoadingSpinner from "../../../components/ui/LoadingSpinner";
import { toast } from "sonner";
import { format } from "date-fns";
import { motion } from "framer-motion";

const ElectionFormSchema = z.object({
  title: z.string().nonempty("Title is required"),
  description: z.string().nonempty("Description is required"),
  startDate: z.date({ required_error: "Start date is required" }),
  endDate: z.date({ required_error: "End date is required" }),
  electionType: z.enum(["public", "private"]),
});

const createElection = () => {
  const router = useRouter();
  const chainId = useChainId();
  const { connector, address } = useAccount();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof ElectionFormSchema>>({
    resolver: zodResolver(ElectionFormSchema),
  });

  const createElection = async (data: z.infer<typeof ElectionFormSchema>) => {
    if (!connector) {
      toast.error("Please connect your wallet to create an election");
      return;
    }

    try {
      setLoading(true);
      const web3 = new Web3((await connector.getProvider()) as any);
      const electionFactory = new web3.eth.Contract(
        ELECTION_FACTORY_ABI,
        getFactoryAddress(chainId)
      );
      const receipt = await electionFactory.methods
        .createElection(
          data.title,
          data.description,
          data.electionType === "public",
          data.startDate.getTime(),
          data.endDate.getTime()
        )
        .send({ from: address });

      if (receipt.events?.ElectionCreated?.returnValues?.electionAddress) {
        toast.success("Election contract created successfully!");
        setTimeout(() => {
          router.push(
            `/elections/${receipt.events?.ElectionCreated?.returnValues?.electionAddress}`
          );
        }, 3000);
      } else {
        setLoading(false);
        toast.error("You may have interacted with the wrong network");
      }
    } catch (error: any) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <motion.form
      onSubmit={form.handleSubmit(createElection)}
      className="space-y-6 bg-transparent p-4 rounded-xl border border-subtle-text"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      {/* Title Field */}
      <div>
        <label
          htmlFor="title"
          className="block text-[16px] mb-4 text-white font-space-grotesk"
        >
          Election Title
        </label>
        <input
          {...form.register("title")}
          id="title"
          required
          placeholder="Eg. 2024 SRC President - UG"
          className="w-full py-3 border-b border-gray-300 bg-[#09090B] text-subtle-text placeholder:text-subtle-text placeholder:text-[12px] lg:placeholder:text-[16px] focus:border-gray-300 focus:outline-none"
        />
      </div>

      {/* Description Field */}
      <div>
        <label
          htmlFor="description"
          className="block text-[16px] mb-4 text-white font-space-grotesk"
        >
          Description
        </label>
        <textarea
          {...form.register("description")}
          id="description"
          required
          placeholder="Election purpose summary"
          className="w-full py-3 border-b border-gray-300 bg-[#09090B] text-subtle-text placeholder:text-subtle-text placeholder:text-[12px] lg:placeholder:text-[16px] focus:border-gray-300 focus:outline-none"
        />
      </div>

      <div className="flex gap-8">
        {/* Start Date Picker */}
        <div className="flex flex-col">
          {/* <label className="text-white">Start Date</label> */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full sm:w-auto py-3 border border-gray-300 bg-[#09090B] text-subtle-text rounded-lg px-4 focus:border-gray-300 focus:outline-none"
              >
                {form.watch("startDate")
                  ? format(form.watch("startDate"), "PPP")
                  : "Pick a start date"}
                <CalendarIcon className="ml-auto" />
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <Calendar
                className="PopoverContent"
                data-side="bottom"
                mode="single"
                selected={form.watch("startDate")}
                onSelect={(date: Date | undefined) =>
                  date && form.setValue("startDate", date)
                }
                disabled={(date: Date) =>
                  date < new Date("1900-01-01") || date > form.watch("endDate")
                }
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* End Date Picker */}
        <div className="flex flex-col">
          {/* <label className="text-white">End Date</label> */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full sm:w-auto py-3 border border-gray-300 bg-[#09090B] text-subtle-text rounded-lg px-4 focus:border-gray-300 focus:outline-none"
              >
                {form.watch("endDate")
                  ? format(form.watch("endDate"), "PPP")
                  : "Pick an end date"}
                <CalendarIcon className="ml-auto" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="PopoverContent" data-side="bottom">
              <Calendar
                mode="single"
                selected={form.watch("endDate")}
                onSelect={(date: Date | undefined) =>
                  date && form.setValue("endDate", date)
                }
                disabled={(date: Date) =>
                  date < form.watch("startDate") ||
                  date > new Date("2100-12-31")
                }
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Election Type Radio Buttons */}
      <div className="mb-4">
        <label className="block text-[16px] mb-2 text-white font-space-grotesk">
          Election Type
        </label>
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
          <label>
            <input
              type="radio"
              value="public"
              {...form.register("electionType")}
              required
              className="mr-2 appearance-none w-4 h-4 border border-gray-300 rounded-full bg-[#070707] checked:bg-[#007EE4] cursor-pointer"
              style={{
                accentColor: "#4C9FE4",
              }}
            />{" "}
            Public
          </label>
          <label>
            <input
              type="radio"
              value="private"
              {...form.register("electionType")}
              required
              className="mr-2 appearance-none w-4 h-4 border border-gray-300 rounded-full bg-[#070707] checked:bg-[#007EE4] cursor-pointer"
              style={{
                accentColor: "#4C9FE4",
              }}
            />{" "}
            Private
          </label>
        </div>
      </div>

      {loading ? (
        <LoadingSpinner className="sm:w-auto float-none sm:float-right flex mr-20" />
      ) : (
        <button
          className="mt-6 bg-gradient-to-r from-primary to-[#4595DF] hover:from-[#4595DF] hover:to-primary cursor-pointer text-white px-14 py-3 rounded-3xl w-full sm:w-auto float-none sm:float-right flex items-center justify-center"
          type="submit"
          disabled={loading}
        >
          Next
        </button>
      )}
    </motion.form>
  );
};

export default createElection;
