"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import clsx from "clsx";
import Logo from "@/components/Logo";
import { client } from "@/sanity/client"; // Import client

// Define the shape of the settings we need
interface HeaderSettings {
  logoUrl: string | null;
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [logoUrl, setLogoUrl] = useState<string | null>(null); // State for logo
  const pathname = usePathname();

  // Fetch Logo on mount
  useEffect(() => {
    const fetchSettings = async () => {
      const data = await client.fetch(`*[_type == "settings"][0]{ "logoUrl": headerLogo.asset->url }`);
      if (data?.logoUrl) setLogoUrl(data.logoUrl);
    };
    fetchSettings();

    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Color Logic
  const isDarkMode = pathname === "/projects";
  const textColor = isDarkMode ? "text-white" : "text-black";
  const logoColor = isDarkMode ? "white" : "black"; // Pass this to Logo component

  // Scroll BG Logic
  let scrollBg = "bg-transparent";
  if (scrolled) {
    if (pathname === "/projects") scrollBg = "bg-black/92";
    else if (pathname === "/contact") scrollBg = "bg-[#9C9C9C]/92";
    else scrollBg = "bg-white/92";
  }

  const linkClass = (path: string) =>
    clsx(
      "text-nav font-medium transition-all duration-200 relative",
      textColor,
      pathname === path 
        ? `after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[1px] after:bg-current after:-mb-[3px]`
        : "hover:underline hover:decoration-1 hover:underline-offset-[3px] opacity-70 hover:opacity-100"
    );

  return (
    <header
      className={clsx(
        "fixed top-0 left-0 w-full z-50 transition-colors duration-300",
        "h-headerMobile lg:h-headerDesktop",
        "px-padMobile md:px-padTablet lg:px-padDesktop",
        scrollBg
      )}
    >
      <div className="w-full h-full flex items-center justify-between">
        <Link href="/" className="block w-[120px] md:w-[140px] h-[30px] md:h-[40px] relative">
          {/* Pass the dynamic URL and Color */}
          <Logo src={logoUrl} color={logoColor} className="w-full h-full" />
        </Link>
        
        <nav className="flex gap-[16px] md:gap-[24px]">
          <Link href="/projects" className={linkClass("/projects")}>Projects</Link>
          <Link href="/contact" className={linkClass("/contact")}>Contact</Link>
        </nav>
      </div>
    </header>
  );
}