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

      {/* Projects List Container */}
      <div className="mb-s10 border-t border-borderSubtle">
        {projects.map((p) => (
          <Link 
            href={`/projects/${p.id}`} 
            key={p.id} 
            className="group block"
            // Set hover state on mouse enter/leave for the preview panel
            onMouseEnter={() => setHoveredProject(p)}
            onMouseLeave={() => setHoveredProject(null)}
          >
            {/* Row Layout */}
            <div className="grid grid-cols-1 tablet:grid-cols-12 py-s4 border-b border-borderSubtle transition-colors duration-120 hover:bg-black/5 items-baseline min-h-[72px] tablet:h-[84px]">
              
              {/* Title Column */}
              <div className="col-span-1 tablet:col-span-7 flex justify-between tablet:block">
                <h3 className="text-h3 group-hover:underline transition-all duration-120">{p.title}</h3>
                {/* Mobile Year shows right of title */}
                <span className="tablet:hidden text-smallMeta text-grey">{p.year}</span>
              </div>

              {/* Tags Column */}
              <div className="col-span-1 tablet:col-span-3 text-smallMeta text-grey mt-1 tablet:mt-0">
                {p.tags}
              </div>

              {/* Desktop Year Column */}
              <div className="hidden tablet:col-span-2 tablet:block text-smallMeta text-grey text-right">
                {p.year}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Preview Panel (Desktop Only) */}
      <AnimatePresence>
        {hoveredProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.14 }} 
            className="hidden tablet:block fixed z-40 bg-paper overflow-hidden border border-borderSubtle"
            style={{
                width: '360px',
                height: '240px',
                borderRadius: '14px',
                top: '88px', // Header (64px) + 24px
                right: 'var(--preview-offset, 32px)', // Matches container padding
            }}
          >
            {/* CSS variable for responsive right offset */}
            <style jsx>{`
              @media (min-width: 1200px) {
                div { --preview-offset: 48px; }
              }
            `}</style>

            <img 
              src={hoveredProject.img} 
              alt={hoveredProject.title}
              className="w-full h-full object-cover" 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}