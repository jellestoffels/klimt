"use client";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isContact = pathname === "/contact";

  // [cite: 92-95] Overlay color logic
  const overlayColor = isContact ? "bg-overlayGrey" : "bg-overlayInk";

  return (
    <AnimatePresence mode="wait">
      <motion.div key={pathname} className="min-h-screen w-full">
        {/* Page Content Animation */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.32, ease: [0.2, 0.8, 0.2, 1] }} // [cite: 85, 87]
        >
          {children}
        </motion.div>

        {/* Overlay Block (The Wipe Effect) */}
        <motion.div
          className={clsx("fixed inset-0 z-[100] pointer-events-none", overlayColor)}
          initial={{ scaleY: 0, transformOrigin: "bottom" }}
          animate={{ scaleY: 0 }}
          exit={{ 
            scaleY: 1, 
            transition: { duration: 0.42, ease: [0.2, 0.8, 0.2, 1] } // [cite: 89] Expands bottom to top
          }} 
        />
        <motion.div
          className={clsx("fixed inset-0 z-[100] pointer-events-none", overlayColor)}
          initial={{ scaleY: 1, transformOrigin: "top" }}
          animate={{ 
            scaleY: 0, 
            transition: { delay: 0.42, duration: 0.28, ease: [0.2, 0.8, 0.2, 1] } // [cite: 91] Retracts top to bottom
          }} 
        />
      </motion.div>
    </AnimatePresence>
  );
}