import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";
import { Metadata } from "next";
import React, { Suspense } from "react";

export const metadata: Metadata = {
  title: "Truecast | Landing",
  description: "BUIDL with Mowblox",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <React.Suspense>
      <div className="flex h-screen relative text-dark dark:text-white/60 max-w-screen-2xl mx-auto">
        <Sidebar />
        <div className="flex flex-col w-full relative">
          <Header />
          <div className="w-full grow overflow-y-auto py-12 hide-scrollbar">
            {children}
          </div>
        </div>
      </div>
    </React.Suspense>
  );
}
