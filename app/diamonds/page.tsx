import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
import VenturePageFrame from "@/components/VenturePageFrame";
import VentureSection from "@/components/VentureSection";
import HrdGallery from "@/components/HrdGallery";
import Reveal from "@/components/motion/Reveal";

const d = siteConfig.diamonds;

export const metadata = buildMetadata({
  title: `${d.name} | ${siteConfig.person.name}`,
  description: `Diamond sourcing, cross-border commerce and Rapaport-based pricing across ${d.markets.join(", ")}, with a foundation at ${d.foundation}.`,
  path: "/diamonds",
});

// Company and role only appear once they are filled in site-config.ts
const facts = [
  ...(d.company ? [{ label: "Company", value: d.company }] : []),
  ...(d.role ? [{ label: "Role", value: d.role }] : []),
  { label: "Foundation", value: d.foundation },
  { label: "Pricing", value: d.pricing },
  { label: "Markets", value: d.markets.join(" · ") },
];

export default function DiamondsPage() {
  return (
    <VenturePageFrame
      number="03"
      kicker="Venture · Trade"
      title={d.name}
      description={d.summary}
      imageSrc={d.videoPoster}
      imageAlt="Manan Singla at HRD Antwerp"
      imageCaption="HRD Antwerp"
      highlights={[
        { label: "Foundation", value: d.foundation },
        { label: "Markets", value: d.markets.join(" · ") },
      ]}
    >
      {/* 01 · Overview */}
      <VentureSection first index="01" label="Overview">
        <Reveal>
          <p className="max-w-prose font-serif text-xl leading-relaxed md:text-2xl">{d.description}</p>
        </Reveal>
        <dl className="mt-12 grid grid-cols-2 gap-px border-y border-line bg-line md:grid-cols-3">
          {facts.map((f, i) => (
            <Reveal key={f.label} delay={0.08 * i} y={16} className="bg-paper px-4 py-5">
              <dt className="text-[10px] uppercase tracking-[0.25em] text-muted">{f.label}</dt>
              <dd className="mt-2 font-serif text-lg">{f.value}</dd>
            </Reveal>
          ))}
        </dl>
      </VentureSection>

      {/* 02 · At HRD Antwerp: video and photos in one row */}
      <VentureSection index="02" label="At HRD Antwerp">
        <HrdGallery video={d.video} poster={d.videoPoster} photos={d.photos} />
        <Reveal delay={0.2}>
          <p className="mt-5 text-sm text-muted">Training and certification at HRD Antwerp, Belgium.</p>
        </Reveal>
      </VentureSection>

      {/* 03 · Enquiries */}
      <VentureSection index="03" label="Enquiries">
        <Reveal>
          <a
            href={`mailto:${siteConfig.contactEmail}`}
            className="group inline-block break-all font-serif text-3xl md:text-5xl"
          >
            {siteConfig.contactEmail}
            <span className="mt-2 block h-px w-0 bg-ink transition-all duration-700 group-hover:w-full" />
          </a>
        </Reveal>
      </VentureSection>
    </VenturePageFrame>
  );
}