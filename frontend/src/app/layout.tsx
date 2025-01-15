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

const fonts = [afacad, space_grotesk, roboto_flex];
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
    <html lang="en" className={fontClasses}>
      <body className="bg-dark">
        <ThemeProvider attribute="class" defaultTheme="dark">
          {/* <WalletProvider> */}
          <div className="w-full max-w-screen-2xl mx-auto overflow-x-hidden">
            <Header />
            {children}
          </div>
          <Toaster position="top-center" richColors />
          {/* </WalletProvider> */}
        </ThemeProvider>
      </body>
    </html>
  );
}
