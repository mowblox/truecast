import { Metadata } from "next";
import { Space_Grotesk, Roboto_Flex, Afacad, Abel } from "next/font/google";
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
const abel = Abel({
  subsets: ["latin"],
  variable: "--font-abel",
  weight: "400",
});

const fonts = [afacad, space_grotesk, roboto_flex, abel];
const fontClasses = fonts.map((font) => font.variable).join(" ");

export const metadata: Metadata = {
  title: "Truecast | Landing",
  description: "BUIDL with Mowblox",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={fontClasses} suppressHydrationWarning>
      <body className="bg-white dark:bg-dark min-h-dvh font-afacad">
        <ThemeProvider attribute="class">
          {/* <WalletProvider> */}
          {children}
          <Toaster position="top-center" richColors />
          {/* </WalletProvider> */}
        </ThemeProvider>
      </body>
    </html>
  );
}
