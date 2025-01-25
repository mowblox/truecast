"use client";
import { ReactNode } from "react";
import Logo from "../landing/Logo";
import Link from "next/link";
import {
  TrophyIcon,
  Home,
  ThumbsUp,
  Folder,
  UserPlus2,
  PhoneCall,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
type NavLink = {
  title: string;
  href: string;
  icon: ReactNode;
};

type NavBlock = {
  title: string;
  links: NavLink[];
};

const navBlocks: NavBlock[] = [
  {
    title: "Dashboard",
    links: [
      {
        title: "Overview",
        href: "/dashboard",
        icon: <Home />,
      },
      {
        title: "Create election",
        href: "/dashboard/create-election",
        icon: <UserPlus2 />,
      },
      {
        title: "Vote",
        href: "/dashboard/vote",
        icon: <ThumbsUp />,
      },
      {
        title: "Election hub",
        href: "/dashboard/election-hub",
        icon: <TrophyIcon />,
      },
      {
        title: "My elections",
        href: "/dashboard/my-elections",
        icon: <Folder />,
      },
    ],
  },
  {
    title: "Support",
    links: [
      {
        title: "Support",
        href: "/dashboard/settings/support",
        icon: <PhoneCall />,
      },
    ],
  },
];

const Sidebar = () => {
  return (
    <div className="w-[268px] h-screen px-8 py-6 flex flex-col gap-12 border-r-[0.5px] border-[#EAEAEA]/15">
      <Logo />

      <div className="nav-blocks flex flex-col gap-4">
        {navBlocks.map((block, i) => (
          <>
            <NavBlock key={block.title} block={block} />
            {i !== navBlocks.length - 1 ? (
              <div className="w-full h-[1px] bg-dark/60 dark:bg-white/60"></div>
            ) : null}
          </>
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

const NavLink = ({ link }: { link: NavLink }) => {
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
      {link.icon}
      {link.title}
      {isActive}
    </Link>
  );
};

export default Sidebar;
