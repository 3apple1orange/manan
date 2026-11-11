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
  description: `Photographs and video of ${name}, entrepreneur and author of ${siteConfig.book.title}, including his HRD Antwerp Diamond Grading diploma.`,
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
      width: p.width,
      height: p.height,
      about: { "@id": IDS.person },
    })),
  ],
};

/*
  The "hanging" plan for desktop: six placements that repeat down the wall.
  col-span = size (out of 12), col-start = where it starts, mt = how far down it hangs.
*/
const hang = [
  "lg:col-span-4 lg:col-start-2",
  "lg:col-span-3 lg:col-start-8 lg:mt-32",
  "lg:col-span-5 lg:col-start-4",
  "lg:col-span-3 lg:col-start-1 lg:mt-12",
  "lg:col-span-4 lg:col-start-7 lg:mt-36",
  "lg:col-span-3 lg:col-start-10",
];

// On phones: one column, pieces alternate slightly left and right
const phone = ["mr-auto w-[75%]", "ml-auto w-[75%]"];

type Piece =
  | { kind: "video" }
  | { kind: "photo"; src: string; width: number; height: number; caption: string };

const pieces: Piece[] = [{ kind: "video" }, ...galleryPhotos.map((p) => ({ kind: "photo" as const, ...p }))];

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

        {/* The wall */}
        <div className="mx-auto mt-20 grid max-w-md grid-cols-1 gap-y-10 md:mt-28 md:gap-y-14 lg:max-w-6xl lg:grid-cols-12 lg:items-start lg:gap-x-8 lg:gap-y-24">
          {pieces.map((piece, i) => (
            <Reveal
              key={piece.kind === "video" ? "video" : piece.src}
              y={48}
              delay={(i % 2) * 0.12}
              className={`${phone[i % 2]} lg:mx-0 lg:w-auto ${hang[i % hang.length]}`}
            >
              {piece.kind === "video" ? (
                <div className="overflow-hidden rounded-lg bg-line">
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
              ) : (
                <a
                  href={piece.src}
                  target="_blank"
                  rel="noopener"
                  className="group block overflow-hidden rounded-lg bg-line"
                  aria-label={`Open full photo: ${piece.caption}`}
                >
                  <Image
                    src={piece.src}
                    alt={piece.caption}
                    width={piece.width}
                    height={piece.height}
                    sizes="(min-width: 1024px) 35vw, 75vw"
                    priority={i < 3}
                    className="h-auto w-full transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                  />
                </a>
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </>
  );
}