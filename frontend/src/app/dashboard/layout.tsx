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
    <div className="flex h-screen relative">
      <Sidebar />
      <div className="flex flex-col w-full relative">
        <Header />
        <div className="w-full grow overflow-y-auto py-12">{children}</div>
      </div>
    </div>
  );
}
