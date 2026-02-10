import { client } from "@/sanity/client";
import Image from "next/image";
import Footer from "@/components/Footer";

export const revalidate = 60;

export default async function Info() {
  const data = await client.fetch(`*[_type == "info"][0]{
    headline,
    intro,
    disciplines,
    clients[]{
      asset->{url},
      name
    }
  }`);

  return (
    <main className="min-h-screen bg-white text-black flex flex-col pt-[120px]">
      
      <div className="w-full max-w-custom mx-auto px-4 laptop:px-[16px] flex-grow">
        
        {/* 1. Big Headline */}
        <div className="mb-[80px]">
          <h1 className="text-[clamp(24px,3vw,40px)] font-medium leading-[1.1] tracking-tight max-w-[900px]">
            {data?.headline || "We creates design solutions for brands driving the new wave in entertainment, culture, and commerce."}
          </h1>
        </div>

        {/* 2. Intro Paragraph */}
        <div className="mb-[100px] max-w-[800px]">
           <p className="text-[18px] md:text-[24px] font-medium leading-[1.3] opacity-90">
             {data?.intro || "We're a multidisciplinary creative studio rooted in branding, digital, and visual design."}
           </p>
        </div>

        {/* 3. Disciplines Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-[120px] border-t border-black/10 pt-8">
          {data?.disciplines?.map((cat: any, i: number) => (
            <div key={i}>
              <h3 className="text-[14px] font-bold mb-4">{cat.category}</h3>
              <ul className="space-y-1">
                {cat.items?.map((item: string, j: number) => (
                  <li key={j} className="text-[13px] opacity-70 hover:opacity-100 transition-opacity cursor-default">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* 4. Client Logos */}
        <div className="mb-[120px]">
           <h3 className="text-[14px] font-bold mb-8 opacity-50">Select Clients</h3>
           <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-x-12 gap-y-16 items-center">
             {data?.clients?.map((logo: any, i: number) => (
               <div key={i} className="w-full h-[40px] relative grayscale hover:grayscale-0 transition-all opacity-80 hover:opacity-100">
                 {logo.asset && (
                   <Image 
                     src={logo.asset.url} 
                     alt={logo.name || "Client"} 
                     fill 
                     className="object-contain object-left"
                   />
                 )}
               </div>
             ))}
           </div>
        </div>

      </div>

      {/* Footer */}
      <Footer color="black" />
    </main>
  );
}