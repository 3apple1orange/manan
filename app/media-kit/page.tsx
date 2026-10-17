import { buildMetadata } from "@/lib/seo";
import { siteConfig, bios } from "@/lib/site-config";

export const metadata = buildMetadata({
  title: `Media Kit | ${siteConfig.person.name}`,
  description: `Bios, photographs and press assets for ${siteConfig.person.name}, founder of ${siteConfig.ecto.name} and author of ${siteConfig.book.title}.`,
  path: "/media-kit",
});

// Drop real files at these paths — links below will work once they exist.
const assets = [
  { label: "Primary portrait", href: "/images/manan-singla-founder-ecto-india.jpeg" },
  { label: "Book cover", href: "/images/gallery/book-cover.png" },
  { label: "ECTO INDIA image", href: "/images/gallery/ecto-india.webp" },
  { label: "Logo", href: "/images/manan-singla-logo.jpeg" },
];

export default function MediaKitPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-20 md:py-28">
      <header className="text-center">
        <p className="text-xs tracking-[0.2em] uppercase text-muted">Media Kit</p>
        <h1 className="mt-4 font-serif text-4xl md:text-6xl leading-tight">
          Media Kit
        </h1>
        <p className="mt-6 max-w-prose mx-auto text-lg text-muted font-serif italic">
          Bios, photographs and approved facts for press and media use.
        </p>
      </header>

      <section className="mt-16 border-t border-line pt-10">
        <h2 className="text-xs tracking-[0.15em] uppercase text-muted">Bio — 50 words</h2>
        <p className="mt-3 text-base leading-relaxed">{bios.short}</p>
      </section>

      <section className="mt-10 border-t border-line pt-10">
        <h2 className="text-xs tracking-[0.15em] uppercase text-muted">Bio — 150 words</h2>
        <p className="mt-3 text-base leading-relaxed">{bios.medium}</p>
      </section>

      <section className="mt-10 border-t border-line pt-10">
        <h2 className="text-xs tracking-[0.15em] uppercase text-muted">Bio — 300 words</h2>
        <p className="mt-3 text-base leading-relaxed whitespace-pre-line">{bios.long}</p>
      </section>

      <section className="mt-10 border-t border-line pt-10">
        <h2 className="text-xs tracking-[0.15em] uppercase text-muted">Approved Designations</h2>
        <ul className="mt-3 space-y-1 text-base">
          {siteConfig.person.jobTitles.map((title) => (
            <li key={title}>{title}</li>
          ))}
        </ul>
        
      </section>

      <section className="mt-10 border-t border-line pt-10">
        <h2 className="text-xs tracking-[0.15em] uppercase text-muted">Downloadable Assets</h2>
        <ul className="mt-3 space-y-2">
          {assets.map((asset) => (
            <li key={asset.href}>
              <a href={asset.href} download className="underline underline-offset-4">
                {asset.label}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10 border-t border-line pt-10">
        <h2 className="text-xs tracking-[0.15em] uppercase text-muted">Media Contact</h2>
        <a href={`mailto:${siteConfig.contactEmail}`} className="mt-3 inline-block underline">
          {siteConfig.contactEmail}
        </a>
      </section>
            <section className="mt-10 border-t border-line pt-10">
        <h2 className="text-xs tracking-[0.15em] uppercase text-muted">Usage</h2>
        <p className="mt-3 text-base leading-relaxed text-muted">
          Photographs and bios may be used for editorial coverage of {siteConfig.person.name} and his
          work. Please credit photographs as supplied and avoid crops that change their meaning. For
          any other use, write to{" "}
          <a href={`mailto:${siteConfig.contactEmail}`} className="underline">{siteConfig.contactEmail}</a>.
        </p>
      </section>
    </div>
  );
}