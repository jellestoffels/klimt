import { client } from "@/sanity/client";

export const revalidate = 60;

export default async function Contact() {
  const settings = await client.fetch(`*[_type == "settings"][0]{
    email,
    websiteUrl,
    contactBio,
    "contactCardImageUrl": contactCardImage.asset->url,
    socials,
    offices
  }`);

  const offices = settings?.offices?.length
    ? settings.offices
    : [
        { city: "Amsterdam", detail: "NL" },
        { city: "Berlin", detail: "DE" },
        { city: "New York", detail: "US" },
      ];

  return (
    <main className="min-h-screen bg-black px-4 pt-[100px] text-white laptop:px-[16px]">
      <div className="contact-wrapper mx-auto grid min-h-[calc(100vh-100px)] w-full max-w-custom grid-cols-1 gap-12 pb-8 lg:grid-cols-[1fr_1.5fr_1fr] lg:gap-10 lg:pl-[40px]">
        <div className="contact-info-column reveal-up relative flex flex-col gap-10 pt-6 lg:min-h-full lg:pt-4">
          <div>
            <p className="mb-[10px] text-[10px] uppercase tracking-[0.5px] text-[#888888]">Project Inquiries</p>
            <a
              href={`mailto:${settings?.email || "hi@studioklimt.com"}`}
              className="text-[16px] leading-[1.4] text-white underline-offset-4 transition hover:underline"
            >
              {settings?.email || "hi@studioklimt.com"}
            </a>
          </div>

          <div>
            <p className="mb-[10px] text-[10px] uppercase tracking-[0.5px] text-[#888888]">Offices</p>
            <div className="space-y-3 text-[16px] leading-[1.4] text-white">
              {offices.map((office: { city?: string; detail?: string }, index: number) => (
                <div key={`${office.city || "office"}-${index}`}>
                  <p>{office.city || "Office"}</p>
                  {office.detail && <p className="text-white/60">{office.detail}</p>}
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-[10px] text-[10px] uppercase tracking-[0.5px] text-[#888888]">Networks</p>
            <div className="flex flex-col gap-2 text-[16px] leading-[1.4]">
              {(settings?.socials || []).map((social: { platform?: string; url?: string }, index: number) => (
                <a
                  key={`${social.platform || "social"}-${index}`}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-white underline-offset-4 transition hover:underline"
                >
                  {social.platform || social.url}
                </a>
              ))}
            </div>
          </div>

          <p className="text-[8px] text-[#666666] lg:mt-auto">© 2026 Klimt Studio. All rights reserved.</p>
        </div>

        <div className="contact-image-card reveal-up flex items-start justify-center pt-2 lg:pt-0">
          <div className="relative w-full max-w-[500px] overflow-hidden aspect-[3/4] bg-white/5">
            {settings?.contactCardImageUrl ? (
              <img
                src={settings.contactCardImageUrl}
                alt="Studio Klimt"
                className="h-full w-full object-cover"
              />
            ) : (
              <img
                src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1400&q=80"
                alt="Studio Klimt"
                className="h-full w-full object-cover"
              />
            )}

            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/35 to-transparent" />

            <div className="card-overlay-text absolute left-[8%] top-1/2 max-w-[280px] -translate-y-1/2">
              <h1 className="mb-4 text-[32px] font-medium leading-none tracking-[-0.04em]">Studio Klimt</h1>
              <p className="mb-5 text-[15px] leading-[1.45] text-white/80">
                {settings?.contactBio ||
                  "A studio for creative direction, graphic systems, and motion design shaped by rhythm, restraint, and atmosphere."}
              </p>
              <div className="flex flex-col gap-2 text-[15px] leading-[1.4]">
                <a href={`mailto:${settings?.email || "hi@studioklimt.com"}`} className="underline-offset-4 transition hover:underline">
                  {settings?.email || "hi@studioklimt.com"}
                </a>
                <a
                  href={settings?.websiteUrl || "https://studioklimt.com"}
                  target="_blank"
                  rel="noreferrer"
                  className="underline-offset-4 transition hover:underline"
                >
                  {settings?.websiteUrl?.replace(/^https?:\/\//, "") || "studioklimt.com"}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden lg:block" />
      </div>
    </main>
  );
}