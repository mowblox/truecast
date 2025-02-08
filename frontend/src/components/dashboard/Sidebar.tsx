"use client";
import { Fragment } from "react";
import Logo from "../landing/Logo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { navBlocks, type NavItem } from "@/data/navigation/dashboard";

const Sidebar = () => {
  return (
    <div className="w-[268px] h-screen px-8 py-6 hidden md:flex flex-col gap-12 border-r-[0.5px] border-[#EAEAEA]/15">
      <Logo />

      <div className="nav-blocks flex flex-col gap-4">
        {navBlocks.map((block, i) => (
          <Fragment key={block.title}>
            <NavBlock block={block} />
            {i !== navBlocks.length - 1 ? (
              <div className="w-full h-[1px] bg-dark/60 dark:bg-white/60"></div>
            ) : null}
          </Fragment>
        ))}
      </div>
    </div>
  );
};

const NavBlock = ({ block }: { block: (typeof navBlocks)["0"] }) => {
  return (
    <ul className="flex flex-col">
      {block.links.map((link) => (
        <NavLink key={link.title} link={link} />
      ))}
    </ul>
  );
};

export const NavLink = ({ link }: { link: NavItem }) => {
  const currentPath = usePathname();
  const isActive =
    link.href === "/dashboard"
      ? currentPath === "/dashboard"
      : currentPath.startsWith(link.href);

  return (
    <Link
      href={link.href}
      className={cn(
        "flex items-center gap-4 text-nowrap px-5 py-4 rounded-[15px] bg-primary bg-opacity-0 dark:text-white/60 transition-colors duration-300",
        isActive && "bg-opacity-10 text-secondary dark:text-secondary"
      )}
    >
      <link.Icon></link.Icon>
      {link.title}
      {isActive}
    </Link>
  );
};

export default Sidebar;
