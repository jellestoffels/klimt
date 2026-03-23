"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import clsx from "clsx";
import Logo from "@/components/Logo";
import { client } from "@/sanity/client";

export default function Header() {
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const fetchSettings = async () => {
      const data = await client.fetch(`*[_type == "settings"][0]{ "logoUrl": headerLogo.asset->url }`);
      if (data?.logoUrl) setLogoUrl(data.logoUrl);
    };
    fetchSettings();
  }, []);

  const isProjects = pathname === "/projects";
  const isInfo = pathname === "/info";
  const isContact = pathname === "/contact";

  return (
    <header
      className={clsx(
        "pointer-events-none fixed left-0 right-0 top-0 z-50 px-[24px] pt-[24px] mix-blend-difference md:px-[40px]"
      )}
    >
      <div className="mx-auto flex w-full max-w-custom items-start justify-between gap-6">
        <Link href="/" className="pointer-events-auto block">
          <div className="relative h-[44px] w-[104px] md:h-[70px] md:w-[166px]">
            <Logo src={logoUrl} color="white" className="h-full w-full" />
          </div>
        </Link>

        <nav className="pointer-events-auto flex items-start gap-[16px] md:gap-[24px]">
          <Link
            href="/projects"
            className={clsx(
              "text-[16px] leading-none tracking-[-0.02em] text-white transition-opacity hover:opacity-50 md:text-[20px]",
              isProjects ? "font-medium" : "font-normal"
            )}
          >
            Projects
          </Link>
          <Link
            href="/info"
            className={clsx(
              "text-[16px] leading-none tracking-[-0.02em] text-white transition-opacity hover:opacity-50 md:text-[20px]",
              isInfo ? "font-medium" : "font-normal"
            )}
          >
            About
          </Link>
          <Link
            href="/contact"
            className={clsx(
              "text-[16px] leading-none tracking-[-0.02em] text-white transition-opacity hover:opacity-50 md:text-[20px]",
              isContact ? "font-medium" : "font-normal"
            )}
          >
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}