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
    <div className="flex h-screen relative">
      <Sidebar />
      <div className="flex flex-col w-full relative h-screen">
        <Header />
        <div className="w-full grow overflow-y-auto py-6 md:py-12">
          <Suspense>{children}</Suspense>
        </div>
      </div>
    </div>
  );
}
