"use client";
import Image from "next/image";
import WaitlistForm from "@/components/waitlist/WaitlistForm";
import SupportedBy from "./SupportedBy";
import { motion } from "framer-motion";

const Hero = () => {
  const motionConfig = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  };
  return (
    <motion.section
      {...motionConfig}
      className="items-center flex flex-col gap-14"
    >
      <HeroBg />
      <div className="flex flex-col items-center max-w-3xl px-4 text-center mt-11">
        <h1 className=" text-7xl lg:text-[116px] tracking-[-3px]">
          Future Of Fair Elections
        </h1>
        <p className="mt-4 w-full font-normal max-w-[509px] text-[26px] font-afacad text-[#454D59] dark:text-dark-text/60 leading-[32px] tracking-[2%]">
          Your elections secured, anywhere, anytime.
        </p>
        <WaitlistForm className="mt-[53px]" />
      </div>

      <SupportedBy />
    </motion.section>
  );
};

const HeroBg = () => (
  <Image
    src={"images/hero-bg-pattern.svg"}
    alt="Background"
    width={1440}
    height={900}
    className="hidden lg:block absolute inset-0 w-full object-cover object-right-bottom -z-10 h-screen max-h-[1200px] scale-[300%] transition duration-700 dark:opacity-[0.02]"
  />
);

export default Hero;
