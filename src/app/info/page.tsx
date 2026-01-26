import { client, urlFor } from "@/sanity/client";

export const revalidate = 60;

export default async function Info() {
  const data = await client.fetch(`*[_type == "info"][0]`);

  return (
    <main className="pt-[calc(56px+48px)] md:pt-[calc(64px+96px)] px-5 md:px-8 lg:px-12 max-w-container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Left Content (Cols 1-7) [cite: 272] */}
        <div className="md:col-span-7">
          <h2 className="text-[clamp(32px,3.2vw,48px)] leading-[1.08] font-medium tracking-[-0.015em] mb-s6 max-w-[22ch]">
            {data?.headline}
          </h2>

          <p className="text-[16px] md:text-[18px] leading-[1.45] max-w-[60ch] mb-s8">
            {data?.intro}
          </p>

          <div className="mb-s8">
            {data?.services?.map((group: any, i: number) => (
              <div key={i} className="mb-s6">
                <span className="block text-smallMeta uppercase tracking-[0.06em] mb-3">{group.group}</span>
                <ul>
                  {group.items?.map((item: string, j: number) => (
                    <li key={j} className="mb-s2">{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {data?.clients && (
            <div className="mb-s9">
              <span className="block text-smallMeta uppercase tracking-[0.06em] mb-3">Select Clients</span>
              <p className="max-w-[50ch] leading-relaxed text-[16px]">
                {data.clients.join(", ")}
              </p>
            </div>
          )}
        </div>

        {/* Right Content Portrait [cite: 273, 293] */}
        <div className="md:col-span-5 md:col-start-8">
          {data?.portrait && (
            <div className="relative w-full">
               <img 
                 src={urlFor(data.portrait).url()} 
                 alt="Portrait"
                 className="w-full h-auto rounded-medium object-cover max-h-[520px]"
               />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}