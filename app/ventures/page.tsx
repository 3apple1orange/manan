import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
import { TextRoll } from "@/components/TextRoll";
import BlurRevealSection from "@/components/BlurRevealSection";

export const metadata = buildMetadata({
  title: `${siteConfig.ecto.name} and ${siteConfig.ssSolutions.name} | ${siteConfig.person.name}`,
  description: `Explore the ventures of ${siteConfig.person.name}: ${siteConfig.ecto.name}, ${siteConfig.ssSolutions.name}, and ${siteConfig.diamonds.name}.`,
  path: "/ventures",
});

const strip = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

type Venture = {
  id: string;
  n: string;
  kicker: string;
  tint: string;
  numeralSide: "left" | "right";
  name: string;
  roleLabel: string;
  role: string;
  description: string;
  facts: { label: string; value: string }[];
  website: string;
  href: string;
};

const d = siteConfig.diamonds;

const ventures: Venture[] = [
  {
    id: "ecto",
    n: "01",
    kicker: "Mobility",
    tint: "rgba(30, 58, 196, 0.13)",
    numeralSide: "left",
    name: siteConfig.ecto.name,
    roleLabel: "Role",
    role: "Founder",
    description: siteConfig.ecto.description,
    facts: [{ label: "Stage", value: siteConfig.ecto.stage }],
    website: siteConfig.ectoDomain,
    href: "/ecto-india",
  },
  {
    id: "ss-solutions",
    n: "02",
    kicker: "Public Systems",
    tint: "rgba(122, 28, 196, 0.13)",
    numeralSide: "right",
    name: siteConfig.ssSolutions.name,
    roleLabel: "Proprietor",
    role: siteConfig.ssSolutions.proprietor,
    description: siteConfig.ssSolutions.description,
    facts: [{ label: "Legal form", value: siteConfig.ssSolutions.legalForm }],
    website: siteConfig.ssSolutions.website,
    href: "/ss-solutions",
  },
  {
    id: "diamonds",
    n: "03",
    kicker: "Trade",
    tint: "rgba(5, 122, 85, 0.13)",
    numeralSide: "left",
    name: d.name,
    roleLabel: "Role",
    role: d.role,
    description: d.description,
    facts: [
      ...(d.company ? [{ label: "Company", value: d.company as string }] : []),
      { label: "Foundation", value: d.foundation },
      { label: "Pricing", value: d.pricing },
      { label: "Markets", value: d.markets.join(" · ") },
    ],
    website: d.website,
    href: "/diamonds",
  },
];

export default function VenturesPage() {
  return (
    <div className="px-4 py-16 md:px-6 md:py-28">
      <header className="mx-auto max-w-3xl px-2 text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-muted">Ventures</p>
        <h1 className="mt-4 font-serif text-4xl leading-tight md:text-6xl">
          <span className="sr-only">Systems, built and run.</span>
          <TextRoll center>Systems, built and run.</TextRoll>
        </h1>
        <p className="mx-auto mt-6 max-w-prose font-serif text-lg italic text-muted md:text-xl">
          Mobility, public systems and trade: moving people, keeping cities clean, and pricing what is rare.
        </p>
      </header>

      {ventures.map((v, i) => (
        <div key={v.id} id={v.id}>
          <BlurRevealSection tint={v.tint} className={`relative ${i === 0 ? "mt-16 md:mt-28" : "mt-4"}`}>
            <div className="relative mx-auto max-w-6xl overflow-hidden px-6 py-12 md:px-12 md:py-16 lg:py-20">
              <span
                aria-hidden="true"
                className={`pointer-events-none absolute -top-3 select-none font-serif text-[6rem] leading-none text-ink opacity-[0.04] md:text-[10rem] lg:-top-6 lg:text-[14rem] ${
                  v.numeralSide === "left" ? "left-2 md:left-6" : "right-2 md:right-6"
                }`}
              >
                {v.n}
              </span>

              {/* Stacked until 1024px, side by side above */}
              <div className="relative grid items-start gap-8 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
                <div>
                  <span className="text-xs uppercase tracking-[0.2em] text-muted">
                    {v.n} — {v.kicker}
                  </span>
                  <h2 className="mt-3 font-serif text-4xl leading-[1.05] sm:text-5xl lg:text-5xl xl:text-6xl">
                    <span className="sr-only">{v.name}</span>
                    <TextRoll>{v.name}</TextRoll>
                  </h2>
                  {v.role && (
                    <>
                      <p className="mt-6 text-sm text-muted">{v.roleLabel}</p>
                      <p className="font-serif text-xl">{v.role}</p>
                    </>
                  )}
                </div>

                <div>
                  <p className="font-serif text-lg leading-relaxed md:text-xl lg:text-2xl first-letter:float-left first-letter:mr-3 first-letter:font-serif first-letter:text-6xl first-letter:leading-[0.8] lg:first-letter:text-7xl">
                    {v.description}
                  </p>

                  <dl className="mt-8 grid grid-cols-1 gap-5 border-t border-line pt-6 text-sm sm:grid-cols-2 lg:mt-10">
                    {v.facts.map((f) => (
                      <div key={f.label}>
                        <dt className="text-xs uppercase tracking-[0.15em] text-muted">{f.label}</dt>
                        <dd className="mt-1">{f.value}</dd>
                      </div>
                    ))}
                    {v.website && (
                      <div>
                        <dt className="text-xs uppercase tracking-[0.15em] text-muted">Website</dt>
                        <dd className="mt-1">
                          <a href={v.website} target="_blank" rel="noopener" className="underline underline-offset-4">
                            {strip(v.website)}
                          </a>
                        </dd>
                      </div>
                    )}
                  </dl>

                  <Link href={v.href} className="mt-8 inline-block font-serif text-lg underline underline-offset-4">
                    More on {v.name} →
                  </Link>
                </div>
              </div>
            </div>
          </BlurRevealSection>
        </div>
      ))}
    </div>
  );
}