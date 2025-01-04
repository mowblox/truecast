"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

const VerifyLinkComponent = () => {
  const [loading, setLoading] = useState(false);
  const [link, setlink] = useState<string>("");
  const router = useRouter();

  interface ResponseData {
    status: boolean;
    message: string;
    data: any;
  }

  interface VerifyLink {
    verifyLink: string;
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setlink(value);
    console.log({ value });
  }

  async function submitLink(): Promise<ResponseData | null> {
    setLoading(true);
    const url = ""; 
    const submitLink: VerifyLink = { verifyLink: link };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitLink),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData: ResponseData = await response.json();

      toast.success("Link verified successfully");
      router.push("/elections/1/vote");

      return responseData;
    } catch (error: any) {
      console.error("Error", error);
      toast.error("Error verifying link");
      setLoading(false);
      return null;
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="flex flex-col gap-4 w-full md:max-w-[639px]">
      <div className="flex flex-col">
        <span className="text-base font-bold md:text-2xl">Check eligibility</span>
      </div>
      <input
        type="text"
        placeholder="Type or paste unique voting link here"
        className="w-full bg-[#0D0E15] p-5 focus:outline-none rounded-xl placeholder:text-primary placeholder:font-space-grotesk text-italic"
        value={link}
        name="link"
        required
        onChange={handleChange}
      />
      <div className="w-full flex justify-end mt-8">
        <button
          type="button"
          onClick={submitLink}
          className="flex bg-primary text-white font-space-grotesk py-3 px-12 font-bold rounded-full"
        >
          {loading ? <LoadingSpinner className="mt-2" /> : "Verify"}
        </button>
      </div>
    </section>
  );
};

export default VerifyLinkComponent;
