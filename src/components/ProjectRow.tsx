"use client";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

export default function ProjectRow({ project }: { project: any }) {
  const [hovered, setHovered] = useState(false);

  return (
    <>
      <Link
        href={`/projects/${project.slug.current}`}
        className="group relative grid grid-cols-1 md:grid-cols-12 py-s4 border-b border-borderSubtle hover:bg-black/5 transition-colors duration-120" // [cite: 153, 168]
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Title [cite: 157] */}
        <div className="col-span-1 md:col-span-7 flex justify-between md:block">
          <h3 className="text-[22px] md:text-[28px] font-medium group-hover:underline">{project.title}</h3>
          <span className="md:hidden text-smallMeta text-grey">{project.year}</span>
        </div>

        {/* Tags [cite: 158] */}
        <div className="col-span-1 md:col-span-3 text-smallMeta text-grey flex items-center">
          {project.tags?.join(", ")}
        </div>

        {/* Year Desktop [cite: 159] */}
        <div className="hidden md:flex col-span-2 justify-end text-smallMeta text-grey items-center">
          {project.year}
        </div>
      </Link>

      {/* Desktop Preview Panel [cite: 172-182] */}
      {hovered && project.imageUrl && (
        <div 
          className="hidden md:block fixed z-40 bg-paper border border-borderSubtle rounded-medium overflow-hidden pointer-events-none"
          style={{
            width: "360px", 
            height: "240px", 
            top: "88px", // Header (64) + 24px offset
            right: "48px" // Matches container padding
          }}
        >
          <Image src={project.imageUrl} fill className="object-cover" alt="" priority />
        </div>
      )}
    </>
  );
}