"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

/** Shows one phrase at a time, quietly fading to the next. */
export default function CycleText({
  items,
  interval = 2800,
  className,
}: {
  items: readonly string[];
  interval?: number;
  className?: string;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setIndex((i) => (i + 1) % items.length), interval);
    return () => clearTimeout(t);
  }, [index, items.length, interval]);

  return (
    <span className={className}>
      <span className="sr-only">{items.join(", ")}</span>
      <AnimatePresence mode="wait">
        <motion.span
          key={items[index]}
          aria-hidden="true"
          className="inline-block"
          initial={{ opacity: 0, y: 6, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -6, filter: "blur(4px)" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {items[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}