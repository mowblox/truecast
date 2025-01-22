import { socials } from "@/data/socials";
import Link from "next/link";
import Logo from "./landing/Logo";

export default function Footer() {
  return (
    <div className="w-full flex flex-col lg:items-center pt-28 lg:mt-20 bg-dark">
      <div className="mb-10 flex flex-col lg:items-center lg:text-center md:mb-10 gap-4 px-4">
        <Logo />
        <p className="text-white/60 text-xl mt-6">
          Secure, Transparent, and Fair Voting for Everyone
        </p>
        <ul className="flex lg:justify-center list-none font-afacad gap-6 text-primary lg:text-2xl w-full">
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

      <div className="flex gap-8 px-4 w-full lg:justify-center py-4 border-t-subtle-text/15 border-t">
        <p className="text-white/60 text-[12px]">
          © {new Date().getFullYear()} TRUECAST. All Rights Reserved.
        </p>
      </div>
    </div>
  );
}
