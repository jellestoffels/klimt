import { client } from "@/sanity/client";
import Logo from "@/components/Logo"; // Reuse the component

export const revalidate = 60;

export default async function Home() {
  // Fetch logoUrl alongside description
  const settings = await client.fetch(`*[_type == "settings"][0]{ 
    description, 
    "logoUrl": headerLogo.asset->url 
  }`);

  return (
    <main className="min-h-screen bg-white pt-[120px] px-padMobile md:px-padTablet lg:px-padDesktop">
      <div className="flex flex-col items-start max-w-[800px]">
        
        {/* Dynamic Logo Block */}
        <div className="mb-[24px] w-[180px] md:w-[220px] h-[50px]">
           <Logo src={settings?.logoUrl} color="black" className="w-full h-full" />
        </div>

        <p className="text-desc text-black leading-[1.35]">
          {settings?.description || "Klimt Studio is a design practice focused on digital experiences."}
        </p>

      </div>
    </main>
  );
}