import { client } from "@/sanity/client";
import Link from "next/link";
import Footer from "@/components/Footer"; // Import Footer

export const revalidate = 60;

type ProjectListItem = {
  _id: string;
  title: string;
  year?: string;
  imageUrl?: string;
  slug: {
    current: string;
  };
};

export default async function Projects() {
  const [projects, settings] = await Promise.all([
    client.fetch(`*[_type == "project"]|order(year desc){
    _id, title, slug, year, "imageUrl": thumbnail.asset->url
  }`) as Promise<ProjectListItem[]>,
    client.fetch(`*[_type == "settings"][0]{projectsLabel}`) as Promise<{ projectsLabel?: string } | null>,
  ]);

  return (
    <main className="min-h-screen bg-white text-black flex flex-col">
      <div className="flex-grow w-full px-[40px] pt-[22vh] pb-[96px]">
        <div className="reveal-up h-[34px] border-b border-black/15 pb-[15px] text-[9px] font-medium uppercase tracking-[0.5px] text-black/55">
          <div className="flex items-center justify-between gap-4">
            <span>{settings?.projectsLabel || "Archive"}</span>
            <span>{projects.length} Projects</span>
          </div>
        </div>

        <div className="reveal-up mb-[64px] pt-[18px]">
          <h1 className="max-w-[860px] text-[clamp(32px,4vw,56px)] font-medium leading-[1.05] tracking-[-1px]">
            Selected projects across identity, motion, digital systems, and image-making.
          </h1>
        </div>

        <div className="flex flex-wrap gap-x-[24px] gap-y-[48px]">
          {projects.map((project, index) => {
            const pattern = index % 3;
            const widthClass =
              pattern === 0
                ? "w-full md:w-[calc(50%-12px)]"
                : "w-full md:w-[calc(25%-12px)]";
            const aspectClass = pattern === 0 ? "aspect-[4/5]" : "aspect-[3/4]";

            return (
              <Link
                key={project._id}
                href={`/projects/${project.slug.current}`}
                className={`reveal-up group block ${widthClass}`}
              >
                <div className="relative overflow-hidden bg-black/5">
                  <div className={`relative ${aspectClass} w-full overflow-hidden`}>
                    {project.imageUrl ? (
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="h-full w-full object-cover transition duration-500 ease-out group-hover:scale-[1.015]"
                      />
                    ) : (
                      <div className="h-full w-full bg-black/5" />
                    )}
                  </div>

                  <div className="border-t border-black/10 bg-white px-0 pb-0 pt-3">
                    <div className="mb-2 flex items-center justify-between text-[9px] font-medium uppercase tracking-[0.5px] text-black/45">
                      <span>Project</span>
                      <span>{project.year || "Ongoing"}</span>
                    </div>
                    <h2 className="text-[20px] font-medium leading-[1.05] tracking-[-0.5px] text-black sm:text-[24px]">
                      {project.title}
                    </h2>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <Footer color="black" />
    </main>
  );
}