import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Mock data with images for the preview
const projects = [
  { id: 1, title: "Apex Architecture", tags: "Identity, Web", year: "2025", img: "https://placehold.co/600x400/1a1a1a/FFF" },
  { id: 2, title: "Mono Light", tags: "Product", year: "2024", img: "https://placehold.co/600x400/333333/FFF" },
  { id: 3, title: "Forma 22", tags: "Editorial", year: "2024", img: "https://placehold.co/600x400/555555/FFF" },
  { id: 4, title: "Klimt Systems", tags: "Design System", year: "2023", img: "https://placehold.co/600x400/000000/FFF" },
];

export default function Projects() {
  const [hoveredProject, setHoveredProject] = useState(null);

  return (
    <div className="pt-s7 tablet:pt-s8 desktop:pt-s9 relative">
      <h2 className="text-h2 mb-s7">Selected Works</h2>

      [cite_start]{/* Projects List Container [cite: 146] */}
      <div className="mb-s10 border-t border-borderSubtle">
        {projects.map((p) => (
          <Link 
            href={`/projects/${p.id}`} 
            key={p.id} 
            className="group block"
            // Set hover state on mouse enter/leave
            onMouseEnter={() => setHoveredProject(p)}
            onMouseLeave={() => setHoveredProject(null)}
          >
            [cite_start]{/* Row Layout [cite: 149, 153, 155] */}
            <div className="grid grid-cols-1 tablet:grid-cols-12 py-s4 border-b border-borderSubtle transition-colors duration-120 hover:bg-black/5 items-baseline min-h-[72px] tablet:h-[84px]">
              
              [cite_start]{/* Title Column [cite: 157] */}
              <div className="col-span-1 tablet:col-span-7 flex justify-between tablet:block">
                [cite_start]<h3 className="text-h3 group-hover:underline transition-all duration-120">{p.title}</h3> {/* [cite: 169] */}
                {/* Mobile Year */}
                <span className="tablet:hidden text-smallMeta text-grey">{p.year}</span>
              </div>

              [cite_start]{/* Tags Column [cite: 158] */}
              <div className="col-span-1 tablet:col-span-3 text-smallMeta text-grey mt-1 tablet:mt-0">
                {p.tags}
              </div>

              [cite_start]{/* Desktop Year Column [cite: 159] */}
              <div className="hidden tablet:col-span-2 tablet:block text-smallMeta text-grey text-right">
                {p.year}
              </div>
            </div>
          </Link>
        ))}
      </div>

      [cite_start]{/* Preview Panel (Desktop Only) [cite: 172]
         Fixed position, appearing on hover.
      */}
      <AnimatePresence>
        {hoveredProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            [cite_start]transition={{ duration: 0.14 }} // Fade in 140ms [cite: 184]
            className="hidden tablet:block fixed z-40 bg-paper overflow-hidden border border-borderSubtle"
            style={{
                [cite_start]// Dimensions: 360x240 [cite: 178, 179]
                width: '360px',
                height: '240px',
                [cite_start]// Radius: Medium (14px) [cite: 180]
                borderRadius: '14px',
                [cite_start]// Top offset: Header (64px) + 24px = 88px [cite: 177]
                top: '88px',
                [cite_start]// Right offset matches container padding (32px tablet, 48px desktop) [cite: 176]
                // We use Tailwind arbitrary values to match the responsive padding
                right: 'var(--preview-offset, 32px)', 
            }}
          >
            {/* Dynamic style for responsive right offset */}
            <style jsx>{`
              @media (min-width: 1200px) {
                div { --preview-offset: 48px; }
              }
            `}</style>

            [cite_start]{/* Image Swap [cite: 186] */}
            <img 
              src={hoveredProject.img} 
              alt={hoveredProject.title}
              [cite_start]className="w-full h-full object-cover" // [cite: 102]
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}