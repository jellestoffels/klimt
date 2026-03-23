import { client } from "@/sanity/client";
import Footer from "@/components/Footer";

export const revalidate = 60;

type DisciplineGroup = {
  category?: string;
  items?: string[];
};

type ClientLogo = {
  asset?: {
    url?: string;
  };
  name?: string;
};

type InfoPageData = {
  headline?: string;
  intro?: string;
  disciplines?: DisciplineGroup[];
  clients?: ClientLogo[];
};

export default async function Info() {
  const data = (await client.fetch(`*[_type == "info"][0]{
    headline,
    intro,
    disciplines,
    clients[]{
      asset->{url},
      name
    }
  }`)) as InfoPageData | null;

  return (
    <main className="min-h-screen bg-white text-black flex flex-col pt-[120px]">
      <div className="w-full px-[40px] flex-grow">
        
        {/* 1. Big Headline */}
        <div className="reveal-up mb-[80px]">
          <h1 className="max-w-[900px] text-[clamp(24px,3vw,40px)] font-medium leading-[1.1] tracking-[-1px]">
            {data?.headline || "We creates design solutions for brands driving the new wave in entertainment, culture, and commerce."}
          </h1>
        </div>

        {/* 2. Intro Paragraph */}
        <div className="reveal-up mb-[100px] max-w-[800px]">
           <p className="text-[18px] md:text-[24px] font-medium leading-[1.3] tracking-[-0.5px] opacity-90">
             {data?.intro || "We're a multidisciplinary creative studio rooted in branding, digital, and visual design."}
           </p>
        </div>

        {/* 3. Disciplines Grid */}
        <div className="reveal-up grid grid-cols-2 md:grid-cols-4 gap-8 mb-[120px] border-t border-black/10 pt-8">
          {data?.disciplines?.map((cat, i: number) => (
            <div key={i}>
              <h3 className="mb-4 text-[10px] font-medium uppercase tracking-[0.5px] text-black/55">{cat?.category || "Category"}</h3>
              <ul className="space-y-1">
                {cat?.items?.map((item: string, j: number) => (
                  <li key={j} className="cursor-default text-[13px] leading-[1.35] opacity-70 transition-opacity hover:opacity-100">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* 4. Client Logos */}
        <div className="reveal-up mb-[120px]">
           <h3 className="mb-8 text-[10px] font-medium uppercase tracking-[0.5px] opacity-50">Select Clients</h3>
           <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-x-12 gap-y-16 items-center">
             {data?.clients?.map((logo, i: number) => {
               // FIX: Safety check. If logo is empty, skip it.
               if (!logo?.asset?.url) return null;

               return (
                 <div key={i} className="w-full h-[40px] relative grayscale hover:grayscale-0 transition-all opacity-80 hover:opacity-100">
                   <img 
                     src={logo.asset.url} 
                     alt={logo.name || "Client"} 
                     className="h-full w-full object-contain object-left"
                   />
                 </div>
               );
             })}
           </div>
        </div>

      </div>

      {/* Footer */}
      <Footer color="black" />
    </main>
  );
}