"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import clsx from "clsx";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // [cite: 77] After 8px scroll, background becomes paper
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isContact = pathname === "/contact";
  
  // [cite: 79] Active link uses grey
  const linkClass = (path: string) =>
    clsx(
      "text-nav font-medium transition-colors duration-200",
      pathname === path ? "text-grey" : "text-ink hover:underline decoration-1 underline-offset-[3px]"
    );

  return (
    <header
      className={clsx(
        "fixed top-0 left-0 w-full z-50 flex items-center justify-between px-5 md:px-8 lg:px-12 transition-all duration-300",
        // [cite: 71] Height 56px mobile, 64px desktop
        "h-headerMobile md:h-headerDesktop",
        // [cite: 309-310] Contact header transparency rules
        scrolled
          ? isContact 
            ? "bg-overlayGrey border-b border-borderSubtle backdrop-blur-sm"
            : "bg-paper/95 border-b border-borderSubtle"
          : "bg-transparent"
      )}
    >
      <Link href="/" className="font-medium text-nav text-ink uppercase tracking-wide">
        Klimt Studio
      </Link>
      
      <nav className="flex gap-4 md:gap-6">
        <Link href="/projects" className={linkClass("/projects")}>Projects</Link>
        <Link href="/info" className={linkClass("/info")}>Info</Link>
        <Link href="/contact" className={linkClass("/contact")}>Contact</Link>
      </nav>
    </header>
  );
}