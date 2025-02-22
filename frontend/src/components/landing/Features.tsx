import React from "react";
import Image from "next/image";
import sheild from "../../../public/images/Shield.svg";
import lighting from "../../../public/images/Lightning.svg";
import user from "../../../public/images/User.svg";
import { cn } from "@/lib/utils";
import LightSource from "./LightSource";

const features = [
  {
    image: sheild,
    title: "Bulletproof Security",
    description:
      "Each vote is sealed with blockchain technology, making tampering impossible. Trust isn't promised – it's guaranteed.",
  },
  {
    image: lighting,
    title: "Real-Time Tracking",
    description:
      "Watch results roll in live. Our blockchain tech guarantees every vote counts, securing a transparent and trustworthy election process.",
  },
  {
    image: user,
    title: "Voter Verification",
    description:
      "Import your voter list, send invitations, and let the system handle verification. Democracy has never been this easy.",
  },
];

const Features = () => {
  return (
    <section className="relative mt-20 lg:mt-28">
      <div className="flex flex-col items-center gap-20 lg:gap-28 w-full max-w-6xl mx-auto">
        <LightSource className="left-0" />
        <LightSource
          position="right"
          className="right-0 top-[40%] translate-x-1/3"
        />
        <LightSource className="left-0 bottom-0" />

        {features.map((card, i) => (
          <FeatureCard key={i} reverse={(i + 1) % 2 === 0} card={card} />
        ))}
      </div>
    </section>
  );
};

type FeatureCardProps = {
  reverse: boolean;
  card: {
    image: string;
    title: string;
    description: string;
  };
};

const FeatureCard = ({ reverse, card }: FeatureCardProps) => {
  const className = cn(
    "w-full flex flex-col gap-y-16 justify-between px-4",
    reverse ? "md:flex-row-reverse" : "md:flex-row"
  );
  return (
    <div className={className}>
      <div className="flex flex-col gap-4 max-w-xl max-md:text-center">
        <h1 className="text-[32px] lg:text-[42px] text-dark dark:text-white">
          {card.title}
        </h1>
        <p className="text-text dark:text-dark-text/60 text-xl  2xl:text-2xl leading-loose">
          {card.description}
        </p>
      </div>
      <Image
        src={card.image}
        alt={card.title}
        className="aspect-square max-md:w-[200px] max-md:mx-auto"
      />
    </div>
  );
};

export default Features;