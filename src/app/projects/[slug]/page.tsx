import { client } from "@/sanity/client";
import { notFound } from "next/navigation";

type ProjectBlock = {
  _key: string;
  _type: string;
  alt?: string;
  caption?: string;
  content?: string;
  align?: "left" | "center" | "right";
  widthPercent?: number;
  maxWidth?: number;
  offsetX?: number;
  offsetY?: number;
  fontSize?: number;
  layout?: "full" | "half";
  assetUrl?: string;
  videoFileUrl?: string;
  videoUrl?: string;
  posterUrl?: string;
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
};

type Project = {
  title: string;
  year?: string;
  intro?: string;
  coverUrl?: string;
  meta?: {
    client?: string;
    role?: string;
    disciplines?: string;
  };
  gallery?: ProjectBlock[];
};

function getAlignmentClass(align?: "left" | "center" | "right") {
  if (align === "left") {
    return "justify-start text-left";
  }

  if (align === "right") {
    return "justify-end text-right";
  }

  return "justify-center text-left";
}

function getBlockWidth(block: ProjectBlock) {
  if (typeof block.widthPercent === "number") {
    return Math.min(Math.max(block.widthPercent, 20), 100);
  }

  if (block.layout === "half") {
    return 50;
  }

  return 100;
}

function getBlockStyle(block: ProjectBlock) {
  const translateX = block.offsetX ?? 0;

  return {
    width: `${getBlockWidth(block)}%`,
    maxWidth: block.maxWidth ? `${block.maxWidth}px` : undefined,
    marginTop: block.offsetY ? `${block.offsetY}px` : undefined,
    transform: translateX ? `translateX(${translateX}px)` : undefined,
  };
}

async function getProject(slug: string) {
  return client.fetch(
    `*[_type == "project" && slug.current == $slug][0]{
      title, year, meta, intro,
      "coverUrl": coverImage.asset->url,
      gallery[]{
        _type,
        _key,
        alt,
        caption,
        content,
        align,
        widthPercent,
        maxWidth,
        offsetX,
        offsetY,
        fontSize,
        layout,
        autoplay,
        loop,
        muted,
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

        <div className="flex flex-col gap-6">
          {project.gallery?.map((block) => {
            if (block._type === "textBlock") {
              return (
                <div key={block._key} className={`reveal-up flex w-full ${getAlignmentClass(block.align)}`}>
                  <div
                    style={{
                      ...getBlockStyle(block),
                      fontSize: `${block.fontSize ?? 40}px`,
                    }}
                    className="font-medium leading-[1.05] tracking-[-0.05em]"
                  >
                    <p style={{ maxWidth: block.maxWidth ? `${block.maxWidth}px` : undefined }}>
                      {block.content}
                    </p>
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
                <div key={block._key} className={`reveal-up flex w-full ${getAlignmentClass(block.align)}`}>
                  <div style={getBlockStyle(block)}>
                    <video
                      src={src}
                      poster={block.posterUrl}
                      autoPlay={block.autoplay ?? true}
                      loop={block.loop ?? true}
                      muted={block.muted ?? true}
                      playsInline
                      controls
                      className="block h-auto w-full"
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
              <div key={block._key} className={`reveal-up flex w-full ${getAlignmentClass(block.align)}`}>
                <div style={getBlockStyle(block)}>
                  <img src={imageUrl} alt={block.alt || block.caption || project.title} className="block h-auto w-full object-contain" />
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