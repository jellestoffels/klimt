import { client } from "@/sanity/client";

export const revalidate = 60;

export default async function Contact() {
  const settings = await client.fetch(`*[_type == "settings"][0]`);

  return (
    // [cite: 301] Background grey
    <main className="min-h-screen bg-grey text-ink pt-[calc(56px+48px)] md:pt-[calc(64px+96px)] px-5 md:px-8 lg:px-12">
      <div className="max-w-[920px]">
        {/* Email [cite: 319] */}
        <h2 className="text-[clamp(32px,3.2vw,48px)] leading-[1.05] mb-s7 font-medium">
          <a href={`mailto:${settings?.email}`} className="hover:underline decoration-paper decoration-1 underline-offset-[3px]">
            {settings?.email || "hello@klimt.studio"}
          </a>
        </h2>

        {/* Info Grid */}
        <div className="grid gap-s6">
          <div>
            <span className="block text-smallMeta uppercase tracking-[0.06em] mb-2 text-ink/65">Socials</span>
            <div className="flex gap-[18px]">
               {settings?.socials?.map((s: any) => (
                 <a key={s.platform} href={s.url} target="_blank" className="hover:underline decoration-paper decoration-1 underline-offset-[3px]">{s.platform}</a>
               ))}
            </div>
          </div>
          
          <div>
            <span className="block text-smallMeta uppercase tracking-[0.06em] mb-2 text-ink/65">Location</span>
            <p>{settings?.location}</p>
          </div>

          <div>
            <span className="block text-smallMeta uppercase tracking-[0.06em] mb-2 text-ink/65">Availability</span>
            <p>{settings?.availability || "Open to new projects"}</p>
          </div>
        </div>
      </div>
    </main>
  );
}