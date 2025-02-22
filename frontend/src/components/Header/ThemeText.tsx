"use client";
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";

const ThemeText = () => {
  const { resolvedTheme } = useTheme();
  const mode = resolvedTheme === "dark" ? "Dark Mode" : "Light Mode";

  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  return <span>{isClient && mode}</span>;
};

export default ThemeText;
