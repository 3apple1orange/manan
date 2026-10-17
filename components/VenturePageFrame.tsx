"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";
import Reveal from "@/components/motion/Reveal";
import WordReveal from "@/components/motion/WordReveal";

interface Highlight {
  label: string;
  value: string;
}

interface VenturePageFrameProps {
  number: string;
  kicker: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  /** Be honest here: "Illustration" for artwork, a place name for a real photo */
  imageCaption: string;
  highlights: Highlight[];
  children: ReactNode;
}

export default function VenturePageFrame({
  number,
  kicker,
  title,
  description,
  imageSrc,
  imageAlt,
  imageCaption,
  highlights,
  children,
}: VenturePageFrameProps) {
  const figureRef = useRef<HTMLDivElement>(null);

  // Photo drifts gently inside its frame as you scroll past it
  const { scrollYProgress } = useScroll({ target: figureRef, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "5%"]);

  // Faint background slowly zooms over the whole page
  const { scrollYProgress: pageProgress } = useScroll();
  const bgScale = useTransform(pageProgress, [0, 1], [1, 1.12]);

  return (
    <div className="relative">
      <motion.div aria-hidden="true" className="fixed inset-0 -z-10" style={{ scale: bgScale }}>
        <Image src={imageSrc} alt="" fill sizes="100vw" className="object-cover opacity-[0.18] grayscale" priority />
      </motion.div>

      <motion.article
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 mx-auto my-6 max-w-6xl border border-line bg-paper shadow-[0_40px_120px_-60px_rgba(0,0,0,0.45)] md:my-10"
      >
        {/* First screen: everything here fits the viewport on desktop */}
        <header className="grid gap-8 p-6 md:p-10 lg:min-h-[calc(100vh-11rem)] lg:min-h-[540px] lg:grid-cols-[5fr_7fr] lg:gap-12">
          <div className="flex flex-col justify-between gap-10">
            <div>
              <Reveal y={12}>
                <p className="text-xs uppercase tracking-[0.25em] text-muted">
                  N° {number} · {kicker}
                </p>
              </Reveal>
              <WordReveal
                as="h1"
                text={title}
                className={`mt-5 font-serif leading-[1] ${
                  title.length > 16 ? "text-4xl md:text-5xl lg:text-[3.5rem]" : "text-5xl md:text-7xl"
                }`}
                stagger={0.08}
                delay={0.2}
              />
              <Reveal delay={0.5}>
                <p className="mt-6 max-w-md font-serif text-lg italic leading-relaxed text-muted md:text-xl">
                  {description}
                </p>
              </Reveal>
            </div>

            <div>
              <dl className="grid grid-cols-2 gap-px border-y border-line bg-line">
                {highlights.map((h, i) => (
                  <Reveal key={h.label} delay={0.7 + i * 0.1} y={12} blur={4} className="bg-paper px-3 py-4 first:pl-0">
                    <dt className="text-[10px] uppercase tracking-[0.25em] text-muted">{h.label}</dt>
                    <dd className="mt-1 font-serif text-base md:text-lg">{h.value}</dd>
                  </Reveal>
                ))}
              </dl>
              <Reveal delay={1.1} y={8} className="mt-6 hidden items-center gap-3 lg:flex">
                <span className="text-[10px] uppercase tracking-[0.25em] text-muted">Scroll</span>
                <motion.span
                  aria-hidden="true"
                  className="block h-px w-16 origin-left bg-ink/40"
                  animate={{ scaleX: [0.2, 1, 0.2] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                />
              </Reveal>
            </div>
          </div>

          <figure className="flex min-h-0 flex-col">
            <motion.div
              ref={figureRef}
              initial={{ clipPath: "inset(10% 10% 10% 10%)", opacity: 0 }}
              animate={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }}
              transition={{ duration: 1.4, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="relative aspect-[4/3] w-full border border-ink p-2 md:p-3 lg:aspect-auto lg:min-h-0 lg:flex-1"
            >
              <div className="relative h-full w-full overflow-hidden bg-line">
                <motion.div
                  className="absolute inset-0"
                  style={{ y: imageY }}
                  initial={{ scale: 1.25 }}
                  animate={{ scale: 1.12 }}
                  transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Image src={imageSrc} alt={imageAlt} fill sizes="(max-width: 1024px) 92vw, 680px" className="object-cover" priority />
                </motion.div>
              </div>
            </motion.div>
            <figcaption className="mt-3 flex justify-between text-[10px] uppercase tracking-[0.25em] text-muted">
              <span>Fig. {number}</span>
              <span>{imageCaption}</span>
            </figcaption>
          </figure>
        </header>

        <div className="border-t border-line px-6 pb-16 md:px-10 md:pb-24">{children}</div>
      </motion.article>
    </div>
  );
}