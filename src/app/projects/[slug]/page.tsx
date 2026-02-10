import { client } from "@/sanity/client";
import Image from "next/image";
import Link from "next/link";

async function getProject(slug: string) {
  return client.fetch(
    `*[_type == "project" && slug.current == $slug][0]{
      title, year, meta, intro, coverImage,
      "coverUrl": coverImage.asset->url,
      gallery[]{
        _type, _key, caption, layout, content,
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
    <main className="min-h-screen bg-white pt-[60px] pb-[100px]">
      <div className="max-w-[1123px] mx-auto px-0">
        
        {/* Meta Section */}
        <div className="flex justify-between mb-[60px]"> {/* Define spacing here */}
          <div className="flex gap-12">
            <div>
              <span className="block text-[16px] font-medium opacity-50">Client</span>
              <span className="block text-[16px] font-medium">{project.meta?.client}</span>
            </div>
            <div>
              <span className="block text-[16px] font-medium opacity-50">Year</span>
              <span className="block text-[16px] font-medium">{project.year}</span>
            </div>
          </div>
        </div>

        {/* [Req Project Description] 
            Font: Neue Haas Unica Pro Heavy, 40px
            Spacing: Distance to Cover Image must match spacing to Meta (mb-[60px])
        */}
        <div className="mb-[60px]">
          <h1 className="font-heavy font-black text-[40px] leading-tight tracking-[-0.02em] max-w-[800px]">
            {project.intro || project.title}
          </h1>
        </div>

        {/* [Req Cover Image] 
            Full Width (1123px), No Crop, 0px Radius
        */}
        {project.coverUrl && (
          <div className="w-full mb-[60px]">
            <img 
              src={project.coverUrl} 
              alt="Cover"
              className="w-full h-auto object-contain rounded-none" // [Req 0px Radius]
            />
          </div>
        )}

        {/* [Req Images inside Project] 
            Options: Full width or 2 vertical. Text blocks mixed in. 
        */}
        <div className="flex flex-wrap -mx-[12px]"> {/* Negative margin for gutters */}
          {project.gallery?.map((item: any, i: number) => {
            
            // TEXT BLOCK [Req]
            if (item._type === "textBlock") {
              return (
                <div key={item._key} className="w-full px-[12px] mb-[40px]">
                  <p className="text-[16px] font-medium leading-[1.4] max-w-[600px]">
                    {item.content}
                  </p>
                </div>
              );
            }

            // IMAGE BLOCK
            if (item._type === "image") {
              const isHalf = item.layout === 'half';
              const widthClass = isHalf ? "w-1/2" : "w-full";
              
              return (
                <div key={item._key} className={`${widthClass} px-[12px] mb-[24px]`}>
                  <img 
                    src={item.asset?.url} 
                    alt={item.caption || ""}
                    className="w-full h-auto object-contain rounded-none block" // [Req No Crop, 0 Radius]
                  />
                  {item.caption && (
                    <p className="mt-[10px] text-[14px] text-gray-500">{item.caption}</p>
                  )}
                </div>
              );
            }
            return null;
          })}
        </div>

      </div>
    </main>
  );
}