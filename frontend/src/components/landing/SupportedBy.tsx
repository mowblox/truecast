"use client";
import { Fragment } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { Separator } from "@radix-ui/react-select";

const SupportedBy = () => {
  const { resolvedTheme } = useTheme();

  const supporters = [
    {
      name: "Mowblox",
      image: "/images/logos/sponsors/mowblox_light.png",
      imageDark: "/images/logos/sponsors/mowblox_dark.png",
    },
    {
      name: "Scroll",
      image: "/images/logos/sponsors/scroll_light.png",
      imageDark: "/images/logos/sponsors/scroll_dark.png",
    },
    {
      name: "Creya",
      image: "/images/logos/sponsors/creya.png",
      imageDark: "/images/logos/sponsors/creya.png",
    },
  ];
  return (
    <div className="w-full flex flex-col gap-4 items-center mt-10 lg:mt-[208px]">
      <h1 className="font-afacad text-xl lg:text-2xl">Supported by</h1>
      <div className="w-full flex px-4 overflow-x-auto sm:items-center sm:justify-center gap-6 lg:gap-12">
        {supporters.map((supporter, i) => (
          <Fragment key={i}>
            <Image
              src={
                resolvedTheme === "light"
                  ? supporter.image
                  : supporter.imageDark
              }
              alt={supporter.name}
              className="shrink-0 h-10 main"
              width={140}
              height={35}
            />
            {i < supporters.length - 1 ? (
              <Separator className="hidden lg:block w-[1px] h-4 bg-subtle-text" />
            ) : null}
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default SupportedBy;
