"use client";
import Image from "next/image";
import Link from "next/link";

const socials = [
  {
    url: "https://linkedin.com/truecastio",
    image: "/images/linkedin.png",
    name: "LinkedIn",
  },
  { url: "https://twitter.com/truecastio", name: "X (Twitter)" },
  {
    url: "mailto:info@truecastio.com",
    image: "/images/email.png",
    name: "Email",
  },
];

export default function Header() {
  return (
    <header className="w-full mx-auto px-8 py-5">
      <nav className="flex flex-col md:flex-row justify-center md:justify-between items-center gap-5">
        <Link href="/">
          <h1 className="font-afacad text-[26px] font-medium leading-8 relative after:absolute after:left-0 after:-bottom-2 after:w-1/2 after:h-1.5 after:rounded-full after:bg-primary">
            Truecast
          </h1>
        </Link>
        <div className="flex gap-5">
          {socials.map((social) => (
            <SocialLink key={social.url} {...social} />
          ))}
        </div>
      </nav>
    </header>
  );
}

const SocialLink = (link: { url: string; image?: string; name: string }) => {
  return (
    <Link
      href={link.url}
      className="flex items-center font-afacad gap-2 cursor-pointer hover:text-primary"
    >
      {link.image ? (
        <Image
          src={link.image}
          alt={link.name}
          width={25}
          height={36}
          className="self-center"
        />
      ) : null}
      <span>{link.name}</span>
    </Link>
  );
};
