"use client";
import Image from "next/image";
import { useState, FormEvent } from "react";
import { toast } from "sonner";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { cn } from "@/lib/utils";

interface WaitlistFormProps {
  className?: string;
}

const WaitlistForm: React.FC<WaitlistFormProps> = ({ className }) => {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!email) {
        throw new Error("Email is required");
      }

      const body = {
        email: email,
        tags: ["Truecast"],
      };

      const headers = {
        "Content-Type": "application/json",
      };

      const response = await fetch("/api/notify", {
        method: "POST",
        body: JSON.stringify(body),
        headers,
      });
      const result = await response.json();

      console.log(result);
      if (result.success) {
        toast.success(result.message);
        setEmail("");
      } else {
        throw new Error(result.message || "Something went wrong");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message || "Failed to add to the waitlist.");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "w-full max-w-[600px] flex flex-col md:flex-row gap-4 items-center p-1.5 rounded-3xl md:rounded-full md:bg-[#F9FAFB] transition duration-200 focus-within:border-primary",
        className
      )}
    >
      <input
        type="email"
        required
        name="user_email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full bg-transparent max-md:bg-[#F9FAFB] max-md:border-[0.5px] max-md:border-[#F9FAFB]  outline-none rounded-full py-3 px-8 text-text"
      />
      <button
        disabled={loading}
        type="submit"
        className="w-full md:w-fit bg-primary text-white py-3 px-8 rounded-full focus:outline-none flex items-center justify-center text-nowrap shrink-0 gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        Get notified
        {loading ? (
          <LoadingSpinner className="size-5" />
        ) : (
          <Image
            src={"/images/bell.png"}
            alt="Notification bell"
            width={20}
            height={20}
          />
        )}
      </button>
    </form>
  );
};

export default WaitlistForm;
