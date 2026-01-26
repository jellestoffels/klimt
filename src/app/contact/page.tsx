import { client } from "@/sanity/client";
import Image from "next/image"; // Import Image

export const revalidate = 60;

export default async function Contact() {
  // Fetch footerLogo
  const settings = await client.fetch(`*[_type == "settings"][0]{
    email, socials, "footerLogoUrl": footerLogo.asset->url
  }`);

  return (
    <main className="min-h-screen bg-[#9C9C9C] text-black px-padMobile md:px-padTablet lg:px-padDesktop flex flex-col pt-[120px]">
      
      <div className="flex flex-col items-start gap-[24px] grow">
        <a 
          href={`mailto:${settings?.email}`} 
          className="text-contactMobile md:text-contactTablet lg:text-contactDesktop font-medium leading-[0.92] border-b-[3px] border-black pb-1 hover:opacity-70 transition-opacity"
        >
          {settings?.email || "email@klimt.studio"}
        </a>
        
        {settings?.socials?.[0] && (
          <a 
            href={settings.socials[0].url} 
            target="_blank"
            className="text-contactMobile md:text-contactTablet lg:text-contactDesktop font-medium leading-[0.92] border-b-[3px] border-black pb-1 hover:opacity-70 transition-opacity"
          >
            {settings.socials[0].platform || "Instagram"}
          </a>
        )}
      </div>

      {/* Dynamic Footer Logo */}
      <div className="pb-[24px] lg:pb-[32px] mt-auto">
        <div className="opacity-35 relative h-[64px] md:h-[110px] lg:h-[140px] w-full max-w-[500px]">
          {settings?.footerLogoUrl ? (
             <Image 
               src={settings.footerLogoUrl} 
               alt="Footer Logo" 
               fill 
               className="object-contain object-left-bottom"
             />
          ) : (
             // Fallback text if no image
             <span className="text-[64px] font-bold">KLIMT</span>
          )}
        </div>
      </div>
    </main>
  );
}