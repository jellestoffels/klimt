import { client } from "@/sanity/client";
import Link from "next/link";

export default async function Home() {
  const settings = await client.fetch(`*[_type == "settings"][0]`);

  return (
    // [cite: 116-119] Padding calculation: Header + Spacing
    <main className="min-h-screen flex flex-col justify-center px-5 md:px-8 lg:px-12 pb-s9 pt-[120px] md:pt-[160px]">
      <div className="w-full max-w-[720px]"> {/* [cite: 114] */}
        
        {/* Logo Block [cite: 120] */}
        <div className="mb-s6 md:mb-s7 w-[clamp(180px,22vw,340px)]">
           <div className="w-full aspect-[3/1] bg-ink flex items-center justify-center text-paper font-bold tracking-widest">
             KLIMT
           </div> 
        </div>

        {/* Description [cite: 126-128] */}
        <p className="text-[16px] md:text-[18px] leading-[1.45] max-w-[58ch] mb-s7">
          {settings?.description || "Klimt Studio is a design practice focused on digital experiences."}
        </p>

        {/* Links [cite: 133-135] */}
        <div className="flex flex-col md:flex-row gap-s3 md:gap-[20px]">
          <Link href="/projects" className="text-ink hover:underline decoration-1 underline-offset-[3px]">View Projects</Link>
          <Link href="/contact" className="text-ink hover:underline decoration-1 underline-offset-[3px]">Contact</Link>
        </div>
      </div>
    </main>
  );
}