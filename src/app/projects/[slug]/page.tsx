import { client } from "@/sanity/client";
import { notFound } from "next/navigation";

type ProjectBlock = {
  _key: string;
  _type: string;
  alt?: string;
  caption?: string;
  content?: string;
  maxWidth?: number;
  fontSize?: number;
  assetUrl?: string;
  videoFileUrl?: string;
  videoUrl?: string;
  posterUrl?: string;
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
  columnStart?: number;
  columnSpan?: number;
  rowStart?: number;
  rowSpan?: number;
};

type Project = {
  title: string;
  year?: string;
  intro?: string;
  coverUrl?: string;
  layoutColumns?: number;
  layoutRows?: number;
  layoutRowHeight?: number;
  layoutGap?: number;
  meta?: {
    client?: string;
    role?: string;
    disciplines?: string;
  };
  gallery?: ProjectBlock[];
};

function getGridItemStyle(block: ProjectBlock) {
  return {
    gridColumn: `${block.columnStart ?? 1} / span ${block.columnSpan ?? 1}`,
    gridRow: `${block.rowStart ?? 1} / span ${block.rowSpan ?? 1}`,
    maxWidth: block.maxWidth ? `${block.maxWidth}px` : undefined,
  };
}

async function getProject(slug: string) {
  return client.fetch(
    `*[_type == "project" && slug.current == $slug][0]{
      title, year, meta, intro, layoutColumns, layoutRows, layoutRowHeight, layoutGap,
      "coverUrl": coverImage.asset->url,
      gallery[]{
        _type,
        _key,
        alt,
        caption,
        content,
        maxWidth,
        fontSize,
        autoplay,
        loop,
        muted,
        columnStart,
        columnSpan,
        rowStart,
        rowSpan,
        videoUrl,
        "assetUrl": coalesce(asset->url, image.asset->url),
        "videoFileUrl": videoFile.asset->url,
        "posterUrl": poster.asset->url
      }
    }`,
    { slug }
  );
}

export default async function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = (await getProject(slug)) as Project | null;

  if (!project) {
    notFound();
  }

  const columns = project.layoutColumns || 12;
  const rows = project.layoutRows || 18;
  const rowHeight = project.layoutRowHeight || 80;
  const gap = project.layoutGap || 20;

  return (
    <main className="min-h-screen bg-white pb-[140px] pt-[22vh] text-black">
      <div className="mx-auto w-full max-w-custom px-4 laptop:px-[16px]">
        <div className="reveal-up mb-[18px] grid grid-cols-2 gap-y-3 border-b border-black/10 pb-[14px] text-[10px] font-medium uppercase tracking-[0.14em] text-black/50 md:grid-cols-4">
          <div>
            <span className="block text-black/35">Client</span>
            <span className="mt-1 block text-black">{project.meta?.client || project.title}</span>
          </div>
          <div>
            <span className="block text-black/35">Discipline</span>
            <span className="mt-1 block text-black">{project.meta?.disciplines || project.meta?.role || "Creative Direction"}</span>
          </div>
          <div>
            <span className="block text-black/35">Role</span>
            <span className="mt-1 block text-black">{project.meta?.role || "Design"}</span>
          </div>
          <div className="md:text-right">
            <span className="block text-black/35">Year</span>
            <span className="mt-1 block text-black">{project.year || "2026"}</span>
          </div>
        </div>

        <div className="reveal-up mb-[56px] pt-[14px]">
          <h1 className="max-w-[960px] font-heavy text-[clamp(34px,4.6vw,72px)] font-black leading-[0.98] tracking-[-0.05em]">
            {project.intro || project.title}
          </h1>
        </div>

        {project.coverUrl && (
          <div className="reveal-up mb-[64px] w-full">
            <img src={project.coverUrl} alt={project.title} className="block h-auto w-full rounded-none object-contain" />
          </div>
        )}

        <div
          className="reveal-up grid"
          style={{
            gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
            gridTemplateRows: `repeat(${rows}, minmax(${rowHeight}px, auto))`,
            gap: `${gap}px`,
          }}
        >
          {project.gallery?.map((block) => {
            if (block._type === "textBlock") {
              return (
                <div key={block._key} style={getGridItemStyle(block)} className="flex items-start">
                  <div
                    style={{
                      fontSize: `${block.fontSize ?? 40}px`,
                      maxWidth: block.maxWidth ? `${block.maxWidth}px` : undefined,
                    }}
                    className="font-medium leading-[1.05] tracking-[-0.05em]"
                  >
                    <p>{block.content}</p>
                  </div>
                </div>
              );
            }

            if (block._type === "videoBlock") {
              const src = block.videoFileUrl || block.videoUrl;

              if (!src) {
                return null;
              }

              return (
                <div key={block._key} style={getGridItemStyle(block)} className="h-full w-full">
                  <div className="h-full w-full">
                    <video
                      src={src}
                      poster={block.posterUrl}
                      autoPlay={block.autoplay ?? true}
                      loop={block.loop ?? true}
                      muted={block.muted ?? true}
                      playsInline
                      controls
                      className="block h-full w-full object-cover"
                    />
                    {block.caption && (
                      <p className="mt-3 text-[12px] font-medium uppercase tracking-[0.12em] text-black/45">{block.caption}</p>
                    )}
                  </div>
                </div>
              );
            }

            const imageUrl = block.assetUrl;

            if (!imageUrl) {
              return null;
            }

            return (
              <div key={block._key} style={getGridItemStyle(block)} className="h-full w-full">
                <div className="h-full w-full">
                  <img src={imageUrl} alt={block.alt || block.caption || project.title} className="block h-full w-full object-cover" />
                  {block.caption && (
                    <p className="mt-3 text-[12px] font-medium uppercase tracking-[0.12em] text-black/45">{block.caption}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}