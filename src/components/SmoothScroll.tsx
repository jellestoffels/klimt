"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import { usePathname } from "next/navigation";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // FIX: Disable smooth scroll entirely on Studio pages
  const isStudio = pathname?.startsWith("/studio");

  useEffect(() => {
    // If we are in the studio, do not initialize Lenis
    if (isStudio) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => 1 - Math.pow(1 - t, 3), // cubic-out
      wheelMultiplier: 0.9,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [isStudio]); // Re-run effect if we leave/enter studio

  // [Section 8.2] Reset scroll on route change (only for non-studio pages)
  useEffect(() => {
    if (!isStudio) {
      window.scrollTo(0, 0);
    }
  }, [pathname, isStudio]);

  return <>{children}</>;
}