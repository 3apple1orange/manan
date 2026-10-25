import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
import HeroVideo from "@/components/HeroVideo";
import HoverName from "@/components/HoverName";
import CycleText from "@/components/CycleText";
import Reveal from "@/components/motion/Reveal";

export const metadata = buildMetadata({
  title: `${siteConfig.person.name} | Founder of ECTO India and Writer`,
  description: `${siteConfig.person.name} is the founder of ${siteConfig.ecto.name} and proprietor of ${siteConfig.ssSolutions.name}, working across mobility, public systems, philosophy and writing.`,
  path: "/",
});

const corner = "text-[10px] tracking-[0.25em] uppercase text-muted";
// "Mumbai, India" -> "Mumbai", "San Francisco Bay Area, US" -> "San Francisco Bay Area"
const places = siteConfig.person.locations.map((p) => p.split(",")[0]).join("  ·  ");

export default function HomePage() {
  return (
    <section className="relative grid min-h-[calc(100svh-5rem)] w-full place-items-center px-6 pb-24 pt-14 md:py-16">
      {/* Desktop corners: one short line each */}
      <Reveal x={-24} y={0} delay={0.9} className="absolute left-10 top-8 hidden md:block">
        <span className={corner}>{places}</span>
      </Reveal>
      <Reveal x={24} y={0} delay={0.9} className="absolute right-10 top-8 hidden text-right md:block">
        <CycleText items={siteConfig.person.titles} className={corner} />
      </Reveal>

      <div className="text-center">
        <h1 className="flex flex-col items-center gap-5 md:flex-row md:flex-wrap md:justify-center md:gap-x-7 md:gap-y-2">
          <Reveal delay={0.1} y={16}>
            <span className="font-serif text-xl text-muted sm:text-2xl md:text-3xl">hi, i am</span>
          </Reveal>
          <HeroVideo />
          <Reveal delay={0.35} y={20}>
            <HoverName name={siteConfig.person.name} attributes={siteConfig.person.attributes} />
          </Reveal>
        </h1>

        <Reveal delay={0.7} y={14}>
         <p className="mx-auto mt-8 w-full text-center font-serif text-sm leading-relaxed text-muted md:whitespace-nowrap md:text-base">
  Founder of{" "}
  <Link href="/ecto-india" className="text-ink underline decoration-line underline-offset-4 transition-colors hover:decoration-ink">
    {siteConfig.ecto.name}
  </Link>
  . Proprietor of{" "}
  <Link href="/ss-solutions" className="text-ink underline decoration-line underline-offset-4 transition-colors hover:decoration-ink">
    {siteConfig.ssSolutions.name}
  </Link>
  . Author of{" "}
  <Link href="/writing/meet-me-in-the-backyard" className="text-ink underline decoration-line underline-offset-4 transition-colors hover:decoration-ink">
    <em>{siteConfig.book.title}</em>
  </Link>
  .
</p>
        </Reveal>

        {/* Mobile: the same two details, set quietly under the hero */}
        <Reveal delay={0.9} y={10} className="mt-10 md:hidden">
          <span aria-hidden="true" className="mx-auto block h-px w-10 bg-ink/30" />
          <p className={`${corner} mt-6`}>{places}</p>
          <p className="mt-3">
            <CycleText items={siteConfig.person.titles} className={corner} />
          </p>
        </Reveal>
      </div>

      <div className="absolute inset-x-0 bottom-8 flex justify-center">
        <Reveal delay={1.1} y={10}>
          <Link
            href="/about"
            className="group flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-muted transition-colors hover:text-ink"
          >
            Read the profile
            <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}