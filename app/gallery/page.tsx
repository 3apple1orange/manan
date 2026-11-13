import Image from "next/image";
import { buildMetadata } from "@/lib/seo";
import { siteConfig, galleryPhotos, galleryVideo } from "@/lib/site-config";
import { IDS } from "@/lib/schema";
import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/motion/Reveal";
import WordReveal from "@/components/motion/WordReveal";

const name = siteConfig.person.name;
const abs = (path: string) => `${siteConfig.domain}${path}`;

export const metadata = buildMetadata({
  title: `Photos of ${name} | Gallery`,
  description: `Photographs and video of ${name}, founder of ${siteConfig.ecto.name} and author of ${siteConfig.book.title}, including his HRD Antwerp Diamond Grading diploma.`,
  path: "/gallery",
});

// Tells Google every photo and the video are of Manan Singla, linked to his profile
const gallerySchema = {
  "@context": "https://schema.org",
  "@type": "ImageGallery",
  "@id": `${siteConfig.domain}/gallery#gallery`,
  url: abs("/gallery"),
  name: `Photos of ${name}`,
  about: { "@id": IDS.person },
  associatedMedia: [
    {
      "@type": "VideoObject",
      name: `${name}: short video`,
      description: galleryVideo.caption,
      contentUrl: abs(galleryVideo.src),
      thumbnailUrl: abs(galleryVideo.poster),
      uploadDate: galleryVideo.uploadDate,
      duration: galleryVideo.duration,
      width: galleryVideo.width,
      height: galleryVideo.height,
      about: { "@id": IDS.person },
    },
    ...galleryPhotos.map((p) => ({
      "@type": "ImageObject",
      contentUrl: abs(p.src),
      url: abs(p.src),
      caption: p.caption,
      description: p.alt,
      width: p.width,
      height: p.height,
      about: { "@id": IDS.person },
    })),
  ],
};

function Caption({ index, text }: { index: number; text: string }) {
  return (
    <figcaption className="mt-3 flex gap-3 text-sm text-muted">
      <span className="font-serif italic">{String(index + 1).padStart(2, "0")}</span>
      <span>{text}</span>
    </figcaption>
  );
}

export default function GalleryPage() {
  return (
    <>
      <JsonLd data={gallerySchema} />

      <div className="px-6 py-20 md:py-28">
        {/* Header */}
        <header className="mx-auto max-w-4xl text-center">
          <Reveal y={12}>
            <p className="text-xs uppercase tracking-[0.25em] text-muted">Gallery</p>
          </Reveal>
          <WordReveal
            as="h1"
            text={`${name}, in photographs`}
            className="mt-4 font-serif text-5xl leading-[1.05] md:text-7xl"
            stagger={0.08}
            highlight={["photographs"]}
            highlightClassName="font-[family-name:var(--font-signature)] text-[1.15em] leading-none text-muted"
          />
          <Reveal delay={0.4}>
            <p className="mx-auto mt-6 max-w-xl font-serif text-lg italic text-muted md:text-xl">
              Portraits and moments from work and life.
            </p>
          </Reveal>
        </header>

        {/* Video + photos */}
        <div className="mx-auto mt-16 max-w-6xl columns-1 gap-6 sm:columns-2 md:mt-24 lg:columns-3 lg:gap-8">
          <Reveal y={24} className="mb-10 break-inside-avoid">
            <figure>
              <div className="overflow-hidden rounded-xl bg-line">
                <video
                  src={galleryVideo.src}
                  poster={galleryVideo.poster}
                  width={galleryVideo.width}
                  height={galleryVideo.height}
                  autoPlay
                  muted
                  loop
                  playsInline
                  controls
                  preload="metadata"
                  aria-label={galleryVideo.caption}
                  className="block h-auto w-full"
                />
              </div>
              <Caption index={0} text={galleryVideo.caption} />
            </figure>
          </Reveal>

          {galleryPhotos.map((p, i) => (
            <Reveal key={p.src} delay={((i + 1) % 3) * 0.08} y={24} className="mb-10 break-inside-avoid">
              <figure>
                <a
                  href={p.src}
                  target="_blank"
                  rel="noopener"
                  className="group block overflow-hidden rounded-xl bg-line"
                  aria-label={`Open full photo: ${p.alt}`}
                >
                  <Image
                    src={p.src}
                    alt={p.alt}
                    width={p.width}
                    height={p.height}
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    priority={i < 2}
                    className="h-auto w-full transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </a>
                <Caption index={i + 1} text={p.caption} />
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </>
  );
}