import { client } from "@/sanity/client";
import Image from "next/image";
import Link from "next/link";

// 1. Fetch logic
async function getProject(slug: string) {
  return client.fetch(
    `*[_type == "project" && slug.current == $slug][0]{
      title, year, meta, summary,
      gallery[]{
        _type, _key, caption,
        // Image fields
        _type == 'image' => {
          asset->{url, metadata {dimensions}}
        },
        // Video fields (new)
        _type == 'file' => {
          asset->{url}
        },
        // Text fields
        _type == 'textSection' => {
           heading, body
        }
      },
      "nextProject": *[_type == "project" && year <= ^.year && _id != ^._id] | order(year desc)[0] {
        title, slug
      }
    }`,
    { slug }
  );
}

// 2. Page Component
export default async function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  // FIX 3A: Await params (Required for Next.js 15/16)
  const { slug } = await params;
  
  const project = await getProject(slug);
  if (!project) return <div className="p-12">Project not found</div>;

  return (
    <main className="max-w-container mx-auto px-5 md:px-8 lg:px-12 pt-[calc(56px+48px)] md:pt-[calc(64px+96px)]">
      
      {/* Header */}
      <div className="mb-s8">
        <h1 className="text-[clamp(44px,5vw,72px)] leading-[1.02] tracking-[-0.02em] font-medium max-w-[18ch] mb-s5">
          {project.title}
        </h1>

        {/* Meta Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 md:gap-x-s4 mb-s8">
          <div className="flex flex-col gap-s4">
            {project.meta?.role && <div><span className="block text-smallMeta uppercase tracking-[0.06em]">Role</span><span>{project.meta.role}</span></div>}
            {project.meta?.disciplines && <div><span className="block text-smallMeta uppercase tracking-[0.06em]">Disciplines</span><span>{project.meta.disciplines}</span></div>}
          </div>
          <div className="flex flex-col gap-s4">
             {project.meta?.client && <div><span className="block text-smallMeta uppercase tracking-[0.06em]">Client</span><span>{project.meta.client}</span></div>}
             {project.year && <div><span className="block text-smallMeta uppercase tracking-[0.06em]">Year</span><span>{project.year}</span></div>}
          </div>
        </div>

        {/* Summary */}
        {project.summary && <div className="text-[18px] leading-[1.45] max-w-[60ch]"><p>{project.summary}</p></div>}
      </div>

      {/* Gallery Loop */}
      <div className="flex flex-col gap-s7 md:gap-s8 mb-s10">
        {project.gallery?.map((item: any) => {
          
          // Case 1: Text Section
          if (item._type === "textSection") {
             return (
               <div key={item._key} className="py-s4 md:py-s6">
                  {item.heading && <h3 className="text-[22px] font-medium mb-3">{item.heading}</h3>}
                  <p className="max-w-[68ch] leading-relaxed">{item.body}</p>
               </div>
             )
          }

          // Case 2: Video (FIX 3B: Added handling for videos)
          if (item._type === "file") {
            return (
              <div key={item._key} className="w-full">
                <video 
                  src={item.asset?.url} 
                  controls 
                  className="w-full h-auto rounded-medium bg-black/5"
                  playsInline
                />
                {item.caption && <p className="mt-s3 text-smallMeta text-grey">{item.caption}</p>}
              </div>
            )
          }

          // Case 3: Image (FIX 3C: Safe access to dimensions)
          if (item._type === "image" && item.asset?.url) {
            return (
              <div key={item._key} className="w-full">
                 <div className="relative w-full bg-black/5 rounded-medium overflow-hidden">
                    <Image 
                      src={item.asset.url} 
                      alt={item.caption || ""} 
                      width={item.asset.metadata?.dimensions?.width || 1200} 
                      height={item.asset.metadata?.dimensions?.height || 800}
                      className="w-full h-auto"
                      sizes="100vw"
                    />
                 </div>
                 {item.caption && <p className="mt-s3 text-smallMeta text-grey max-w-[72ch]">{item.caption}</p>}
              </div>
            );
          }
          
          return null;
        })}
      </div>

      {/* Bottom Nav */}
      <div className="border-t border-borderSubtle pt-s7 pb-s9 mt-s10 flex flex-col md:flex-row justify-between gap-s4">
        <Link href="/projects" className="font-medium hover:underline">← Back to Projects</Link>
        {project.nextProject && (
          <Link href={`/projects/${project.nextProject.slug.current}`} className="font-medium hover:underline text-right">
            Next: {project.nextProject.title} →
          </Link>
        )}
      </div>
    </main>
  );
}