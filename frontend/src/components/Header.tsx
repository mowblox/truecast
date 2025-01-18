"use client";
import Image from "next/image";
import Link from "next/link";
import { socials } from "@/data/socials";
import { AlignRight } from "lucide-react";

export default function Header() {
  return (
    <header className="w-full px-4 lg:px-8 py-5 bg-dark text-white">
      <nav className="flex justify-between items-center gap-5">
        <Link href="/">
          <h1 className="text-[26px] font-medium leading-8 relative after:absolute after:left-0 after:-bottom-2 after:w-1/2 after:h-1.5 after:rounded-full after:bg-primary">
            Truecast
          </h1>
        </Link>
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

const SocialLink = (link: { url: string; image?: string; name: string }) => {
  return (
    <Link href={link.url} className="flex items-center gap-2 cursor-pointer">
      {link.image ? (
        <Image
          src={link.image}
          alt={link.name}
          width={25}
          height={36}
          className="self-center"
        />
      ) : null}
      <span className="text-white">{link.name}</span>
    </Link>
  );
};