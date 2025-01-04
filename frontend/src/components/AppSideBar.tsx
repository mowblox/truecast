"use client";

import { TrophyIcon, Home, ThumbsUp, Folder, UserPlus2 } from "lucide-react"
import Image from 'next/image'
import { usePathname } from 'next/navigation';

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

// Menu items.
const items = [
  {
    title: "Home",
    url: "/dashboard/home",
    icon: Home,
  },
  {
    title: "Create election",
    url: "/dashboard/create-election",
    icon: UserPlus2,
  },
  {
    title: "Election hub",
    url: "/dashboard/elections",
    icon: TrophyIcon,
  },
  {
    title: "Vote",
    url: "#",
    icon: ThumbsUp,
  },
  {
    title: "My election",
    url: "#",
    icon: Folder,
  },
]

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader className="mt-6 pl-8">
        <Image src="/images/logo.png" alt="Logo" width={120} height={40} />
        </SidebarHeader>
      <SidebarContent className="pl-5">
        <SidebarGroup>
          <SidebarGroupContent className="mt-10">
            <SidebarMenu className="gap-4">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    className="flex items-center rounded-xl px-4 py-6 selected:text-primary"
                    asChild
                    isActive={pathname === item.url}
                  >
                    <a
                      href={item.url}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg hover:text-primary text-l"
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
