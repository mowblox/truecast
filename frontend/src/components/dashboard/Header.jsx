"use client";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import React from "react";
import SidebarMobileNavigation from "./SidebarMobileNavigation";
const Header = () => {
  return (
    <header className="w-full flex items-center justify-between md:justify-end px-5 py-5 md:px-8">
      <SidebarMobileNavigation />
      <ConnectButton />
    </header>
  );
};

export default Header;
