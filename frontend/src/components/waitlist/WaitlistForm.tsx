"use client";
import Image from "next/image";
import { useState, useRef, FormEvent } from "react";
import emailjs from "emailjs-com";
import { toast } from "sonner";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { cn } from "@/lib/utils";

interface WaitlistFormProps {
  className?: string;
}

const WaitlistForm: React.FC<WaitlistFormProps> = ({ className }) => {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!email) {
        throw new Error("Email is required");
      }

      const result = await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        formRef.current!,
        process.env.NEXT_PUBLIC_EMAILJS_USER_ID
      );

      if (result.status === 200) {
        toast.success("You have been added to the waitlist!");
        setEmail("");
      } else {
        throw new Error(result.text || "Something went wrong");
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
        "w-full max-w-[600px] flex flex-col md:flex-row items-center p-2 rounded-3xl md:rounded-full bg-[#fff]/5 backdrop-blur-[2px] transition duration-200 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary",
        className
      )}
    >
      <input
        type="email"
        required
        name="user_email"
        placeholder="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full bg-transparent outline-none font-afacad rounded-full p-3"
      />
      <button
        disabled={loading}
        type="submit"
        className="bg-primary hover:bg-chart-1 text-white font-afacad py-3 px-6 rounded-full focus:outline-none hover:from-[#ffffff] hover:to-primary flex items-center justify-center text-nowrap shrink-0 gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
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
