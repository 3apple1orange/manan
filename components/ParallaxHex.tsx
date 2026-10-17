"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const HEX = "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)";
const HEX_SMALL = "polygon(50% 40%, 60% 45%, 60% 55%, 50% 60%, 40% 55%, 40% 45%)";

export default function ParallaxHex({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.18, 1.05, 1.12]);
  const outlineRotate = useTransform(scrollYProgress, [0, 1], [-6, 6]);

  return (
    <div ref={ref} className="relative aspect-[4/5] w-full">
      <motion.svg
        aria-hidden="true"
        viewBox="0 0 100 125"
        preserveAspectRatio="none"
        className="absolute -inset-3 h-[calc(100%+1.5rem)] w-[calc(100%+1.5rem)] text-ink/30"
        style={{ rotate: outlineRotate }}
      >
        <motion.path
          d="M50 1 L99 32 L99 93 L50 124 L1 93 L1 32 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.4"
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2.2, ease: [0.65, 0, 0.35, 1], delay: 0.4 }}
        />
      </motion.svg>

      <motion.div
        className="relative h-full w-full overflow-hidden bg-line"
        initial={{ clipPath: HEX_SMALL }}
        whileInView={{ clipPath: HEX }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.img
          src={src}
          alt={alt}
          className="h-full w-full object-cover grayscale"
          style={{ y: imageY, scale: imageScale }}
        />
      </motion.div>
    </div>
  );
}