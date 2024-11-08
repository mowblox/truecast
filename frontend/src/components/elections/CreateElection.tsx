"use client";

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
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  ToastProvider,
  Toast,
  ToastViewport,
  ToastTitle,
  ToastDescription,
} from "@/components/ui/toast";
import { format } from "date-fns";

const ElectionFormSchema = z.object({
  title: z.string().nonempty("Title is required"),
  description: z.string().nonempty("Description is required"),
  startDate: z.date({ required_error: "Start date is required" }),
  endDate: z.date({ required_error: "End date is required" }),
  electionType: z.enum(["public", "private"]),
});

export default function CreateElection() {
  const router = useRouter();
  const chainId = useChainId();
  const { connector, address } = useAccount();
  const [loading, setLoading] = useState(false);
  const [toasts, setToasts] = useState<
    { title: string; description: string; variant: "success" | "destructive" }[]
  >([]);

  const form = useForm<z.infer<typeof ElectionFormSchema>>({
    resolver: zodResolver(ElectionFormSchema),
  });

  const showToast = (
    title: string,
    description: string,
    variant: "success" | "destructive" = "destructive"
  ) => {
    setToasts((prevToasts) => [...prevToasts, { title, description, variant }]);
  };

  const createElection = async (data: z.infer<typeof ElectionFormSchema>) => {
    if (!connector) return;

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
        showToast("Success", "Election contract created successfully!", "success");
        setTimeout(() => {
          router.push(
            `/elections/${receipt.events?.ElectionCreated?.returnValues?.electionAddress}`
          );
        }, 3000);
      } else {
        setLoading(false);
        showToast(
          "Error",
          "You may have interacted with the wrong network",
          "destructive"
        );
      }
    } catch (error: any) {
      setLoading(false);
      showToast("Error", error.message, "destructive");
    }
  };

  return (
    <ToastProvider>
      <form onSubmit={form.handleSubmit(createElection)} className="space-y-6">
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
            className="w-full py-3 border-b border-gray-300 bg-[#070707] text-subtle-text placeholder:text-subtle-text placeholder:text-[12px] lg:placeholder:text-[16px] focus:border-gray-300 focus:outline-none"
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
            className="w-full py-3 border-b border-gray-300 bg-[#070707] text-subtle-text placeholder:text-subtle-text placeholder:text-[12px] lg:placeholder:text-[16px] focus:border-gray-300 focus:outline-none"
          />
        </div>

        <div className="flex gap-8">
          {/* Start Date Picker */}
          <div className="flex flex-col">
            <label className="text-white">Start Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full sm:w-auto py-3 border border-gray-300 bg-[#070707] text-subtle-text rounded-lg px-4 focus:border-gray-300 focus:outline-none"
                >
                  {form.watch("startDate")
                    ? format(form.watch("startDate"), "PPP")
                    : "Pick a start date"}
                  <CalendarIcon className="ml-auto" />
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <Calendar
                  mode="single"
                  selected={form.watch("startDate")}
                  onSelect={(date: Date | undefined) =>
                    date && form.setValue("startDate", date)
                  }
                  disabled={(date: Date) =>
                    date < new Date("1900-01-01") ||
                    date > form.watch("endDate")
                  }
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* End Date Picker */}
          <div className="flex flex-col">
            <label className="text-white">End Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full sm:w-auto py-3 border border-gray-300 bg-[#070707] text-subtle-text rounded-lg px-4 focus:border-gray-300 focus:outline-none"
                >
                  {form.watch("endDate")
                    ? format(form.watch("endDate"), "PPP")
                    : "Pick an end date"}
                  <CalendarIcon className="ml-auto" />
                </Button>
              </PopoverTrigger>
              <PopoverContent>
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

        <button
          className="mt-6 bg-gradient-to-r from-primary to-[#4595DF] hover:from-[#4595DF] hover:to-primary cursor-pointer text-white px-14 py-3 rounded-3xl w-full sm:w-auto float-none sm:float-right flex items-center justify-center"
          type="submit"
          disabled={loading}
        >
          {loading ? (
            <span className="loader"></span>
          ) : (
            "Next"
          )}
        </button>
      </form>

      <ToastViewport />
      {toasts.map((toast, index) => (
        <Toast key={index} variant={toast.variant}>
          <ToastTitle>{toast.title}</ToastTitle>
          <ToastDescription>{toast.description}</ToastDescription>
        </Toast>
      ))}
    </ToastProvider>
  );
}
