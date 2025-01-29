import { Metadata } from "next";
import Footer from "@/components/Footer";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import FinalCta from "@/components/landing/FinalCta";
import LandingLayout from "@/components/landing/LandingLayout";

export const metadata: Metadata = {
  title: "TrueCast | Landing",
};

export default function LandingPage() {
  return (
    <LandingLayout>
      <main className="flex flex-col gap-16 lg:gap-28">
        <Hero />
        <Features />
        <FinalCta />
        <Footer />
      </main>
    </LandingLayout>
  );
}
