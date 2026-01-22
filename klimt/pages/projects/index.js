import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { client, urlFor } from '../../lib/sanity';

export default function Projects({ projects }) {
  const [hoveredProject, setHoveredProject] = useState(null);

  return (
    <div className="pt-s7 tablet:pt-s8 desktop:pt-s9 relative">
      <h2 className="text-h2 mb-s7">Selected Works</h2>

      {/* Projects List Container */}
      <div className="mb-s10 border-t border-borderSubtle">
        {projects.map((p) => (
          <Link 
            href={`/projects/${p.slug.current}`} 
            key={p._id} 
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
        {hoveredProject && hoveredProject.mainImage && (
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
                top: '88px',
                right: 'var(--preview-offset, 32px)',
            }}
          >
            <style jsx>{`
              @media (min-width: 1200px) {
                div { --preview-offset: 48px; }
              }
            `}</style>

            <img 
              src={urlFor(hoveredProject.mainImage).width(600).height(400).url()} 
              alt={hoveredProject.title}
              className="w-full h-full object-cover" 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Fetch data from Sanity
export async function getStaticProps() {
  const projects = await client.fetch(`*[_type == "project"] | order(year desc)`);

  return {
    props: {
      projects,
    },
    // Re-generate the page every 10 seconds if new data exists
    revalidate: 10, 
  };
}