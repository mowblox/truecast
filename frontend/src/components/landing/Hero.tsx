import Image from "next/image";
import { Separator } from "@radix-ui/react-select";
import WaitlistForm from "@/components/waitlist/WaitlistForm";

const Hero = () => {
  return (
    <section className="items-center flex flex-col gap-14 relative">
      <HeroBg />
      <div className="flex flex-col items-center max-w-3xl px-5 text-center mt-8">
        <h1 className=" text-5xl lg:text-9xl font-bold font-afacad">
          Future Of Fair Elections
        </h1>
        <p className="mt-4 w-full max-w-[509px] lg:text-xl font-afacad text-subtle-text leading-loose">
          Remember that feeling after casting your vote? That moment of &quot;I
          hope it makes it&quot;? Yeah, we weren&apos;t fans either. That&apos;s
          why we’re building something better.
        </p>
        <WaitlistForm className="mt-[53px]" />
      </div>

      <SupportedBy />
    </section>
  );
};

const HeroBg = () => (
  <Image
    src={"images/hero_bg.svg"}
    alt="Background"
    width={1440}
    height={900}
    className="absolute w-full object-cover -z-10 h-screen max-h-[1200px] lg:pt-40"
  />
);

const SupportedBy = () => {
  const supporters = [
    { name: "Mowblox", image: "/images/mowblox.png" },
    { name: "Scroll", image: "/images/scroll.png" },
    { name: "Creya", image: "/images/creya.png" },
  ];
  return (
    <div className="w-full flex flex-col gap-4 items-center mt-10 lg:mt-[208px]">
      <h1 className="font-afacad text-xl lg:text-2xl">Supported by</h1>
      <div className="w-full flex px-4 overflow-x-auto sm:items-center sm:justify-center gap-6 lg:gap-12">
        {supporters.map((supporter, i) => (
          <>
            <Image
              src={supporter.image}
              alt={supporter.name}
              className="shrink-0"
              width={140}
              height={35}
            />
            {i < supporters.length - 1 ? (
              <Separator className="hidden lg:block w-[1px] h-4 bg-subtle-text" />
            ) : null}
          </>
        ))}
      </div>
    </div>
  );
};

export default Hero;
