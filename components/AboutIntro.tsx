import { siteConfig } from "@/lib/site-config";
import Reveal from "@/components/motion/Reveal";
import WordReveal from "@/components/motion/WordReveal";

export default function AboutIntro() {
  return (
    <section>
      <Reveal>
        <p className="text-xs tracking-[0.25em] uppercase text-muted">N° 01 — About</p>
      </Reveal>

      <WordReveal
        as="h2"
        text="The world is an arrangement. Not an absolute."
        className="mt-4 font-serif text-4xl leading-[1.05] md:text-6xl"
        stagger={0.06}
        highlight={["absolute"]}
        highlightClassName="italic text-muted"
      />

      <WordReveal
        text="I build what moves a city, and write about what moves a mind."
        className="mt-10 font-serif text-2xl md:text-[2rem] leading-[1.35]"
        delay={0.2}
        stagger={0.04}
        highlight={["mind"]}
      />

      <Reveal delay={0.5} y={10}>
        <p className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] uppercase tracking-[0.25em] text-muted">
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-ink" />
          Based in {siteConfig.person.locations.join("  ·  ")}
        </p>
      </Reveal>

      <div className="mt-14 max-w-prose font-serif text-lg leading-[1.85] text-ink/80 md:text-xl md:leading-[1.8]">
        <Reveal>
          <p className="first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-7xl first-letter:leading-[0.8] first-letter:text-ink">
            Every city is an accumulation of decisions disguised as geography. Every market, an
            agreement about value. Every identity, a story repeated so often that it begins to
            resemble an unquestionable truth.
          </p>
        </Reveal>

        <Reveal>
          <blockquote className="my-14">
            <p className="text-2xl italic leading-snug text-ink md:text-[1.9rem]">
              Most people accept the world as it is. I would rather understand how it came to be.
            </p>
          </blockquote>
        </Reveal>

        <Reveal>
          <p>
            That curiosity extends beyond streets and systems. It follows me into the intricate
            arithmetic of commerce, the precision of diamonds, and the quieter architecture of the
            human mind. Building teaches me how the world works; writing allows me to question why we
            so readily accept it.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-7">
            A rather limited presence online. I prefer unhurried conversations, enduring work, and
            questions that seldom fit into conventional definitions of success.
          </p>
        </Reveal>

        <Reveal>
          <p className="mt-14 text-xl italic leading-snug text-ink md:text-2xl">
            Streets, stones, sentences. Different materials, one disposition.
          </p>
        </Reveal>
      </div>
    </section>
  );
}