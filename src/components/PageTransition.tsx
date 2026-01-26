"use client";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // FIX 1: Disable animation completely for Studio routes
  if (pathname?.startsWith("/studio")) {
    return <>{children}</>;
  }

  const isContact = pathname === "/contact";
  const overlayColor = isContact ? "bg-overlayGrey" : "bg-overlayInk";

  return (
    <AnimatePresence mode="wait">
      <motion.div key={pathname} className="min-h-screen w-full">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.32, ease: [0.2, 0.8, 0.2, 1] }}
        >
          {children}
        </motion.div>

        <motion.div
          className={clsx("fixed inset-0 z-[100] pointer-events-none", overlayColor)}
          initial={{ scaleY: 0, transformOrigin: "bottom" }}
          animate={{ scaleY: 0 }}
          exit={{ scaleY: 1, transition: { duration: 0.42, ease: [0.2, 0.8, 0.2, 1] } }} 
        />
        <motion.div
          className={clsx("fixed inset-0 z-[100] pointer-events-none", overlayColor)}
          initial={{ scaleY: 1, transformOrigin: "top" }}
          animate={{ scaleY: 0, transition: { delay: 0.42, duration: 0.28, ease: [0.2, 0.8, 0.2, 1] } }} 
        />
      </motion.div>
    </AnimatePresence>
  );
}