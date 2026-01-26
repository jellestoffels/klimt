import { client } from "@/sanity/client";
import Image from "next/image";
import Link from "next/link";

async function getProject(slug: string) {
  return client.fetch(
    `*[_type == "project" && slug.current == $slug][0]{
      title, year, meta, summary,
      gallery[]{
        _type, _key, caption,
        asset->{url, metadata {dimensions}}
      }
    }`,
    { slug }
  );
}

export default async function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return <div>Not Found</div>;

  return (
    <main className="bg-white min-h-screen">
      
      {/* [Section 6.2] Hero Media */}
      {/* Height: 100vh - header (64px) */}
      <section className="relative w-full h-[calc(100vh-56px)] lg:h-[calc(100vh-64px)] mt-[56px] lg:mt-[64px] px-padMobile md:px-padTablet lg:px-padDesktop pb-[24px]">
        <div className="relative w-full h-full rounded-page overflow-hidden bg-gray-100">
           {/* Use first gallery image as hero fallback if no dedicated hero field */}
           {project.gallery?.[0]?.asset?.url && (
             <Image 
               src={project.gallery[0].asset.url}
               fill
               alt="Hero"
               className="object-cover"
               priority
             />
           )}
           
           {/* [Section 6.3] Docked Info Panel */}
           <div className="absolute bottom-0 left-0 w-full bg-white border-t border-black/12 flex flex-col md:flex-row h-[240px] md:h-[220px] p-[24px]">
             
             {/* Left: Meta Table [Section 6.4] */}
             <div className="w-full md:w-[420px] shrink-0 border-r-0 md:border-r border-black/0 pr-0 md:pr-[24px]">
               <div className="flex flex-col">
                 <MetaRow label="Client" value={project.meta?.client} />
                 <MetaRow label="Year" value={project.year} />
                 <MetaRow label="Role" value={project.meta?.role} />
                 <MetaRow label="Discipline" value={project.meta?.disciplines} />
               </div>
             </div>

             {/* Right: Intro Text [Section 6.5] */}
             <div className="mt-4 md:mt-0 md:pl-[48px] flex items-center">
               <h1 className="text-introMobile md:text-introTablet lg:text-introDesktop leading-[0.95] tracking-tighter text-black max-w-[820px]">
                 {project.title}
               </h1>
             </div>
           </div>
        </div>
      </section>

      {/* [Section 6.6] Gallery */}
      <section className="pt-[96px] lg:pt-[160px] px-padMobile md:px-padTablet lg:px-padDesktop pb-sectionDesktop">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px] md:gap-[20px] lg:gap-[24px]">
           {project.gallery?.slice(1).map((item: any) => (
             <div key={item._key} className="w-full">
               <div className="relative w-full aspect-[4/3] bg-gray-50">
                  {item.asset && (
                    <Image 
                      src={item.asset.url} 
                      alt="" 
                      fill 
                      className="object-cover"
                    />
                  )}
               </div>
               {item.caption && <p className="text-label text-grey mt-2">{item.caption}</p>}
             </div>
           ))}
        </div>
      </section>

    </main>
  );
}

function MetaRow({ label, value }: { label: string, value: string }) {
  if (!value) return null;
  return (
    <div className="flex border-b border-black/12 py-[10px] px-[12px]">
      <span className="w-[120px] text-label text-black shrink-0">{label}</span>
      <span className="text-label text-black">{value}</span>
    </div>
  )
}