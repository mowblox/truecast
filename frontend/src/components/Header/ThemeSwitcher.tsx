"use client";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import Image from "next/image";
import React, { useState, useEffect } from "react";

const ThemeSwitcher = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const toggleTheme = () => {
    setTheme(resolvedTheme === "light" ? "dark" : "light");
  };

  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  if (isClient)
    return (
      <button
        className={cn(
          "w-[67px] h-[30px] rounded-full bg-linear-to-b from-[#66FFED] to-[#FFEEB2] transition-all duration-1000 ease-in relative flex items-center z-10",
          resolvedTheme === "dark" && "from-[#2B4485] to-[#AFCAFF]"
        )}
        onClick={toggleTheme}
      >
        <Image
          src={`/images/icons/theme/${
            resolvedTheme === "dark" ? "moon" : "sun"
          }.svg`}
          alt="theme switcher"
          className={cn(
            "absolute transition-all duration-[800ms]",
            resolvedTheme === "dark" ? "left-[34px]" : "left-1"
          )}
          width={30}
          height={30}
        />
      </button>
    );

  return (
    <div className="w-[67px] h-[30px] rounded-full bg-dark-text/5 dark:bg-white/5"></div>
  );
};

export default ThemeSwitcher;
