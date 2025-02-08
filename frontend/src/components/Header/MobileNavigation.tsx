"use client";
import React from "react";
import { AlignRight } from "lucide-react";
import Logo from "../landing/Logo";
import { socials } from "@/data/socials";
import SocialLink from "./SocialLink";
import ThemeSwitcher from "./ThemeSwitcher";
import { useTheme } from "next-themes";
import { DialogTitle } from "@radix-ui/react-dialog";
import NavigationDrawer from "./NavigationDrawer";

const MobileNavigation = () => {
  const { resolvedTheme } = useTheme();
  const mode = resolvedTheme === "dark" ? "Dark Mode" : "Light Mode";
  return (
    <NavigationDrawer Icon={AlignRight}>
      <DialogTitle>
        <Logo />
      </DialogTitle>

      <div className="flex flex-col gap-3.5 text-xl">
        {socials.map((social) => (
          <SocialLink
            key={social.url}
            {...social}
            className="px-4 py-3 bg-white  dark:bg-[#181818] rounded-[8px]"
          />
        ))}
        <div className="px-4 py-3 bg-white  dark:bg-[#181818] rounded-[8px] flex items-center gap-2 justify-between">
          <span>{mode}</span>
          <ThemeSwitcher />
        </div>
      </div>
    </NavigationDrawer>
  );
};

export default MobileNavigation;
