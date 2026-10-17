import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
import { IDS } from "@/lib/schema";
import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/motion/Reveal";
import WordReveal from "@/components/motion/WordReveal";
import DrawLine from "@/components/motion/DrawLine";
import CopyButton from "@/components/CopyButton";
import LocalTime from "@/components/LocalTime";
import { TextRoll } from "@/components/TextRoll";

export const metadata = buildMetadata({
  title: `Contact | ${siteConfig.person.name}`,
  description: `Contact ${siteConfig.person.name} for press, collaboration and general enquiries, or reach ${siteConfig.ecto.name} directly.`,
  path: "/contact",
});

const email = siteConfig.contactEmail;
const linkedin = siteConfig.person.sameAs.find((url) => url.includes("linkedin.com"));

const routes: { label: string; note: string; email?: string; href?: string; cta?: string }[] = [
  {
    label: "Personal & press",
    note: "Interviews, features, speaking and general enquiries",
    email: siteConfig.contactEmail,
  },
  {
    label: siteConfig.ecto.name,
    note: "Mobility, partnerships, drivers and city trials",
    email: siteConfig.ecto.contactEmail,
  },
  {
    label: siteConfig.ssSolutions.name,
    note: "Municipal and tender-based work. A dedicated address is coming soon",
    email: siteConfig.contactEmail,
  },
    {
    label: siteConfig.book.title,
    note: "Author enquiries, interviews, readings and book clubs",
    email: siteConfig.contactEmail,
  },
  {
    label: "Media kit",
    note: "Bios, photographs and approved facts",
    href: "/media-kit",
    cta: "Open",
  },
];

const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  url: `${siteConfig.domain}/contact`,
  name: `Contact ${siteConfig.person.name}`,
  mainEntity: { "@id": IDS.person },
};

const rowClass =
  "group grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-4 border-b border-line px-0 py-6 transition-colors duration-500 hover:bg-ink hover:text-paper md:px-4";

function RouteRow({ route, index }: { route: (typeof routes)[number]; index: number }) {
  const inner = (
    <>
      <span className="font-serif text-sm italic text-muted transition-colors duration-500 group-hover:text-paper/50">
        0{index + 1}
      </span>
      <span>
        <span className="block font-serif text-2xl md:text-3xl">{route.label}</span>
        <span className="mt-1 block text-sm text-muted transition-colors duration-500 group-hover:text-paper/60">
          {route.note}
        </span>
      </span>
      <span className="flex items-center gap-2 text-sm">
        <span className="hidden md:inline">{route.email ?? route.cta}</span>
        <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
      </span>
    </>
  );

  return route.href ? (
    <Link href={route.href} className={rowClass}>
      {inner}
    </Link>
  ) : (
    <a href={`mailto:${route.email}`} className={rowClass}>
      {inner}
    </a>
  );
}

export default function ContactPage() {
  return (
    <>
      <JsonLd data={contactPageSchema} />

      <div className="px-6 py-20 md:py-28">
        {/* Hero */}
        <section className="mx-auto max-w-6xl">
          <Reveal y={12}>
            <p className="text-xs uppercase tracking-[0.25em] text-muted">Contact</p>
          </Reveal>
          <WordReveal
            as="h1"
            text="Get in touch."
            className="mt-4 font-serif text-6xl leading-[0.95] md:text-8xl"
            stagger={0.1}
            highlight={["touch"]}
            highlightClassName="font-[family-name:var(--font-signature)] text-[1.15em] leading-none text-muted"
          />
          <Reveal delay={0.4}>
            <p className="mt-8 max-w-xl font-serif text-lg italic leading-relaxed text-muted md:text-xl">
              {siteConfig.person.onlinePresence}
            </p>
          </Reveal>

          <Reveal delay={0.6} className="mt-16 md:mt-20">
            <p className="text-[10px] uppercase tracking-[0.25em] text-muted">Write directly</p>
            <a href={`mailto:${email}`} className="group relative mt-4 inline-block">
              <span className="sr-only">{email}</span>
              <TextRoll className="font-serif text-3xl sm:text-4xl md:text-5xl">{email}</TextRoll>
              <span
                aria-hidden="true"
                className="absolute -bottom-2 left-0 h-[2px] w-full origin-left scale-x-0 bg-ink transition-transform duration-700 group-hover:scale-x-100"
              />
            </a>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${email}`}
                className="group inline-flex items-center gap-3 rounded-full bg-ink px-6 py-2.5 text-sm text-paper transition-opacity hover:opacity-85"
              >
                Write an email
                <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
              </a>
              <CopyButton text={email} label="Copy address" />
            </div>
          </Reveal>
        </section>

        {/* Directory */}
        <section className="mx-auto mt-28 max-w-6xl md:mt-36">
          <DrawLine />
          <div className="grid gap-12 pt-14 md:grid-cols-[1fr_2fr] md:gap-16">
            <aside className="self-start md:sticky md:top-28">
              <Reveal>
                <p className="text-xs uppercase tracking-[0.25em] text-muted">Where to write</p>
                <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
                  Each enquiry goes straight to the right inbox.
                </p>
              </Reveal>

              <dl className="mt-10 space-y-6 text-sm">
                <Reveal delay={0.1} y={12}>
                  <dt className="text-[10px] uppercase tracking-[0.25em] text-muted">Based in</dt>
                  <dd className="mt-1 font-serif text-lg">{siteConfig.person.basedIn}</dd>
                </Reveal>
                <Reveal delay={0.2} y={12}>
                  <dt className="text-[10px] uppercase tracking-[0.25em] text-muted">Local time</dt>
                  <dd className="mt-1 font-serif text-lg">
                    <LocalTime />
                  </dd>
                </Reveal>
                {linkedin && (
                  <Reveal delay={0.3} y={12}>
                    <dt className="text-[10px] uppercase tracking-[0.25em] text-muted">Elsewhere</dt>
                    <dd className="mt-1">
                      <a href={linkedin} target="_blank" rel="noopener" className="font-serif text-lg underline decoration-line underline-offset-4 hover:decoration-ink">
                        LinkedIn
                      </a>
                    </dd>
                  </Reveal>
                )}
              </dl>
            </aside>

            <ol className="border-t border-line">
              {routes.map((route, i) => (
                <Reveal key={route.label} delay={0.1 * i} x={-24} y={0}>
                  <li>
                    <RouteRow route={route} index={i} />
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        {/* Sign-off */}
        <Reveal className="mx-auto mt-28 max-w-6xl text-center md:mt-36">
          <p className="text-[10px] uppercase tracking-[0.25em] text-muted">With thanks</p>
          <p className="mt-4 font-[family-name:var(--font-signature)] text-6xl text-muted md:text-7xl">
            {siteConfig.person.name}
          </p>
        </Reveal>
      </div>
    </>
  );
}