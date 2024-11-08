"use client";
import { ELECTION_FACTORY_ABI, getFactoryAddress } from "@/contracts/ElectionFactory";
import { useChainId, useAccount } from "wagmi";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useState } from "react";
import Web3 from "web3";

export default function CreateElection() {
  const router = useRouter();
  const chainId = useChainId();
  const { connector, address } = useAccount();
  const [loading, setLoading] = useState(false);

  const createElection = async (event: SyntheticEvent<HTMLFormElement>) => {
    try {
      // Prevent default form submit behaviour
      event.preventDefault();
      // Send transaction
      if (connector) {
        setLoading(true);
        // Use FormData API to collect data
        const formData = new FormData(event.currentTarget);
        // Initialize web3
        // @ts-ignore
        const web3 = new Web3(await connector.getProvider());
        // Initialize contract
        const electionFactory = new web3.eth.Contract(ELECTION_FACTORY_ABI, getFactoryAddress(chainId));
        // Invote method
        const receipt = await electionFactory.methods.createElection(
          formData.get('title'),
          formData.get('description'),
          formData.get('electionType') === 'public',
          new Date(formData.get('startDate') as any).valueOf(),
          new Date(formData.get('endDate') as any).valueOf()
        ).send({ from: address });
        // Navigate to detail page
        if (receipt.events?.ElectionCreated?.returnValues?.electionAddress) {
          return router.push(`/elections/${receipt.events?.ElectionCreated?.returnValues?.electionAddress}`)
        } else {
          setLoading(false);
          alert('You may have interacted with the wrong network');
        }
      } else {
        setLoading(false);
      }
    } catch (error: any) {
      // console.log(error);
      setLoading(false);
      alert(error.message);
    }
  }

  return (
    <form onSubmit={createElection}>
      <div className="mb-10">
        <label
          className="block text-[16px] mb-4 text-white font-space-grotesk"
          htmlFor="title"
        >
          Election Title
        </label>
        <input
          className="w-full py-3 border-b border-gray-300 bg-[#070707] text-subtle-text placeholder:text-subtle-text placeholder:text-[12px] lg:placeholder:text-[16px] focus:border-gray-300 focus:outline-none"
          type="text"
          id="title"
          name="title"
          required
          placeholder="Eg. 2024 SRC President - UG" />
      </div>

      <div className="mb-10">
        <label
          className="block text-[16px] mb-4 text-white font-space-grotesk"
          htmlFor="description"
        >
          Description
        </label>
        <textarea
          className="w-full py-3 border-b border-gray-300 bg-[#070707] text-subtle-text placeholder:text-subtle-text placeholder:text-[12px] lg:placeholder:text-[16px] focus:border-gray-300 focus:outline-none"
          id="description"
          name="description"
          rows={1}
          required
          placeholder="Write a brief summary about the purpose of the election"
        ></textarea>
      </div>

      <div className="mb-12">
        <label className="block text-[16px] mb-4 text-white font-space-grotesk">
          Election Period
        </label>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          {/* Start Date Picker */}
          <input
            type="date"
            name="startDate"
            required
            className="w-full sm:w-auto py-3 border border-gray-300 bg-[#070707] text-subtle-text rounded-lg px-4 focus:border-gray-300 focus:outline-none" />

          {/* End Date Picker */}
          <input
            type="date"
            name="endDate"
            required
            className="w-full sm:w-auto py-3 border border-gray-300 bg-[#070707] text-subtle-text rounded-lg px-4 focus:border-gray-300 focus:outline-none" />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-[16px] mb-2 text-white font-space-grotesk">
          Election Type
        </label>
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
          <label className="flex items-center text-subtle-text">
            <input
              className="mr-2 appearance-none w-4 h-4 border border-gray-300 rounded-full bg-[#070707] checked:bg-secondary cursor-pointer"
              type="radio"
              name="electionType"
              value="public"
              required
              style={{
                accentColor: "#4C9FE4",
              }} />
            Public
          </label>
          <label className="flex items-center text-subtle-text">
            <input
              className="mr-2 appearance-none w-4 h-4 border border-gray-300 rounded-full bg-[#070707] checked:bg-secondary cursor-pointer"
              type="radio"
              name="electionType"
              value="private"
              required
              style={{
                accentColor: "#4C9FE4",
              }} />
            Private
          </label>
        </div>
      </div>

      <button
        className="mt-6 bg-gradient-to-r from-primary to-[#4595DF] hover:from-[#4595DF] hover:to-primary cursor-pointer text-white px-14 py-3 rounded-3xl w-full sm:w-auto float-none sm:float-right"
        type="submit"
        disabled={loading}
      >
        next
      </button>
    </form>
  );
}