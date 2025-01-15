import React from "react";
import Image from "next/image";
import sheild from "../../../public/images/Shield.svg";
import lighting from "../../../public/images/Lightning.svg";
import user from "../../../public/images/User.svg";
import gradient from "../../../public/images/Gradient.png";
import eclipse from "../../../public/images/Gradient-2.png";
import { cn } from "@/lib/utils";

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
    <section className="flex flex-col items-center gap-16 lg:gap-28 w-full max-w-6xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-afacad font-bold text-center xl:text-4xl 2xl:text-5xl">
        Your elections{" "}
        <span className="text-primary">secured, anywhere, anytime.</span>
      </h1>

      <Image src={gradient} alt="eclipse" className="absolute left-0" />
      {features.map((card, i) => (
        <FeatureCard key={i} reverse={(i + 1) % 2 === 0} card={card} />
      ))}
    </section>
  );
};

export default Features;

type FeatureCardProps = {
  reverse: boolean;
  card: {
    image: string;
    title: string;
    description: string;
  };
};

const FeatureCard = ({ reverse, card }: FeatureCardProps) => {
  const aosConfig = {
    "data-aos": "fade-in",
    "data-aos-duration": "1500",
    "data-aos-easing": "ease-in-out",
    "data-aos-once": "false",
  };

  const className = cn(
    "w-full flex flex-col-reverse justify-between px-5",
    reverse ? "md:flex-row-reverse" : "md:flex-row"
  );
  return (
    <div {...aosConfig} className={className}>
      <div className="flex flex-col gap-4 max-w-xl max-md:text-center">
        <h1 className="text-xl lg:text-3xl font-afacad font-bold 2xl:text-4xl">
          {card.title}
        </h1>
        <p className="text-subtle-text xl:text-xl  2xl:text-2xl font-afacad leading-loose">
          {card.description}
        </p>
      </div>
      <Image
        src={card.image}
        alt={card.title}
        className="aspect-square max-md:w-24 max-md:mx-auto"
      />
    </div>
  );
};
