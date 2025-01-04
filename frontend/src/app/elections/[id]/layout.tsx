import { AppSidebar } from "@/components/AppSideBar";
import TopNavWrapper from "@/components/TopNavWrapper";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function ElectionDetailLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <TopNavWrapper />
          {children}
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
