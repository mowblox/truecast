import {
  TrophyIcon,
  Home,
  ThumbsUp,
  Folder,
  UserPlus2,
  PhoneCall,
} from "lucide-react";
import { ComponentType } from "react";

export type NavItem = {
  title: string;
  href: string;
  Icon: ComponentType;
};

export type NavBlock = {
  title: string;
  links: NavItem[];
};

export const navBlocks: NavBlock[] = [
  {
    title: "Dashboard",
    links: [
      {
        title: "Overview",
        href: "/dashboard",
        Icon: Home,
      },
      {
        title: "Create election",
        href: "/dashboard/create-election",
        Icon: UserPlus2,
      },
      // {
      //   title: "Vote",
      //   href: "/dashboard/vote",
      //   Icon: ThumbsUp,
      // },
      {
        title: "Election hub",
        href: "/dashboard/elections",
        Icon: TrophyIcon,
      },
      {
        title: "My elections",
        href: "/dashboard/my-elections",
        Icon: Folder,
      },
    ],
  },
  {
    title: "Support",
    links: [
      {
        title: "Support",
        href: "/dashboard/settings/support",
        Icon: PhoneCall,
      },
    ],
  },
];
