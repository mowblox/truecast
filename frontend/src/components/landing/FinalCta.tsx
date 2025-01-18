import React from "react";
import WaitlistForm from "../waitlist/WaitlistForm";
import Image from "next/image";
import eclipse2 from "../../../public/images/card-gradient.png";

const FinalCta = () => {
  return (
    <section className="flex flex-col items-center gap-16 lg:gap-28 mb-20">
      <Image
        src={eclipse2}
        alt="eclipse"
        className="absolute right-0 w-[30%]"
      />
      <div
        data-aos="fade-up"
        data-aos-duration="1500"
        data-aos-easing="ease-in-out"
        data-aos-once="false"
        className="flex flex-col items-center gap-4 lg:gap-6 w-full px-5"
      >
        <div className="flex flex-col gap-3 max-w-2xl">
          <h1 className="text-[32px] lg:text-5xl text-center text-dark dark:text-white">
            Ready to experience the future of voting?
          </h1>
          <p className="text-xl text-center leading-loose text-text dark:text-dark-text/60">
            Be one of the first to bring secure, modern elections to your
            organization or community. Drop your email below to get early access
            to our platform.
          </p>
        </div>
        <WaitlistForm className="mt-20" />
      </div>
    </section>
  );
};

export default FinalCta;
