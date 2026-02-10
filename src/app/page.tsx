import { client } from "@/sanity/client";
import Image from "next/image";

export const revalidate = 60;

export default async function Home() {
  const settings = await client.fetch(`*[_type == "settings"][0]{ 
    description, 
    "homeImageUrl": homeImage.asset->url 
  }`);

  return (
    <main className="min-h-screen bg-white pt-[140px] px-4 laptop:px-[16px] flex flex-col items-center">
      
      <div className="w-full max-w-[800px] flex flex-col items-center">
        
        {/* Center Image [Req Images] No crop, original aspect */}
        {settings?.homeImageUrl && (
          <div className="w-full mb-[40px] flex justify-center">
             <img 
               src={settings.homeImageUrl} 
               alt="Studio Feature"
               className="max-h-[60vh] w-auto object-contain" // Preserves aspect ratio
             />
          </div>
        )}

        {/* Studio Description [Req] */}
        {/* Font: Neue Haas Unica – Medium */}
        {/* Line count: exactly 2 lines */}
        {/* Line-height: tight */}
        <div className="w-full max-w-[600px] text-center">
          <p className="font-desc font-medium text-[clamp(16px,2.5vw,22px)] leading-[1.1] tracking-[-0.32px] line-clamp-2 overflow-hidden text-black">
            {settings?.description || "Klimt Studio is a design practice focused on digital experiences, creating work that lasts."}
          </p>
        </div>

      </div>
    </main>
  );
}