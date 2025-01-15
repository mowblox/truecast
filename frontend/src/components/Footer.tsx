import { socials } from "@/data/socials";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="w-full flex flex-col items-center lg:mt-20">
      <div className="mb-10 flex flex-col items-center text-center md:mb-10 gap-4">
        <Image
          src="/images/truecast-logo.svg"
          alt="Logo"
          width={150}
          height={36}
          className="self-center cursor-pointer"
        />
        <p className="text-subtle-text lg:text-xl mt-6">
          Secure, Transparent, and Fair Voting for Everyone
        </p>
        <ul className="flex list-none font-afacad gap-6 text-primary lg:text-2xl">
          {socials.map((social) => (
            <li
              key={social.url}
              className="hover:text-subtle-text cursor-pointer transition duration-200"
            >
              <Link href={social.url}>{social.name}</Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex gap-8 px-4 w-full justify-center py-4 border-t-subtle-text/15 border-t">
        <p className="text-subtle-text/50 text-[12px]">
          © {new Date().getFullYear()} TRUECAST. All Rights Reserved.
        </p>
      </div>
    </div>
  );
}
