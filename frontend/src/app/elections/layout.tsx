import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function ElectionsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <SidebarInset className="p-4">
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}