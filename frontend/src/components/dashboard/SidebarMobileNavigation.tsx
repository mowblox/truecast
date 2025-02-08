"use client";
import React from "react";
import { AlignLeft } from "lucide-react";
import Logo from "../landing/Logo";
import { socials } from "@/data/socials";
import { useTheme } from "next-themes";
import { DialogTitle } from "@radix-ui/react-dialog";
import NavigationDrawer from "../Header/NavigationDrawer";
import { navBlocks } from "@/data/navigation/dashboard";
import { NavLink } from "./Sidebar";
import ThemeSwitcher from "../Header/ThemeSwitcher";

const SidebarMobileNavigation = () => {
  const { resolvedTheme } = useTheme();
  const mode = resolvedTheme === "dark" ? "Dark Mode" : "Light Mode";
  return (
    <NavigationDrawer Icon={AlignLeft}>
      <DialogTitle>
        <Logo />
      </DialogTitle>

      <div className="flex flex-col gap-2 text-xl">
        {navBlocks.map((block) =>
          block.links.map((link) => <NavLink key={link.title} link={link} />)
        )}

        <div className="px-4 py-3 bg-primary/[3%]  dark:bg-[#181818] rounded-[8px] flex items-center gap-2 justify-between">
          <span>{mode}</span>
          <ThemeSwitcher />
        </div>
      </div>
    </NavigationDrawer>
  );
};

export default SidebarMobileNavigation;
