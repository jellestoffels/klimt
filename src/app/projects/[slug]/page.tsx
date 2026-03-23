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
    <main className="min-h-screen bg-white text-black">
      <div className="h-[40vh] bg-white" />

      <div className="reveal-up grid grid-cols-2 px-[40px] pb-[15px] text-[9px] font-medium uppercase tracking-[0.5px] text-black md:grid-cols-4">
        <div>
          {project.meta?.client || project.title}
        </div>
        <div className="md:pl-[10%]">
          {project.meta?.disciplines || project.meta?.role || "Creative Direction"}
        </div>
        <div className="md:pr-[10%] md:text-right">
          {project.meta?.role || "Design"}
        </div>
        <div className="text-right">
          {project.year || "2026"}
        </div>
      </div>

      {project.intro && (
        <div className="reveal-up px-[40px] py-[100px]">
          <h1 className="max-w-[80%] text-[4vw] font-medium leading-[1.1] tracking-[-1px]">
            {project.intro}
          </h1>
        </div>
      )}

      <div className="flex flex-col gap-[20px] pb-[150px]">
        {project.coverUrl && (
          <div className="reveal-up w-full">
            <img src={project.coverUrl} alt={project.title} className="gallery-media block h-auto w-full object-contain" />
          </div>
        )}

        <div
          className="reveal-up grid px-[40px]"
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
                    className="font-medium leading-[1.1] tracking-[-1px]"
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