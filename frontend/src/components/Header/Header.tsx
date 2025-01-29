"use client";
import { socials } from "@/data/socials";
import Logo from "../landing/Logo";
import ThemeSwitcher from "./ThemeSwitcher";
import MobileNavigation from "./MobileNavigation";
import SocialLink from "./SocialLink";

export default function Header() {
  return (
    <header className="w-full px-4 lg:px-8 py-5 text-dark dark:text-white">
      <nav className="flex justify-between items-center gap-5">
        <Logo />
        <div className="hidden md:flex gap-9">
          <Socials />
          <ThemeSwitcher />
        </div>
        <div className="md:hidden">
          <MobileNavigation />
        </div>
      </nav>
    </header>
  );
}

const Socials = () => {
  return (
    <div className="flex gap-5">
      {socials.map((social) => (
        <SocialLink key={social.url} {...social} />
      ))}
    </div>
  );
};
