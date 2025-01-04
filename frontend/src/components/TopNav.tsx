'use client';
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export default function TopNav({ disabled = false }: { disabled?: boolean }) {
  const params = useParams();
  const id = params?.id as string | undefined;
  const pathname = usePathname();

  const tabs = [
    { name: "Election", href: `/elections/${id}` },
    { name: "Candidates", href: `/elections/${id}/candidates` },
    { name: "Voters", href: `/elections/${id}/voters` },
    { name: "Summary", href: `/elections/${id}/summary` },
    { name: "Link", href: `/elections/${id}/link` }
  ];

  return (
    <>
      {disabled ?
        tabs.map((tab, i) => (
          <button
            key={i}
            disabled
            className={`${i === 0 ? "border-b-2 border-[#4C9FE4] text-[#4C9FE4]" :
              "text-subtle-text"} pb-2 mr-6 lg:mr-14 text-[12px] md:text-[16px] lg:text-[18px] font-space-grotesk`}>
            {tab.name}
          </button>
        )) :
        tabs.map((tab, i) => (
          <Link
            key={i}
            href={tab.href}
            replace
            className={`${pathname === tab.href ? "border-b-2 border-[#4C9FE4] text-[#4C9FE4]" :
              "text-subtle-text"} pb-2 mr-6 lg:mr-14 text-[12px] md:text-[16px] lg:text-[18px] font-space-grotesk`}>
            {tab.name}
          </Link>
        ))}
    </>
  );
}