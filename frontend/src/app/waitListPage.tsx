"use client";
import React, { useEffect, useState, FormEvent, useRef } from "react";
import Image from "next/image";
import bell from "../../public/images/bell.png";
import { Separator } from "@radix-ui/react-select";
import mowblox from "../../public/images/mowblox.png";
import scroll from "../../public/images/scroll.png";
import creya from "../../public/images/creya.png";
import sheild from "../../public/images/Shield.svg";
import lighting from "../../public/images/Lightning.svg";
import user from "../../public/images/User.svg";
import gradient from "../../public/images/Gradient.png";
import eclipse from "../../public/images/Gradient-2.png";
import eclipse2 from "../../public/images/card-gradient.png";
import background from "../../public/images/hero_bg.svg";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import emailjs from "emailjs-com";
import { toast } from "sonner";
import Aos from "aos";
import "aos/dist/aos.css";

const WaitListPage = () => {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        formRef.current!,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );

      if (result.status === 200) {
        toast.success("You have been added to the waitlist!");
        setEmail("");
      } else {
        throw new Error(result.text || "Something went wrong");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message || "Failed to add to the waitlist.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    Aos.init();
  }, []);

  return (
    <div className=" m-auto flex flex-col gap-16 lg:gap-28 relative">
      {/* Hero Section */}
      <section className="items-center flex flex-col gap-16 lg:gap-28 ">
        <div className="flex flex-col items-center w-[80%] lg:w-[60%] xl:w-[50%] text-center">
          <Image
            src={background}
            alt="Background"
            className="absolute w-full -z-10 mt-16 xs:mt-[130px] sm:-mt-[50px] md:-mt-[150px] lg:-mt-[250px] xl:-mt-[350px] 2xl:-mt-[500px] "
          />
          <h1 className="text-[50px] lg:text-8xl 2xl:text-9xl font-bold font-afacad">
            Future Of Fair Elections
          </h1>
          <p className="mt-4 lg:mt-6 w-full md:w-[60%] lg:w-[80%] 2xl:w-[70%] lg:text-xl xl:text-2xl 3xl:text-2xl font-afacad text-subtle-text leading-loose">
            Remember that feeling after casting your vote? That moment of
            &quot;I hope it makes it&quot;? Yeah, we weren&apos;t fans either.
            That&apos;s why we’re building something better.
          </p>
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="flex flex-col lg:flex-row py-2 px-2 rounded-3xl lg:rounded-full bg-[#07070729] items-center w-full md:w-[70%] mt-6 lg:mt-12 xl:mt-20 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary"
          >
            <input
              type="email"
              name="user_email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#07070702] font-afacad rounded-full p-3 focus:outline-none focus:[#0707074D]"
            />
            <button
              type="submit"
              className="bg-primary hover:bg-chart-1 text-white w-full lg:w-[50%] font-afacad p-3 rounded-full mt-4 lg:mt-0 lg:ml-4 focus:outline-none hover:from-[#ffffff] hover:to-primary"
            >
              {loading ? (
                <LoadingSpinner className="mx-auto sm:w-auto" />
              ) : (
                <>
                  Get notified
                  <Image
                    src={bell}
                    alt="Notification bell"
                    width={20}
                    height={20}
                    className="inline ml-2"
                  />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Support Section */}
        <div className="flex flex-col gap-4 items-center">
          <h1 className="font-afacad text-xl lg:text-2xl">Support by</h1>
          <div className="flex flex-wrap items-center justify-center gap-6 lg:space-x-12">
            <Image src={mowblox} alt="Mowblox" width={100} height={100} />
            <Separator className="hidden lg:block w-[1px] h-4 bg-subtle-text" />
            <Image src={scroll} alt="Scroll" width={100} height={100} />
            <Separator className="hidden lg:block w-[1px] h-4 bg-subtle-text" />
            <Image src={creya} alt="Creya" width={100} height={100} />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="flex flex-col items-center gap-16 lg:gap-28">
        <h1 className="text-2xl md:text-3xl font-afacad font-bold text-center xl:text-4xl 2xl:text-5xl w-full md:w-[60%] lg:w-[40%] xl:w-[35%]">
          Your elections{" "}
          <span className="text-primary">secured, anywhere, anytime.</span>
        </h1>

        <Image src={gradient} alt="eclipse" className="absolute left-0" />
        <div
          data-aos="fade-in"
          data-aos-duration="1500"
          data-aos-easing="ease-in-out"
          data-aos-once="false"
          className="flex flex-col lg:flex-row items-center lg:items-start lg:justify-between w-[70%] gap-8 lg:gap-0"
        >
          <div className="flex flex-col items-center lg:items-start gap-4 md:w-[70%] lg:w-[50%]">
            <h1 className="text-xl lg:text-3xl 2xl:text-4xl font-afacad font-bold">
              Bulletproof Security
            </h1>
            <p className="text-subtle-text text-center lg:text-start xl:text-xl 2xl:text-2xl font-afacad leading-loose">
              Each vote is sealed with blockchain technology, making tampering
              impossible. Trust isn&#39;t promised – it&#39;s guaranteed.
            </p>
          </div>
          <Image src={sheild} alt="Shield" className="w-24 lg:w-auto" />
        </div>

        <div
          data-aos="fade-in"
          data-aos-duration="1500"
          data-aos-easing="ease-in-out"
          data-aos-once="false"
          className="flex flex-col-reverse lg:flex-row items-center lg:items-start lg:justify-between w-[70%] gap-8 lg:gap-0"
        >
          <Image src={lighting} alt="Lighting" className="w-24 lg:w-auto" />
          <div className="flex flex-col items-center lg:items-end gap-4 md:w-[70%] lg:w-[50%]">
            <h1 className="text-xl lg:text-3xl font-afacad font-bold 2xl:text-4xl">
              Real-Time Tracking
            </h1>
            <p className="text-subtle-text text-center xl:text-xl  2xl:text-2xl lg:text-end font-afacad leading-loose">
              Watch results roll in live. Our blockchain tech guarantees every
              vote counts, securing a transparent and trustworthy election
              process.
            </p>
          </div>
        </div>

        <div
          data-aos="fade-in"
          data-aos-duration="1500"
          data-aos-easing="ease-in-out"
          data-aos-once="false"
          className=" w-full relative"
        >
          <Image src={eclipse} alt="eclipse" className="absolute left-0" />
          <div className="w-[70%] mx-auto flex flex-col lg:flex-row items-center lg:items-start lg:justify-between gap-8 lg:gap-0">
            <div className="flex flex-col items-center lg:items-start gap-4 md:w-[70%] lg:w-[50%]">
              <h1 className="text-xl lg:text-3xl font-afacad font-bold 2xl:text-4xl">
                Voter Verification
              </h1>
              <p className="text-subtle-text xl:text-xl  2xl:text-2xl text-center lg:text-start font-afacad leading-loose">
                Import your voter list, send invitations, and let the system
                handle verification. Democracy has never been this easy.
              </p>
            </div>
            <Image src={user} alt="User" className="w-24 lg:w-auto" />
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="w-[80%] m-auto flex flex-col items-center gap-16 lg:gap-28 mb-20">
        <Image
          src={eclipse2}
          alt="eclipse"
          className="absolute right-0 w-[25%]"
        />
        <div
          data-aos="fade-up"
          data-aos-duration="1500"
          data-aos-easing="ease-in-out"
          data-aos-once="false"
          className="flex flex-col items-center gap-4 lg:gap-6 w-full lg:w-[70%] xl:w-[50%]"
        >
          <h1 className="text-xl lg:text-3xl 2xl:text-4xl lg:w-[70%] font-afacad font-bold text-center">
            Ready to experience{" "}
            <span className="text-primary">the future of voting?</span>
          </h1>
          <p className="text-center lg:w-[70%] font-afacad text-subtle-text leading-loose xl:text-xl  2xl:text-2xl">
            Be one of the first to bring secure, modern elections to your
            organization or community. Drop your email below to get early access
            to our platform.
          </p>
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="flex flex-col lg:flex-row py-2 px-2 rounded-3xl lg:rounded-full bg-[#1D57C21A] items-center w-full md:w-[70%] mt-8 lg:mt-12 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary"
          >
            <input
              type="email"
              name="user_email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#07070702] font-afacad rounded-full p-3 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-primary hover:bg-chart-1 text-white w-full lg:w-[50%] font-afacad p-3 rounded-full mt-4 lg:mt-0 lg:ml-4 focus:outline-none hover:from-[#ffffff] hover:to-primary"
            >
              {loading ? (
                <LoadingSpinner className="mx-auto sm:w-auto" />
              ) : (
                <>
                  Get notified
                  <Image
                    src={bell}
                    alt="Notification bell"
                    width={20}
                    height={20}
                    className="inline ml-2"
                  />
                </>
              )}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default WaitListPage;
