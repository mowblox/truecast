import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";
import { Metadata } from "next";
import React from "react";

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
    <div className="flex max-w-screen-2xl mx-auto overflow-x-hidden relative">
      <Sidebar />
      <div className="flex flex-col w-full relative h-screen">
        <Header />
        <div className="w-full grow overflow-y-auto py-6 md:py-12">
          {children}
        </div>
      </div>
    </div>
  );
}
