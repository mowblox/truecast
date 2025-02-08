"use client";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const BackButton = () => {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className="flex text-white/60 gap-4 items-center text-sm"
    >
      <ArrowLeft className="size-6" />
      <span>back</span>
    </button>
  );
};

export default BackButton;
