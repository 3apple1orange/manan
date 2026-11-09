"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { researchEndorsement as e, researchPapers } from "@/lib/site-config";

const GOLD = "#d8c28f";
const ease = [0.22, 1, 0.36, 1] as const;
const HIGHLIGHT = new Set(["nuanced", "perspective"]);
const clean = (w: string) => w.replace(/[^a-z]/gi, "").toLowerCase();

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.03, delayChildren: 0.3 } },
};
const wordV: Variants = {
  hidden: { y: "105%", opacity: 0, filter: "blur(6px)" },
  show: { y: "0%", opacity: 1, filter: "blur(0px)", transition: { duration: 0.8, ease } },
};
const fade = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.9, delay, ease },
});

export default function ResearchEndorsement() {
  const paper = researchPapers[0];
  const words = e.quote.split(" ");

  return (
    <motion.section
      id="endorsement"
      aria-labelledby="endorsement-title"
      initial={{ opacity: 0, y: 40, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1.1, ease }}
      className="relative scroll-mt-28 overflow-hidden rounded-[2rem] text-paper"
      style={{ backgroundColor: e.tone }}
    >
      <div aria-hidden="true" className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-paper/[0.07] blur-3xl" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-40 h-96 w-96 rounded-full blur-3xl"
        style={{ backgroundColor: "rgba(216, 194, 143, 0.08)" }}
      />

      <div className="relative px-6 py-10 sm:px-10 md:py-14 lg:px-16 lg:py-16">
        {/* Header strip */}
        <motion.div {...fade(0.1)} className="flex items-center justify-between gap-4 border-b border-paper/15 pb-6">
          <h2 id="endorsement-title" className="text-[11px] uppercase tracking-[0.3em] text-paper/85">
            {e.label}
          </h2>
          <span className="text-[11px] uppercase tracking-[0.3em] text-paper/50">{e.date}</span>
        </motion.div>

        {/* Quote */}
        <motion.blockquote
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="max-w-4xl pt-10 font-serif text-[1.75rem] leading-[1.2] sm:text-4xl md:pt-14 lg:text-[2.75rem] lg:leading-[1.15]"
        >
          {words.map((w, i) => {
            const text = i === 0 ? `“${w}` : i === words.length - 1 ? `${w}”` : w;
            const marked = HIGHLIGHT.has(clean(w));
            return (
              <span key={i}>
                <span className="inline-block overflow-hidden pb-[0.1em] align-top">
                  <motion.span
                    variants={wordV}
                    className={`inline-block ${marked ? "italic" : ""}`}
                    style={marked ? { color: GOLD } : undefined}
                  >
                    {text}
                  </motion.span>
                </span>
                {i < words.length - 1 && " "}
              </span>
            );
          })}
        </motion.blockquote>

        {/* Who, what, closing line */}
        <motion.div
          {...fade(0.8)}
          className="mt-12 grid gap-8 border-t border-paper/15 pt-8 md:mt-16 lg:grid-cols-[1.1fr_1fr_1.3fr] lg:gap-12"
        >
          <div>
            <span
              className="block font-[family-name:var(--font-signature)] text-5xl leading-none md:text-6xl"
              style={{ color: GOLD }}
            >
              {e.name}
            </span>
            <span className="mt-4 block text-sm leading-relaxed text-paper/75">
              {e.role}
              <br />
              {e.institution}
            </span>
          </div>

          <div>
            <span className="block text-[10px] uppercase tracking-[0.25em] text-paper/50">Endorsed work</span>
            <span className="mt-2 block font-serif text-base italic leading-relaxed">{paper?.title}</span>
          </div>

          <p className="font-serif text-base italic leading-relaxed text-paper/75">“{e.secondQuote}”</p>
        </motion.div>

        {/* The letter itself */}
        {e.letterUrl && (
          <motion.a
            {...fade(1)}
            href={e.letterUrl}
            target="_blank"
            rel="noopener"
            aria-label={`Open the letter of endorsement from ${e.name} (PDF, opens in a new tab)`}
            className="group mt-12 grid items-center gap-8 rounded-2xl border border-paper/15 bg-paper/[0.04] p-6 transition-colors duration-500 hover:bg-paper/[0.08] sm:grid-cols-[150px_1fr] md:mt-14 md:p-8"
          >
            <div className="relative mx-auto w-32 sm:w-full">
              <div
                aria-hidden="true"
                className="absolute inset-0 translate-x-2 translate-y-2 rotate-3 rounded-md bg-paper/20"
              />
              <Image
                src={e.letterPreview}
                alt={`First page of the letter of endorsement from ${e.name}`}
                width={935}
                height={1210}
                className="relative h-auto w-full rounded-md shadow-2xl transition-transform duration-700 group-hover:-translate-y-1 group-hover:-rotate-1"
              />
            </div>

            <div className="text-center sm:text-left">
              <span className="block text-[10px] uppercase tracking-[0.25em] text-paper/50">
                The letter · {e.letterPages} pages · PDF
              </span>
              <span className="mt-2 block font-serif text-2xl md:text-3xl">Read the full letter</span>
              <span className="mt-2 block text-sm text-paper/70">
                From {e.name}, {e.date}.
              </span>
              <span
                className="mt-6 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm"
                style={{ backgroundColor: GOLD, color: e.tone }}
              >
                Open letter
                <span className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
              </span>
            </div>
          </motion.a>
        )}
      </div>
    </motion.section>
  );
}