"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

interface HoverNameProps {
  name: string;
  attributes: readonly string[];
}

export default function HoverName({ name, attributes }: HoverNameProps) {
  const words = [name, ...attributes];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const hold = index === 0 ? 3200 : 1800;
    const t = setTimeout(() => setIndex((i) => (i + 1) % words.length), hold);
    return () => clearTimeout(t);
  }, [index, words.length]);

  return (
    <span className="relative inline-grid font-[family-name:var(--font-signature)] text-[3.25rem] leading-[1.1] text-ink sm:text-7xl md:text-8xl">
      <span className="sr-only">{name}</span>

      {words.map((w) => (
        <span key={w} aria-hidden="true" className="invisible col-start-1 row-start-1 px-[0.1em]">
          {w}
        </span>
      ))}

      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          aria-hidden="true"
          initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -12, filter: "blur(6px)" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="col-start-1 row-start-1 px-[0.1em] text-center"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}