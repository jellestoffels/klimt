"use client";
import { useEffect, useState } from "react";
import clsx from "clsx";

export default function Footer({ color = "black" }: { color?: "black" | "white" }) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const ams = now.toLocaleTimeString("en-GB", { timeZone: "Europe/Amsterdam", hour: '2-digit', minute: '2-digit' });
      const la = now.toLocaleTimeString("en-GB", { timeZone: "America/Los_Angeles", hour: '2-digit', minute: '2-digit' });
      setTime(`AMS. ${ams}  —  LA. ${la}`);
    };
    
    updateTime(); 
    const interval = setInterval(updateTime, 1000 * 60); 
    return () => clearInterval(interval);
  }, []);

  const textClass = color === "white" ? "text-white" : "text-black";
  const borderClass = color === "white" ? "border-white/20" : "border-black/20";

  return (
    // Added laptop:px-[16px] to match the rest of the site
    <footer className={clsx("w-full px-4 laptop:px-[16px] pb-8 pt-12", textClass)}>
      <div className={clsx("max-w-custom mx-auto border-t pt-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-8", borderClass)}>
        
        <div className="flex flex-col">
          <h2 className="text-[clamp(40px,5vw,80px)] font-bold leading-[0.8] tracking-tighter opacity-100">
            KLIMT
          </h2>
          <span className="text-[12px] opacity-50 mt-2">© 2026, Klimt Studio.</span>
        </div>

        <div className="max-w-[300px] text-[11px] opacity-60 leading-relaxed hidden md:block">
          Klimt Studio B.V. This website and all of its content, including all text, 
          graphics, video, and photos, are the copyrighted works of Klimt Studio 
          and/or various third parties.
        </div>

        <div className="flex flex-col text-right items-end gap-1">
          <a href="#" className="text-[14px] font-medium hover:opacity-50 transition-opacity">Linkedin</a>
          <a href="#" className="text-[14px] font-medium hover:opacity-50 transition-opacity">Instagram</a>
          <div className="h-4" /> 
          <span className="text-[14px] font-medium uppercase tracking-widest tabular-nums">
             {time || "AMS 00:00 — LA 00:00"}
          </span>
        </div>

      </div>
    </footer>
  );
}