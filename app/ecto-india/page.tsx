import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
import JsonLd from "@/components/JsonLd";
import { ectoOrganizationSchema } from "@/lib/schema";
import VenturePageFrame from "@/components/VenturePageFrame";
import VentureSection from "@/components/VentureSection";
import Reveal from "@/components/motion/Reveal";
import WordReveal from "@/components/motion/WordReveal";

const ecto = siteConfig.ecto;
const totalCities = ecto.trialCities.reduce((n, group) => n + group.cities.length, 0);

export const metadata = buildMetadata({
  title: `${ecto.name} | Mobility Venture Founded by ${siteConfig.person.name}`,
  description: ecto.description,
  path: "/ecto-india",
});

const facts = [
  { label: "Stage", value: ecto.stage },
  { label: "Active since", value: ecto.activeSince },
  { label: "Founder", value: ecto.founder },
  { label: "Co-founder", value: ecto.coFounder },
];

export default function EctoPage() {
  return (
    <>
      <JsonLd data={ectoOrganizationSchema()} />

      <VenturePageFrame
        number="01"
        kicker="Venture · Mobility"
        title={ecto.name}
        description={ecto.description}
        imageSrc="/images/ventures/ecto-background.webp"
        imageAlt={`Illustration of an auto-rickshaw in a Tier 2 Indian city, for ${ecto.name}`}
        imageCaption="Illustration"
        highlights={[
          { label: "Stage", value: `Trial in ${totalCities} cities` },
          { label: "Active since", value: ecto.activeSince },
        ]}
      >
        <VentureSection first index="01" label="Overview">
          <dl className="grid grid-cols-2 gap-px border-y border-line bg-line md:grid-cols-4">
            {facts.map((f, i) => (
              <Reveal key={f.label} delay={0.08 * i} y={16} className="bg-paper px-4 py-5">
                <dt className="text-[10px] uppercase tracking-[0.25em] text-muted">{f.label}</dt>
                <dd className="mt-2 font-serif text-lg">{f.value}</dd>
              </Reveal>
            ))}
          </dl>
        </VentureSection>

        <VentureSection index="02" label="Trial cities">
          <WordReveal
            text={`${totalCities} cities. ${ecto.trialCities.length} states. One Android app on trial.`}
            className="font-serif text-3xl leading-[1.15] md:text-4xl lg:text-5xl"
            highlight={["trial"]}
          />
          <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {ecto.trialCities.map((group, i) => (
              <Reveal key={group.state} delay={0.12 * i}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 border-b border-ink pb-3">
                  <h3 className="font-serif text-xl">{group.state}</h3>
                  <span className="text-xs text-muted">{group.cities.length} cities</span>
                </div>
                <ul className="mt-4 space-y-2">
                  {group.cities.map((city) => (
                    <li key={city} className="group flex items-center gap-3 font-serif text-xl md:text-2xl">
                      <span
                        aria-hidden="true"
                        className="h-px w-3 shrink-0 bg-line transition-all duration-500 group-hover:w-6 group-hover:bg-ink"
                      />
                      <span className="min-w-0 break-words">{city}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
          <p className="mt-10 text-sm text-muted">Availability varies by city during the trial.</p>
        </VentureSection>

        <VentureSection index="03" label="The problem">
          <WordReveal
            text="Ride-hailing built for metros does not translate to smaller cities."
            className="font-serif text-2xl leading-snug md:text-4xl"
          />
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-prose text-base leading-relaxed text-muted">
              In Tier 2 and Tier 3 cities, trust, local knowledge and driver economics work
              differently. {ecto.name} is being built around auto-rickshaws specifically, with
              driver-first economics and city-specific operations rather than a
              one-size-fits-all national app.
            </p>
          </Reveal>
        </VentureSection>

        <VentureSection index="04" label="Contact">
          <Reveal>
            <a href={`mailto:${ecto.contactEmail}`} className="group inline-block break-all font-serif text-3xl md:text-5xl">
              {ecto.contactEmail}
              <span className="mt-2 block h-px w-0 bg-ink transition-all duration-700 group-hover:w-full" />
            </a>
            <p className="mt-8 text-sm text-muted">
              Official site:{" "}
              <a href={siteConfig.ectoDomain} target="_blank" rel="noopener" className="text-ink underline underline-offset-4">
                {siteConfig.ectoDomain.replace("https://www.", "")}
              </a>
            </p>
          </Reveal>
        </VentureSection>
      </VenturePageFrame>
    </>
  );
}