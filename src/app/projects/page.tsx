import { client } from "@/sanity/client";
import Link from "next/link";
import Footer from "@/components/Footer"; // Import Footer

export const revalidate = 60;

export default async function Projects() {
  const projects = await client.fetch(`*[_type == "project"]|order(year desc){
    _id, title, slug, year, "imageUrl": thumbnail.asset->url
  }`);

  return (
    <main className="min-h-screen bg-black text-white flex flex-col">
      
      {/* Main Content Area */}
      <div className="flex-grow w-full max-w-custom mx-auto px-4 laptop:px-[16px] pt-[120px]"> {/* Increased PT to clear header */}
        
        {/* Section Header */}
        <div className="h-[34px] flex items-center mb-[40px] border-b border-white/20 pb-2">
          <span className="font-medium text-[14px] tracking-tight text-white">
            Selected Projects
          </span>
        </div>

        {/* Grid Structure */}
        <div className="flex flex-wrap" style={{ gap: '24px 24px' }}>
           {projects.map((p: any, i: number) => {
             const positionInRow = i % 3;
             // Grid logic from previous request
             let widthClass = "";
             if (positionInRow === 0) widthClass = "w-full md:w-[calc(50%-12px)]"; // Responsive tweak
             if (positionInRow === 1) widthClass = "w-full md:w-[calc(25%-12px)]"; 
             if (positionInRow === 2) widthClass = "w-full md:w-[calc(25%-12px)]"; 
             
             // Hardcoded laptop widths from previous brief (preserved for larger screens)
             const laptopClass = positionInRow === 0 ? "laptop:w-[539px]" : "laptop:w-[262px]";

             return (
               <Link 
                 key={p._id} 
                 href={`/projects/${p.slug.current}`}
                 className={`block relative mb-[40px] ${widthClass} ${laptopClass}`}
               >
                 <div className="relative w-full h-auto group">
                    {p.imageUrl && (
                      <img 
                        src={p.imageUrl} 
                        alt={p.title}
                        className="w-full h-auto object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                      />
                    )}
                    
                    <div className="mt-3 flex justify-between items-baseline">
                      <span className="text-white font-medium text-[14px]">{p.title}</span>
                      <span className="text-white/50 text-[12px]">{p.year}</span>
                    </div>
                 </div>
               </Link>
             )
           })}
        </div>
      </div>

      {/* Footer (White mode for dark page) */}
      <Footer color="white" />
    </main>
  );
}