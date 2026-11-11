import Image from "next/image";
import { buildMetadata } from "@/lib/seo";
import { siteConfig, galleryPhotos } from "@/lib/site-config";
import { IDS } from "@/lib/schema";
import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/motion/Reveal";
import WordReveal from "@/components/motion/WordReveal";

const name = siteConfig.person.name;

export const metadata = buildMetadata({
  title: `Photos of ${name} | Gallery`,
  description: `Photographs of ${name}, entrepreneur and author of ${siteConfig.book.title}, including his HRD Antwerp Diamond Grading diploma.`,
  path: "/gallery",
});

// Tells Google each photo is an image of Manan Singla, linked to his profile
const gallerySchema = {
  "@context": "https://schema.org",
  "@type": "ImageGallery",
  "@id": `${siteConfig.domain}/gallery#gallery`,
  url: `${siteConfig.domain}/gallery`,
  name: `Photos of ${name}`,
  about: { "@id": IDS.person },
  associatedMedia: galleryPhotos.map((p) => ({
    "@type": "ImageObject",
    contentUrl: `${siteConfig.domain}${p.src}`,
    url: `${siteConfig.domain}${p.src}`,
    caption: p.caption,
    width: p.width,
    height: p.height,
    about: { "@id": IDS.person },
  })),
};

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

        {/* Photos */}
        <div className="mx-auto mt-16 max-w-6xl columns-1 gap-6 sm:columns-2 md:mt-24 lg:columns-3 lg:gap-8">
          {galleryPhotos.map((p, i) => (
            <Reveal key={p.src} delay={(i % 3) * 0.08} y={24} className="mb-10 break-inside-avoid">
              <figure>
                <a
                  href={p.src}
                  target="_blank"
                  rel="noopener"
                  className="group block overflow-hidden rounded-xl bg-line"
                  aria-label={`Open full photo: ${p.caption}`}
                >
                  <Image
                    src={p.src}
                    alt={p.caption}
                    width={p.width}
                    height={p.height}
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    priority={i < 3}
                    className="h-auto w-full transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </a>
                <figcaption className="mt-3 flex gap-3 text-sm text-muted">
                  <span className="font-serif italic">{String(i + 1).padStart(2, "0")}</span>
                  <span>{p.caption}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </>
  );
}