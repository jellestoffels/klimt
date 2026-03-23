"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { client } from "@/sanity/client";

const TRANSITION_DURATION = 600;
const STORAGE_KEY = "klimt-transition-origin";

type Direction = "top" | "bottom";
type Phase = "entering" | "idle" | "leaving";

function getRandomDirection(): Direction {
  return Math.random() > 0.5 ? "top" : "bottom";
}

function getRevealOrigin(direction: Direction): Direction {
  return direction === "top" ? "bottom" : "top";
}

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isStudio = pathname?.startsWith("/studio");
  const navigationLockRef = useRef(false);
  const [phase, setPhase] = useState<Phase>("entering");
  const [origin, setOrigin] = useState<Direction>("top");
  const [logoUrl, setLogoUrl] = useState<string | null>(null);

  useEffect(() => {
    if (isStudio) {
      return;
    }

    const fetchLogo = async () => {
      const data = await client.fetch(
        `*[_type == "settings"][0]{"logoUrl": coalesce(transitionLogo.asset->url, headerLogo.asset->url)}`
      );
      if (data?.logoUrl) {
        setLogoUrl(data.logoUrl);
      }
    };

    fetchLogo();
  }, [isStudio]);

  useEffect(() => {
    if (isStudio) {
      return;
    }

    navigationLockRef.current = false;
    const storedDirection = window.sessionStorage.getItem(STORAGE_KEY);
    const exitOrigin = storedDirection === "top" || storedDirection === "bottom" ? storedDirection : getRandomDirection();
    const revealOrigin = getRevealOrigin(exitOrigin);

    const frame = window.requestAnimationFrame(() => {
      setOrigin(revealOrigin);
      setPhase("entering");

      window.requestAnimationFrame(() => {
        setPhase("idle");
      });
    });

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, [pathname, isStudio]);

  useEffect(() => {
    if (isStudio) {
      return;
    }

    const handleAnchorClick = (event: MouseEvent) => {
      if (navigationLockRef.current) {
        return;
      }

      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }

      const target = event.target instanceof Element ? event.target.closest("a") : null;
      if (!(target instanceof HTMLAnchorElement)) {
        return;
      }

      const href = target.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("javascript:")) {
        return;
      }

      if (target.target && target.target !== "_self") {
        return;
      }

      const nextUrl = new URL(target.href, window.location.href);
      if (nextUrl.origin !== window.location.origin) {
        return;
      }

      const currentUrl = new URL(window.location.href);
      if (
        nextUrl.pathname === currentUrl.pathname &&
        nextUrl.search === currentUrl.search &&
        nextUrl.hash === currentUrl.hash
      ) {
        return;
      }

      event.preventDefault();
      navigationLockRef.current = true;

      const nextOrigin = getRandomDirection();
      window.sessionStorage.setItem(STORAGE_KEY, nextOrigin);
      setOrigin(nextOrigin);
      setPhase("leaving");

      window.setTimeout(() => {
        window.location.href = nextUrl.toString();
      }, TRANSITION_DURATION);
    };

    document.addEventListener("click", handleAnchorClick, true);
    return () => {
      document.removeEventListener("click", handleAnchorClick, true);
    };
  }, [isStudio]);

  if (isStudio) {
    return <>{children}</>;
  }

  const overlayTransform = phase === "idle" ? "scaleY(0)" : "scaleY(1)";

  return (
    <div className="min-h-screen w-full">
      {children}

      <div
        aria-hidden="true"
        className="page-transition-overlay fixed inset-0 z-[9999] flex items-center justify-center bg-black"
        style={{
          transform: overlayTransform,
          transformOrigin: origin,
        }}
      >
        <div className="pointer-events-none flex h-24 w-24 items-center justify-center md:h-32 md:w-32">
          {logoUrl ? (
            <div className="relative h-full w-full">
              <Image src={logoUrl} alt="Transition Logo" fill className="object-contain invert brightness-0" priority />
            </div>
          ) : (
            <div className="grid h-14 w-14 grid-cols-2 gap-2 rotate-45 md:h-20 md:w-20 md:gap-3">
              <span className="rounded-[2px] bg-white" />
              <span className="rounded-[2px] bg-white" />
              <span className="rounded-[2px] bg-white" />
              <span className="rounded-[2px] bg-white" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}