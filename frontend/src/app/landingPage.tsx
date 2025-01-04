"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import heroIcon from "../../public/images/hero-bg.png";
import underline from "../../public/images/white-underline.png";
import handsup from "../../public/images/hands-up-illus.png";
import blueUnderline from "../../public/images/blue-underline.png";
import callout from "../../public/images/callout-illus.png";
import gradient from "../../public/images/Gradient.png";
import king from "../../public/images/king-illus.png";
import smile from "../../public/images/smiley-illus.png";
import cardGradient from "../../public/images/card-gradient.png";
import gradient2 from "../../public/images/Gradient-2.png";
import Link from "next/link";
import { motion } from "framer-motion";
import BlurIn from "@/components/ui/blur-in";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { useAccount } from "wagmi";
import { toast } from "sonner";

export default function LandingPage() {
  const { connector } = useAccount();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  return (
    <div className="relative pb-52 text-text">
      <Image
        src={heroIcon.src}
        width={heroIcon.width} // Add width
        height={heroIcon.height}
        alt="hero"
        className="w-full h-auto object-cover absolute -z-10 opacity-85"
      />
      <div className="flex justify-center items-center h-[100vh]">
        <div className="w-[90%] md:w-[70%] lg:w-[55%] justify-center text-center">
          <BlurIn
            word=" Decentralized Democracy for Everyone"
            className="font-space-grotesk font-bold text-[32px] md:text-[42px] lg:text-[52px] gradient-text"
            duration={1.5}
          />
          <Image
            src={underline.src}
            width={underline.width} // Add width
            height={underline.height}
            alt="underline"
            className="w-[150px] md:w-[200px] lg:w-[300px] mx-auto"
          />
          <p className="w-[90%] md:w-[80%] m-auto mt-6 text-sm md:text-base lg:text-lg text-subtle-text">
            By transforming your group into a mini DAO, you can harness the
            power of decentralization to make informed decisions collectively.
          </p>
          <motion.div
            className="gap-4 md:gap-6 lg:gap-8 flex justify-center mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {loading ? (
              <LoadingSpinner className="mt-2" />
            ) : (
              <Link
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (connector) {
                    setLoading(true);
                    router.push("/elections/add");
                  } else {
                    toast.warning("Please log in or connect your wallet first");
                  }
                }}
                className="py-2 px-4 md:py-2 md:px-6 rounded-3xl w-[140px] md:w-[160px] lg:w-[180px] bg-gradient-to-r from-primary to-[#4595DF] hover:from-[#4595DF] hover:to-primary cursor-pointer"
              >
                create election
              </Link>
            )}

            <Link
              href={"/elections"}
              className="bg-dark border border-white py-2 px-4 md:py-2 md:px-6 rounded-3xl w-[140px] md:w-[160px] lg:w-[180px] hover:bg-[#939393] cursor-pointer"
            >
              cast vote
            </Link>
          </motion.div>
        </div>
      </div>
      <div className="justify-center flex flex-col gap-16 md:gap-40 lg:gap-60">
        <h3 className="font-space-grotesk text-center font-bold text-[20px] md:text-[24px] lg:text-[26px]">
          What you can do with ABVS
        </h3>

        <div className="relative">
          <Image
            src={gradient.src}
            width={gradient.width}
            height={gradient.height}
            alt="gradient"
            className="absolute left-0 w-[100px] md:w-[150px] lg:w-auto"
          />
          <div className="flex flex-col text-center lg:flex-row lg:text-start w-[90%] lg:w-[80%] m-auto justify-between">
            <div className="w-full lg:w-[50%] mb-8 lg:mb-0">
              <h3 className="text-[28px] md:text-[32px] lg:text-[38px] font-bold font-space-grotesk gradient-text-vertical">
                Create Your Mini DAO
              </h3>
              <Image
                src={blueUnderline.src}
                width={blueUnderline.width}
                height={blueUnderline.height}
                alt="blue-underline"
                className="w-[120px] hidden lg:block md:w-[150px] self-center lg:w-[180px]"
              />
              <p className="text-subtle-text mt-4 md:mt-6 lg:mt-8 text-sm md:text-base lg:text-lg">
                Easily establish a decentralized autonomous organization
                tailored to your group&rsquo;s specific needs and goals.
              </p>
            </div>
            <Image
              src={handsup.src}
              width={handsup.width}
              height={handsup.height}
              alt="handsup"
              className=" self-center w-[200px] md:w-[250px] lg:w-[300px]"
            />
          </div>
        </div>

        <div className="w-[90%] lg:w-[80%] m-auto flex flex-col-reverse lg:flex-row justify-between">
          <Image
            src={callout.src}
            width={callout.width} // Add width
            height={callout.height}
            alt="handsup"
            className="self-center w-[200px] md:w-[250px] lg:w-[300px] mb-8 lg:mb-0"
          />
          <div className="w-full lg:w-[55%] text-end relative">
            <h3 className="text-center text-[28px] md:text-[32px] lg:text-end lg:text-[38px] font-bold font-space-grotesk gradient-text-vertical">
              Initiate and Vote on Proposals
            </h3>
            <Image
              src={blueUnderline.src}
              width={blueUnderline.width} // Add width
              height={blueUnderline.height}
              alt="blue-underline"
              className=" w-[120px] hidden lg:block md:w-[150px] lg:w-[180px] right-0 absolute"
            />
            <p className="text-center lg:text-end text-subtle-text mt-4 md:mt-10 lg:mt-14 text-sm md:text-base lg:text-lg">
              Propose new ideas, projects, or initiatives, and securely cast
              your vote on matters that impact your community.
            </p>
          </div>
        </div>

        <div className="relative">
          <Image
            src={cardGradient.src}
            width={cardGradient.width} // Add width
            height={cardGradient.height}
            alt="gradient"
            className="absolute right-0 w-[100px] md:w-[150px] lg:w-auto"
          />
          <div className="flex flex-col lg:flex-row w-[90%] lg:w-[80%] m-auto justify-between">
            <div className="w-full lg:w-[50%] mb-8 lg:mb-0">
              <h3 className="text-[28px] md:text-[32px] text-center lg:text-start lg:text-[38px] font-bold font-space-grotesk gradient-text-vertical">
                Track and Verify Results
              </h3>
              <Image
                src={blueUnderline.src}
                width={blueUnderline.width}
                height={blueUnderline.height}
                alt="blue-underline"
                className="w-[120px] hidden lg:block md:w-[150px] lg:w-[180px]"
              />
              <p className="text-subtle-text text-center lg:text-start mt-4 md:mt-6 lg:mt-8 text-sm md:text-base lg:text-lg">
                Maintain complete transparency with real-time voting updates and
                an immutable record of all decisions.
              </p>
            </div>
            <Image
              src={king.src}
              width={king.width}
              height={king.height}
              alt="handsup"
              className="self-center w-[200px] md:w-[250px] lg:w-[300px]"
            />
          </div>
        </div>

        <div className="relative">
          <Image
            src={gradient2.src}
            width={gradient2.width}
            height={gradient2.height}
            alt="gradient"
            className="absolute left-0 w-[100px] md:w-[150px] lg:w-auto"
          />
          <div className="flex flex-col lg:flex-row w-[90%] lg:w-[80%] m-auto justify-between border  border-primary rounded-3xl">
            <div className="w-full lg:w-[55%] flex flex-col gap-4 py-14 md:py-20 lg:py-28 pl-6 md:pl-16 lg:pl-32">
              <h3 className="text-[28px] md:text-[32px] lg:text-[38px] font-bold font-space-grotesk gradient-text">
                More than just a voting platform
              </h3>
              <p className="text-subtle-text text-sm md:text-base lg:text-lg">
                Propose new ideas, projects, or initiatives, and securely cast
                your vote on matters that impact your community.
              </p>
              <button className="py-2 md:py-4 px-4 md:px-6 rounded-3xl w-[140px] md:w-[160px] lg:w-[180px] bg-gradient-to-r from-primary to-[#4595DF] hover:from-[#a9bcce] hover:to-primary cursor-pointer">
                Get started
              </button>
            </div>
            <div className="flex w-auto justify-end items-end">
              <Image
                src={smile.src}
                width={smile.width}
                height={smile.height}
                alt="smile"
                className="w-[200px] md:w-[250px] lg:w-[300px]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
