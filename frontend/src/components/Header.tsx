'use client';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Image from "next/image";
import Link from "next/link";


export default function Header() {

  return (
    <header className='mx-auto w-[90%]'>
      <nav className=" bg-dark py-2.5 justify-center ">
        <div className="flex flex-col lg:flex-row justify-center lg:justify-between items-center ">
          <Link href="/">
            <Image
              src="/images/truecast-logo.svg"
              alt="Logo"
              width={150}
              height={36}
              className='mb-6'
            />
          </Link>
          {/* <div className="flex items-center lg:order-2">
            <ConnectButton />
          </div> */}
          <div className='flex items-center text-xl font-afacad gap-4 cursor-pointer hover:text-primary'>
            <Image src='/images/email.png' alt="Logo" width={25} height={36} className="self-center" />
            <a>Email</a>
          </div>
        </div>
      </nav>
    </header>
  );
}
