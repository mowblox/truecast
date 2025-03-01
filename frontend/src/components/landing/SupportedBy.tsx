"use client";
import { Fragment } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { Separator } from "@radix-ui/react-select";
import { sponsors } from "@/data/sponsors";

const SupportedBy = () => {
  const { resolvedTheme } = useTheme();
  return (
    <div className="w-full flex flex-col gap-4 items-center mt-10 lg:mt-[208px]">
      <h1 className="font-afacad text-xl lg:text-2xl">Supported by</h1>
      <div className="w-full flex px-4 overflow-x-auto sm:items-center sm:justify-center gap-6 lg:gap-12 hide-scrollbar">
        {sponsors.map((sponsor, i) => (
          <Fragment key={i}>
            <Image
              src={
                resolvedTheme === "light" ? sponsor.image : sponsor.imageDark
              }
              alt={sponsor.name}
              className="shrink-0 h-10 main"
              width={116}
              height={36}
            />
            {i < sponsors.length - 1 ? (
              <Separator className="hidden lg:block w-[1px] h-4 bg-subtle-text" />
            ) : null}
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default SupportedBy;
