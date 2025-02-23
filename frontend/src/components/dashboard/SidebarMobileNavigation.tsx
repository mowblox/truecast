"use client";
import React from "react";
import { AlignLeft } from "lucide-react";
import Logo from "../landing/Logo";
import { DialogTitle } from "@radix-ui/react-dialog";
import NavigationDrawer from "../Header/NavigationDrawer";
import { navBlocks } from "@/data/navigation/dashboard";
import { NavLink } from "./Sidebar";
import ThemeSwitcher from "../Header/ThemeSwitcher";
import { DrawerClose } from "../ui/drawer";
import ThemeText from "../Header/ThemeText";

const SidebarMobileNavigation = () => {
  return (
    <NavigationDrawer Icon={AlignLeft}>
      <DialogTitle>
        <Logo />
      </DialogTitle>

      <div className="flex flex-col gap-2 text-xl">
        {navBlocks.map((block) =>
          block.links.map((link) => (
            <>
              <DrawerClose asChild key={link.title}>
                <div className="w-full">
                  <NavLink link={link} asButton />
                </div>
              </DrawerClose>
            </>
          ))
        )}

        <div className="px-4 py-3 bg-primary/[3%]  dark:bg-[#181818] rounded-[8px] flex items-center gap-2 justify-between">
          <ThemeText />
          <ThemeSwitcher />
        </div>
      </div>
    </NavigationDrawer>
  );
};

export default SidebarMobileNavigation;
