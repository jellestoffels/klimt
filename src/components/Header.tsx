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
  // The Info page in the reference (Red BG) typically uses Black text, or White if dark.
  // Assuming Info is White/Grey BG -> Black Text. 
  
  const textColor = isProjects ? "text-white" : "text-black";
  const logoColor = isProjects ? "white" : "black";

  return (
    <header
      className={clsx(
        "fixed top-0 left-0 w-full z-50 transition-colors duration-300",
        "h-[48px] md:h-[64px]", // Slightly taller for better touch targets
        "px-4 laptop:px-[16px]",
        // BG Logic: Black on Projects, Transparent mix on others
        isProjects ? "bg-black" : "bg-transparent"
      )}
    >
      {/* GRID LAYOUT: 4 Columns to spread items evenly */}
      <div className="w-full h-full grid grid-cols-4 items-center max-w-custom mx-auto border-b border-transparent">
        
        {/* COL 1: Logo (Left Aligned) */}
        <div className="flex items-center justify-start">
          <Link href="/" className="block relative w-[100px] md:w-[140px] h-[30px]">
            <Logo src={logoUrl} color={logoColor} className="w-full h-full object-contain object-left" />
          </Link>
        </div>

        {/* COL 2: Projects (Center-Left Aligned) */}
        <div className="flex items-center justify-start md:justify-center">
          <Link href="/projects" className={clsx("text-[14px] font-medium tracking-tight hover:opacity-50 transition-opacity", textColor)}>
            Projects
          </Link>
        </div>

        {/* COL 3: Info (Center-Right Aligned) */}
        <div className="flex items-center justify-end md:justify-center">
          <Link href="/info" className={clsx("text-[14px] font-medium tracking-tight hover:opacity-50 transition-opacity", textColor)}>
            Info
          </Link>
        </div>

        {/* COL 4: Contact (Right Aligned) */}
        <div className="flex items-center justify-end">
          <Link href="/contact" className={clsx("text-[14px] font-medium tracking-tight hover:opacity-50 transition-opacity", textColor)}>
            Contact
          </Link>
        </div>

      </div>
    </header>
  );
}