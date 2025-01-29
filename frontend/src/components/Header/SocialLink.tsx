"use client";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const SocialLink = (link: {
  url: string;
  image?: string;
  name: string;
  imageDark?: string;
  className?: string;
}) => {
  const { resolvedTheme } = useTheme();
  return (
    <Link
      href={link.url}
      className={cn("flex items-center gap-2 cursor-pointer", link.className)}
    >
      {link.image ? (
        <Image
          src={
            (resolvedTheme === "dark" ? link.imageDark : link.image) ||
            link.image
          }
          alt={link.name}
          width={20}
          height={20}
          className="self-center"
        />
      ) : null}
      <span className="text-dark dark:text-white">{link.name}</span>
    </Link>
  );
};

export default SocialLink;
