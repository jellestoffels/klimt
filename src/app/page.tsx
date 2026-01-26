import { client } from "@/sanity/client";
import Image from "next/image";

export const revalidate = 60;

export default async function Home() {
  // Fetch description AND homeImage
  const settings = await client.fetch(`*[_type == "settings"][0]{ 
    description, 
    "homeImageUrl": homeImage.asset->url 
  }`);

  return (
    // Centered Layout
    <main className="min-h-screen bg-white px-padMobile md:px-padTablet lg:px-padDesktop flex flex-col items-center justify-center">
      
      <div className="flex flex-col items-center text-center max-w-[800px] w-full">
        
        {/* Center Image (If uploaded) */}
        {settings?.homeImageUrl && (
          <div className="relative w-full max-w-[600px] aspect-[4/3] mb-[32px] md:mb-[40px]">
             <Image 
               src={settings.homeImageUrl} 
               alt="Studio Feature" 
               fill 
               className="object-cover"
               priority
             />
          </div>
        )}

        {/* Short Text */}
        <p className="text-desc text-black leading-[1.35] max-w-[58ch]">
          {settings?.description || "Klimt Studio is a design practice focused on digital experiences."}
        </p>

      </div>
    </main>
  );
}