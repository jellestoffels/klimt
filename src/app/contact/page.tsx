import { client } from "@/sanity/client";

export const revalidate = 60;

export default async function Contact() {
  const settings = await client.fetch(`*[_type == "settings"][0]`);

  return (
    // [Req Background White]
    <main className="min-h-screen bg-white text-black px-4 laptop:px-[16px] flex flex-col pt-[120px]">
      
      <div className="flex flex-col items-start gap-[24px] grow max-w-[1123px] mx-auto w-full">
        {/* [Req Font: Neue Haas Unica Pro Heavy, 40px] */}
        <a 
          href={`mailto:${settings?.email}`} 
          className="font-heavy font-black text-[40px] leading-tight hover:opacity-70 transition-opacity"
        >
          {settings?.email || "email@klimt.studio"}
        </a>
        
        {settings?.socials?.[0] && (
          <a 
            href={settings.socials[0].url} 
            target="_blank"
            className="font-heavy font-black text-[40px] leading-tight hover:opacity-70 transition-opacity"
          >
            {settings.socials[0].platform || "Instagram"}
          </a>
        )}
      </div>

      {/* [Req Remove Word KLIMT] Footer is now empty or minimal */}
      <div className="pb-[32px] mt-auto">
      </div>
    </main>
  );
}