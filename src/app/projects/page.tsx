import { client } from "@/sanity/client";
import Link from "next/link";
import Image from "next/image";

export const revalidate = 60;

export default async function Projects() {
  // Fetch projectsLabel from settings
  const data = await client.fetch(`{
    "projects": *[_type == "project"]|order(year desc){
      _id, title, slug, year, "imageUrl": thumbnail.asset->url, "role": meta.role
    },
    "settings": *[_type == "settings"][0]{ projectsLabel }
  }`);

  const { projects, settings } = data;

  return (
    <main className="min-h-screen bg-black text-white px-padMobile md:px-padTablet lg:px-padDesktop pb-sectionDesktop pt-headerDesktop">
      
      {/* Dynamic Label */}
      <div className="mt-sectionDesktop md:mt-[48px] mobile:mt-[40px] mb-[48px] flex items-start">
        <span className="text-[16px] leading-[1.35]">
          {settings?.projectsLabel || "Selected Projects"}
        </span>
        <sup className="text-[11px] text-grey ml-[6px] top-[-6px] relative">{projects.length}</sup>
      </div>
      
      {/* Grid ... (Keep existing grid code) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-[24px] md:gap-[20px] mobile:gap-[24px]">
        {projects.map((p: any, index: number) => {
          const isFeature = index % 3 === 0;
          const colSpan = isFeature ? "md:col-span-6" : "md:col-span-3";

          return (
            <Link 
              key={p._id} 
              href={`/projects/${p.slug.current}`}
              className={`group flex flex-col ${colSpan} mb-[24px] md:mb-0`}
            >
              <div className="relative w-full aspect-video bg-[#1a1a1a] overflow-hidden">
                {p.imageUrl && (
                  <Image 
                    src={p.imageUrl} 
                    fill 
                    alt={p.title}
                    className="object-cover transition-all duration-120 group-hover:brightness-92"
                    sizes={isFeature ? "50vw" : "25vw"}
                  />
                )}
              </div>
              <div className="mt-[10px] flex flex-col items-start">
                <span className="text-[14px] text-white font-medium group-hover:underline decoration-1 underline-offset-2">
                  {p.title}
                </span>
                <span className="text-[13px] text-grey mt-1">
                  {p.role || "Design"}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}