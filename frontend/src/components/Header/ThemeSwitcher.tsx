"use client";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import Image from "next/image";
import React from "react";

const ThemeSwitcher = () => {
  const { resolvedTheme: theme, setTheme } = useTheme();
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  return (
    <button
      className={cn(
        "w-[67px] h-[30px] rounded-full bg-gradient-to-b from-[#66FFED] to-[#FFEEB2] transition-all duration-1000 relative flex items-center z-10",
        theme === "dark" && "from-[#2B4485] to-[#AFCAFF]"
      )}
      onClick={toggleTheme}
    >
      <Image
        src={`/images/icons/theme/${theme === "dark" ? "moon" : "sun"}.svg`}
        alt="theme switcher"
        className={cn(
          "absolute transition-all duration-500",
          theme === "dark" ? "left-[34px]" : "left-1"
        )}
        width={30}
        height={30}
      />
    </button>
  );
};

export default ThemeSwitcher;
