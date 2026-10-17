import { buildMetadata } from "@/lib/seo";
import { siteConfig, essays } from "@/lib/site-config";
import CardFrame from "@/components/CardFrame";
import Reveal from "@/components/motion/Reveal";
import WordReveal from "@/components/motion/WordReveal";
import DrawLine from "@/components/motion/DrawLine";
import ParallaxHex from "@/components/ParallaxHex";
import LogicProcess from "@/components/LogicProcess";

export const metadata = buildMetadata({
  title: `Ideas and Philosophy | ${siteConfig.person.name}`,
  description: `Essays and notes by ${siteConfig.person.name} on philosophy, identity, mortality, public systems and questions that resist easy answers.`,
  path: "/logic",
});

const howIWork = [
  "I have never been good at the personal brand game. Not the polished posts, not the curated feeds, and definitely not the hashtags. I am more interested in the questions that keep you up at night, the ones that never fit into a pitch deck.",
  "I am drawn to the unglamorous systems: mobility, waste and the public services a city quietly depends on. They are not flashy, but they are the foundations of everything. If a project cannot survive the cold reality of math and unit economics, I am not interested.",
  "Most people spend their time performing. I spend mine in silence, usually overcaffeinated, surrounded by scattered ideas until a pattern finally makes sense. I do not build to impress an audience. I build because something in me demands it.",
];

export default function LogicPage() {
  return (
    <CardFrame backgroundSrc="/images/logic-background.jpeg" backgroundAlt={`${siteConfig.person.name}, working`}>
      <h1 className="sr-only">Logic: ideas and philosophy by {siteConfig.person.name}</h1>

      <div className="relative py-6">
        <Reveal x={-30} y={0} delay={0.6} className="absolute left-0 top-0">
          <span className="text-[10px] tracking-[0.25em] uppercase text-muted">Creativity</span>
        </Reveal>
        <Reveal x={30} y={0} delay={0.6} className="absolute right-0 top-0">
          <span className="text-[10px] tracking-[0.25em] uppercase text-muted">Expertise</span>
        </Reveal>

        <WordReveal
          text="The world has enough spectators. The rest is a matter of consequence."
          className="mx-auto max-w-3xl px-6 pt-8 text-center font-serif text-3xl leading-[1.25] md:text-[2.75rem]"
          stagger={0.06}
          highlight={["consequence"]}
        />
        <Reveal delay={1.2} className="mt-6 text-center">
          <p className="mx-auto max-w-2xl text-sm italic leading-relaxed text-muted">
            Private by disposition, entrepreneurial by circumstance, and perpetually occupied with
            matters of enterprise, philosophy, and the human condition.
          </p>
        </Reveal>
      </div>

      <DrawLine className="mt-16" />

      <section className="grid items-center gap-12 pt-14 md:grid-cols-[1fr_320px]">
        <div>
          <Reveal>
            <p className="text-xs tracking-[0.25em] uppercase text-muted">How I Work</p>
          </Reveal>
          <div className="mt-6 max-w-prose space-y-5 text-base leading-relaxed text-muted">
            {howIWork.map((para, i) => (
              <Reveal key={i} delay={0.12 * i}>
                <p className={i === 0 ? "text-lg text-ink" : undefined}>{para}</p>
              </Reveal>
            ))}
          </div>
        </div>
        <div className="px-4 md:px-0">
          <ParallaxHex src="/images/logic-portrait.jpeg" alt={`${siteConfig.person.name} working`} />
        </div>
      </section>

      <DrawLine className="mt-20" />

      <section className="pt-14">
        <WordReveal as="h2" text="The Process" className="font-serif text-3xl md:text-4xl" />
        <LogicProcess />
      </section>

      <DrawLine className="mt-20" />

      <section className="pt-14">
        <WordReveal as="h2" text="Essays" className="font-serif text-3xl md:text-4xl" />
        {essays.length > 0 ? (
          <div className="mt-8 space-y-10">
            {essays.map((essay, i) => (
              <Reveal key={essay.slug} delay={0.1 * i}>
                <article className="border-t border-line pt-6">
                  <time className="text-xs tracking-[0.15em] uppercase text-muted">{essay.datePublished}</time>
                  <h3 className="mt-2 font-serif text-xl">{essay.title}</h3>
                  <p className="mt-2 text-base leading-relaxed text-muted">{essay.excerpt}</p>
                </article>
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal>
            <p className="mt-6 text-base italic text-muted">
              Long-form essays will appear here as they are finished.
            </p>
          </Reveal>
        )}
      </section>
    </CardFrame>
  );
}