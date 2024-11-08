import { Metadata } from "next";
import LandingContent from './landingPage';

export const metadata: Metadata = {
  title: "ABVS | Landing",
};

export default function LandingPage() {
  return <LandingContent />;
}
