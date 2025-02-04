"use client";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import React from "react";

const Header = () => {
  return (
    <header className="w-full flex items-center justify-end px-8 py-5">
      <ConnectButton />
    </header>
  );
};

export default Header;
