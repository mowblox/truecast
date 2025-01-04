import { Metadata } from "next";
import Footer from "@/components/Footer";
import WaitListPage from "./waitListPage";

export const metadata: Metadata = {
  title: "TrueCast | Landing",
};

export default function LandingPage() {
  return (
    <>
      <WaitListPage />
      <Footer />
    </>
  );
}
