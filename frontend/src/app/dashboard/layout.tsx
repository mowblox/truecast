import Sidebar from "@/components/dashboard/Sidebar";
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
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col w-full">{children}</div>
    </div>
  );
}
