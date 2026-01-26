import { client } from "@/sanity/client";
import Link from "next/link";
import Image from "next/image";

export const revalidate = 60;

export default async function Home() {
  const settings = await client.fetch(`*[_type == "settings"][0]`);
  // Fetch 3 latest projects with images
  const latestProjects = await client.fetch(`
    *[_type == "project" && defined(thumbnail.asset)]|order(year desc)[0...3]{
      _id, title, slug, "imageUrl": thumbnail.asset->url
    }
  `);

  return (
    <main className="min-h-screen flex flex-col justify-center px-5 md:px-8 lg:px-12 pb-s9 pt-[120px] md:pt-[160px]">
      <div className="w-full max-w-[1200px] mx-auto">
        
        {/* 1. Intro Block (Left Aligned) */}
        <div className="max-w-[720px] mb-s10">
          <div className="mb-s6 md:mb-s7 w-[clamp(180px,22vw,340px)]">
             <div className="w-full aspect-[3/1] bg-ink flex items-center justify-center text-paper font-bold tracking-widest text-lg">
               KLIMT
             </div> 
          </div>

          <p className="text-[16px] md:text-[18px] leading-[1.45] max-w-[58ch] mb-s7">
            {settings?.description || "Klimt Studio is a design practice focused on digital experiences."}
          </p>

          <div className="flex flex-col md:flex-row gap-s3 md:gap-[20px]">
            <Link href="/projects" className="text-ink hover:underline decoration-1 underline-offset-[3px]">View Projects</Link>
            <Link href="/contact" className="text-ink hover:underline decoration-1 underline-offset-[3px]">Contact</Link>
          </div>
        </div>

        {/* 2. FIX 2: Latest Projects Grid (Visual Interest) */}
        {latestProjects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-borderSubtle">
            {latestProjects.map((project: any) => (
              <Link 
                key={project._id} 
                href={`/projects/${project.slug.current}`}
                className="group relative block aspect-[4/3] bg-black/5 rounded-medium overflow-hidden"
              >
                {project.imageUrl && (
                  <Image 
                    src={project.imageUrl} 
                    fill 
                    alt={project.title}
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                <span className="absolute bottom-4 left-4 bg-paper/90 px-3 py-1 rounded-small text-smallMeta opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {project.title}
                </span>
              </Link>
            ))}
          </div>
        )}

      </div>
    </main>
  );
}