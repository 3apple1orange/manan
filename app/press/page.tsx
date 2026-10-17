import { buildMetadata } from "@/lib/seo";
import { siteConfig, pressItems, type PressCategory } from "@/lib/site-config";

export const metadata = buildMetadata({
  title: `Press and Media | ${siteConfig.person.name}`,
  description: `Selected media coverage, interviews and press information for ${siteConfig.person.name}, ${siteConfig.ecto.name} and ${siteConfig.book.title}.`,
  path: "/press",
});

const categories: PressCategory[] = [
  "Earned editorial",
  "Interview",
  "Podcast",
  "Speaking appearance",
  "Sponsored/partner content",
  "Press release",
  "Classification pending",
];

export default function PressPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-20 md:py-28">
      <header className="text-center">
        <p className="text-xs tracking-[0.2em] uppercase text-muted">Press</p>
        <h1 className="mt-4 font-serif text-4xl md:text-6xl leading-tight">Press &amp; Media</h1>
        <p className="mt-6 max-w-prose mx-auto text-lg text-muted font-serif italic">
          Coverage, interviews and appearances, with earned and sponsored content clearly separated.
        </p>
      </header>

      <div className="mt-16 space-y-14">
        {categories.map((category) => {
          const items = pressItems.filter((item) => item.category === category);
          if (items.length === 0) return null;
          return (
            <section key={category} className="border-t border-line pt-8">
              <h2 className="text-xs tracking-[0.15em] uppercase text-muted">{category}</h2>
              <ul className="mt-4 space-y-4">
                {items.map((item) => (
                  <li key={item.url}>
                    <a href={item.url} target="_blank" rel="noopener nofollow" className="font-serif text-xl underline underline-offset-4">
                      {item.title}
                    </a>
                    <p className="text-sm text-muted">{item.outlet} · {item.date}</p>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>

      <p className="mt-16 text-center text-sm text-muted">
        Press enquiries:{" "}
        <a href={`mailto:${siteConfig.contactEmail}`} className="underline">{siteConfig.contactEmail}</a>
      </p>
    </div>
  );
}