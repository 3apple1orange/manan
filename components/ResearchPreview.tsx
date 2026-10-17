"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface ResearchPreviewProps {
  src: string;
  alt: string;
  caption: string;
}

/** The paper's first page, set like a sheet on a desk: two pages stacked
 *  behind it, a gentle tilt that follows the scroll, and a lift on hover. */
export default function ResearchPreview({ src, alt, caption }: ResearchPreviewProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rotate = useTransform(scrollYProgress, [0, 1], [-4, 2]);
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <figure ref={ref} className="relative mx-auto w-full max-w-sm">
      <motion.div
        style={{ rotate, y }}
        initial={{ opacity: 0, scale: 0.92 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="relative"
      >
        {/* Pages stacked underneath */}
        <div aria-hidden="true" className="absolute inset-0 translate-x-3 translate-y-3 rotate-[3deg] border border-line bg-paper" />
        <div aria-hidden="true" className="absolute inset-0 translate-x-1.5 translate-y-1.5 rotate-[1.5deg] border border-line bg-paper" />

        <motion.div
          whileHover={{ scale: 1.03, y: -6 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative aspect-[1/1.3] w-full overflow-hidden border border-ink/70 bg-white p-3 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.45)]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={alt} className="h-full w-full object-cover object-top" />
        </motion.div>
      </motion.div>
      <figcaption className="mt-8 text-center text-[10px] uppercase tracking-[0.25em] text-muted">{caption}</figcaption>
    </figure>
  );
}