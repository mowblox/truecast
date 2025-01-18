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
      className="items-center flex flex-col gap-14 relative"
    >
      <HeroBg />
      <div className="flex flex-col items-center max-w-3xl px-4 text-center mt-11">
        <h1 className=" text-7xl lg:text-9xl tracking-[-3px]">
          Future Of Fair Elections
        </h1>
        <p className="mt-4 w-full max-w-[509px] text-xl font-afacad text-text dark:text-dark-text/60 leading-[32px] tracking-[2%]">
          Remember that feeling after casting your vote? That moment of &quot;I
          hope it makes it&quot;? Yeah, we weren&apos;t fans either. That&apos;s
          why we’re building something better.
        </p>
        <WaitlistForm className="mt-[53px]" />
      </div>

      <SupportedBy />
    </motion.section>
  );
};

const HeroBg = () => (
  <Image
    src={"images/hero_bg.svg"}
    alt="Background"
    width={1440}
    height={900}
    className="absolute w-full object-cover -z-10 h-screen max-h-[1200px] lg:pt-52"
  />
);

export default Hero;
