"use client";
import Image from "next/image";
import Link from "next/link";
import { socials } from "@/data/socials";
import { AlignRight } from "lucide-react";
import { useTheme } from "next-themes";
import Logo from "./landing/Logo";

export default function Header() {
  return (
    <header className="w-full px-4 lg:px-8 py-5 text-dark dark:text-white">
      <nav className="flex justify-between items-center gap-5">
        <Logo />
        <Socials />
      </nav>
    </header>
  );
}

const Socials = () => {
  return (
    <>
      <div className="hidden md:flex gap-5">
        {socials.map((social) => (
          <SocialLink key={social.url} {...social} />
        ))}
      </div>

      <div className="md:hidden">
        <AlignRight size={34} className="text-primary" />
      </div>
    </>
  );
};

const SocialLink = (link: {
  url: string;
  image?: string;
  name: string;
  imageDark?: string;
}) => {
  const { resolvedTheme } = useTheme();
  return (
    <Link href={link.url} className="flex items-center gap-2 cursor-pointer">
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