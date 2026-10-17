import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
import JsonLd from "@/components/JsonLd";
import { ssSolutionsOrganizationSchema } from "@/lib/schema";
import VenturePageFrame from "@/components/VenturePageFrame";
import VentureSection from "@/components/VentureSection";
import Reveal from "@/components/motion/Reveal";
import WordReveal from "@/components/motion/WordReveal";

const ss = siteConfig.ssSolutions;

export const metadata = buildMetadata({
  title: `${ss.name} | Municipal Operations and Public Systems`,
  description: ss.description,
  path: "/ss-solutions",
});

const facts = [
  { label: "Established", value: ss.established },
  { label: "Structure", value: ss.legalForm },
  { label: "Proprietor", value: ss.proprietor },
];

export default function SsSolutionsPage() {
  return (
    <>
      <JsonLd data={ssSolutionsOrganizationSchema()} />

      <VenturePageFrame
        number="02"
        kicker="Venture · Public Systems"
        title={ss.name}
        description={ss.description}
        imageSrc="/images/ventures/ss-solutions.jpg"
        imageAlt="Illustrative image of municipal and industrial infrastructure"
        // Change to "Kurukshetra, Haryana" once this is a real project photo
        imageCaption="Illustrative image"
        highlights={[
          { label: "Established", value: ss.established },
          { label: "Featured work", value: ss.featuredProject.location },
        ]}
      >
        <VentureSection first index="01" label="Overview">
          <dl className="grid grid-cols-2 gap-px border-y border-line bg-line md:grid-cols-3">
            {facts.map((f, i) => (
              <Reveal key={f.label} delay={0.08 * i} y={16} className="bg-paper px-4 py-5">
                <dt className="text-[10px] uppercase tracking-[0.25em] text-muted">{f.label}</dt>
                <dd className="mt-2 font-serif text-lg">{f.value}</dd>
              </Reveal>
            ))}
          </dl>
        </VentureSection>

        <VentureSection index="02" label="Featured project">
          <WordReveal as="h3" text={ss.featuredProject.title} className="font-serif text-3xl leading-[1.1] md:text-5xl" />
          <Reveal delay={0.15}>
            <p className="mt-4 flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-muted">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-ink" />
              {ss.featuredProject.location}
            </p>
            <p className="mt-8 max-w-prose text-base leading-relaxed text-muted">{ss.featuredProject.summary}</p>
          </Reveal>
        </VentureSection>

        <VentureSection index="03" label="The work">
          <WordReveal
            text="Civic infrastructure is rarely discussed. Cities depend on it every day."
            className="font-serif text-2xl leading-snug md:text-4xl"
            highlight={["every"]}
          />
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-prose text-base leading-relaxed text-muted">
              {ss.name} undertakes municipal and tender-based service work. The focus is
              operational: keeping public systems functional at the scale where they are
              actually used.
            </p>
          </Reveal>
        </VentureSection>

        <VentureSection index="04" label="Enquiries">
          <Reveal>
            <a href={`mailto:${siteConfig.contactEmail}`} className="group inline-block break-all font-serif text-3xl md:text-5xl">
              {siteConfig.contactEmail}
              <span className="mt-2 block h-px w-0 bg-ink transition-all duration-700 group-hover:w-full" />
            </a>
            <p className="mt-8 text-sm text-muted">
              A dedicated {ss.name} address will be added once its own domain is live.
            </p>
          </Reveal>
        </VentureSection>
      </VenturePageFrame>
    </>
  );
}