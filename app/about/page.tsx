import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
import JsonLd from "@/components/JsonLd";
import { profilePageSchema } from "@/lib/schema";
import HoverExpandGallery from "@/components/HoverExpandGallery";
import RevealSection from "@/components/RevealSection";
import AboutLeftRail from "@/components/AboutLeftRail";
import AboutRightRail from "@/components/AboutRightRail";
import AboutIntro from "@/components/AboutIntro";
import EndorsementNote from "@/components/EndorsementNote";

export const metadata = buildMetadata({
  title: `About ${siteConfig.person.name} | Founder of ${siteConfig.ecto.name}`,
  description: `Official profile of ${siteConfig.person.name}, founder of ${siteConfig.ecto.name}, proprietor of ${siteConfig.ssSolutions.name} and author of ${siteConfig.book.title}.`,
  path: "/about",
});

const galleryImages = [
  { src: "/images/gallery/ss-solutions.jpg", alt: "S.S. Solutions mechanised road-sweeping project", label: siteConfig.ssSolutions.name },
  { src: "/images/gallery/book-cover.png", alt: `${siteConfig.book.title} book cover by ${siteConfig.person.name}`, label: siteConfig.book.title },
  { src: "/images/gallery/ecto-india.webp", alt: `${siteConfig.ecto.name} auto-rickshaw mobility platform`, label: siteConfig.ecto.name },
  { src: siteConfig.diamonds.videoPoster, alt: "Manan Singla at HRD Antwerp", label: siteConfig.diamonds.name },
  { src: "/images/gallery/research.png", alt: `${siteConfig.person.name} research and publications`, label: "Research" },
];

const pillars = [
  {
    tint: "rgba(37, 60, 168, 0.06)",
    kicker: "Venture",
    title: siteConfig.ecto.name,
    body: siteConfig.ecto.description,
    meta: `Active since ${siteConfig.ecto.activeSince} · Co-founded with ${siteConfig.ecto.coFounder}`,
    href: "/ecto-india",
    cta: `More on ${siteConfig.ecto.name}`,
    website: siteConfig.ectoDomain,
  },
  {
    tint: "rgba(107, 33, 168, 0.06)",
    kicker: "Public Systems",
    title: siteConfig.ssSolutions.name,
    body: siteConfig.ssSolutions.description,
    meta: `Established ${siteConfig.ssSolutions.established}`,
    href: "/ss-solutions",
    cta: `More on ${siteConfig.ssSolutions.name}`,
    website: siteConfig.ssSolutions.website,
  },
  {
    tint: "rgba(5, 122, 85, 0.07)",
    kicker: "Trade",
    title: siteConfig.diamonds.name,
    body: siteConfig.diamonds.summary,
    meta: `Foundation: ${siteConfig.diamonds.foundation}`,
    href: "/diamonds",
    cta: "More on diamonds and trade",
    website: siteConfig.diamonds.website,
  },
  {
    tint: "rgba(184, 134, 11, 0.07)",
    kicker: "Writing",
    title: siteConfig.book.title,
    body: siteConfig.book.description,
    meta: `Published ${siteConfig.book.datePublishedLabel}`,
    href: "/writing/meet-me-in-the-backyard",
    cta: "More on the book",
    website: "",
  },
  {
    tint: "rgba(4, 99, 7, 0.06)",
    kicker: "Research",
    title: "Research & Publications",
    body: "How digital mobility platforms take root in smaller Indian cities, and the informal institutions, labour and trust that decide whether they last.",
    meta: "Research manuscript · Zenodo, 2026",
    href: "/research",
    cta: "View research",
    website: "",
    endorsed: true,
  },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={profilePageSchema()} />

      <div className="lg:grid lg:grid-cols-[280px_1fr_280px] lg:min-h-screen">
        <aside className="hidden lg:block lg:sticky lg:top-0 lg:h-screen border-r border-line">
          <AboutLeftRail />
        </aside>

        <main className="px-6 py-16 md:py-24 lg:px-12">
          <div className="max-w-2xl mx-auto">
            <div className="lg:hidden mb-14 text-center">
              <p className="text-xs tracking-[0.2em] uppercase text-muted">Profile</p>
              <h1 className="mt-3 font-serif text-4xl">{siteConfig.person.name}</h1>
            </div>

            <AboutIntro />

            <div className="mt-24">
              <p className="text-xs tracking-[0.25em] uppercase text-muted mb-8">N° 02 · The Work</p>
              <HoverExpandGallery images={galleryImages} />
            </div>

            <div className="mt-20 space-y-14">
              {pillars.map((p) => (
                <RevealSection key={p.href} tint={p.tint} className="border-t border-line pt-10 px-6 -mx-6 pb-10">
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="text-xs tracking-[0.2em] uppercase text-muted">{p.kicker}</span>
                    {p.website && (
                      <a
                        href={p.website}
                        target="_blank"
                        rel="noopener"
                        className="text-xs text-muted underline-offset-4 transition-colors hover:text-ink hover:underline"
                      >
                        {p.website.replace(/^https?:\/\/(www\.)?/, "")} ↗
                      </a>
                    )}
                  </div>
                  <h3 className="mt-2 font-serif text-3xl">{p.title}</h3>
                  <p className="mt-3 text-base text-muted">{p.body}</p>
                  <p className="mt-2 text-sm text-muted">{p.meta}</p>
                  {p.endorsed && <EndorsementNote />}
                  <Link href={p.href} className="mt-4 inline-block text-sm underline">
                    {p.cta} →
                  </Link>
                </RevealSection>
              ))}
            </div>

            <div className="mt-20 border-t border-line pt-10 flex flex-wrap justify-center gap-x-12 gap-y-4 text-center">
              <Link href="/press" className="text-sm underline">Press &amp; media →</Link>
              <Link href="/contact" className="text-sm underline">Get in touch →</Link>
            </div>
          </div>
        </main>

        <aside className="hidden lg:block lg:sticky lg:top-0 lg:h-screen border-l border-line">
          <AboutRightRail />
        </aside>

        <div className="lg:hidden px-6 -mt-8 mb-12 max-w-xs mx-auto">
          <AboutRightRail />
        </div>
      </div>
    </>
  );
}