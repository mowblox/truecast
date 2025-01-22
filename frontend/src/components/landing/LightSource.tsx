import Image from "next/image";
import React from "react";
import gradientLeft from "../../../public/images/Gradient.png";
import gradientRight from "../../../public/images/card-gradient.png";
import { cn } from "@/lib/utils";

const LightSource = ({
  className,
  position = "left",
}: {
  className?: string;
  position?: string;
}) => {
  className = cn("absolute -z-10 pointer-events-none select-none", className);
  return (
    <Image
      src={position === "left" ? gradientLeft : gradientRight}
      alt="gradient"
      className={className}
    />
  );
};

export default LightSource;
