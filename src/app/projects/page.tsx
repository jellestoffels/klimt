import { client } from "@/sanity/client";
import ProjectRow from "@/components/ProjectRow";

export const revalidate = 60; // Revalidate every 60 seconds

export default async function Projects() {
  const projects = await client.fetch(`*[_type == "project"]|order(year desc){
    _id, title, slug, year, tags, "imageUrl": thumbnail.asset->url
  }`);

  return (
    <main className="pt-[calc(56px+48px)] md:pt-[calc(64px+64px)] px-5 md:px-8 lg:px-12 max-w-container mx-auto">
      {/* Title [cite: 143] */}
      <h2 className="text-[clamp(32px,3.2vw,48px)] leading-[1.08] font-medium tracking-[-0.015em] mb-s7">
        Selected Works
      </h2>
      
      {/* Projects List [cite: 153] */}
      <div className="border-t border-borderSubtle mb-s10">
        {projects.map((p: any) => (
          <ProjectRow key={p._id} project={p} />
        ))}
      </div>
    </main>
  );
}