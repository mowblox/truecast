import { Metadata } from "next";
import { Space_Grotesk, Roboto_Flex, Afacad } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import WalletProvider from "@/components/WalletProvider";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

const space_grotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});
const roboto_flex = Roboto_Flex({
  subsets: ["latin"],
  variable: "--font-roboto-flex",
});
const afacad = Afacad({
  subsets: ["latin"],
  variable: "--font-afacad",
});

export const metadata: Metadata = {
  title: "ABVS",
  description: "BUIDL with Mowblox",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${space_grotesk.variable} ${roboto_flex.variable} ${afacad.variable}`}
    >
      <body className="bg-dark">
        <ThemeProvider attribute="class" defaultTheme="dark">
          <WalletProvider>
            <Header />
            {children}
            <Toaster position="top-center" richColors />
          </WalletProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
