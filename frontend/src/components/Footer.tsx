import Image from "next/image";

export default function Footer() {
  return (
    <div className=" m-auto flex flex-col items-center lg:mt-20">
      <div className="w-[80%] m-auto lg:w-[30%] mb-10 flex flex-col items-center text-center md:mb-10 gap-4">
        <Image src="/images/truecast-logo.svg" alt="Logo" width={150} height={36} className="self-center cursor-pointer" />
        <p className="text-subtle-text lg:text-xl mt-6">
          Secure, Transparent, and Fair Voting for Everyone
        </p>
        <ul className="flex list-none font-afacad gap-6 text-primary lg:text-2xl">
          <li className="hover:text-[#ffff] cursor-pointer"><a>linkedin</a></li>
          <li className="hover:text-[#ffff] cursor-pointer"><a>X (Twitter)</a></li>
          <li className="hover:text-[#ffff] cursor-pointer"><a>Email</a></li>
        </ul>
      </div>

      <div className="flex gap-8 px-4 w-full justify-center py-4 border-t-subtle-text border-t-2">
        <p className="text-subtle-text text-[12px]">© 2024 TRUECAST. All Rights Reserved.</p>
        {/* <p className="text-subtle-text text-[12px]">Privacy Policy</p> */}
      </div>
    </div>
  );
}
