import { client } from "@/sanity/client";

export const revalidate = 60;

export default async function Home() {
  const settings = await client.fetch(`*[_type == "settings"][0]{ 
    description, 
    "homeImageUrl": homeImage.asset->url,
    "heroLogoUrl": footerLogo.asset->url
  }`);

  return (
    <main className="overflow-hidden bg-white">
      <section className="flex h-screen w-full flex-col items-center justify-center gap-[30px] px-[40px] text-center">
        <div className="reveal-up flex w-full justify-center">
          {settings?.heroLogoUrl ? (
            <img
              src={settings.heroLogoUrl}
              alt="Studio Klimt"
              className="h-auto w-[56vw] max-w-[640px] object-contain"
            />
          ) : settings?.homeImageUrl ? (
            <img
              src={settings.homeImageUrl}
              alt="Studio Klimt"
              className="h-auto w-[56vw] max-w-[640px] object-contain"
            />
          ) : (
            <div className="font-heavy text-[clamp(56px,11vw,160px)] font-black uppercase leading-[0.85] tracking-[-0.08em]">
              Klimt
            </div>
          )}
        </div>

        <div className="reveal-up max-w-[800px]">
          <p className="font-medium text-[15px] uppercase leading-[1.4] tracking-[0.5px] text-black">
            {settings?.description || "A studio for creative direction, graphic and motion design shaped by rhythm."}
          </p>
        </div>
      </section>
    </main>
  );
}