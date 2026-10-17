"use client";

import { motion } from "framer-motion";
import type { ElementType } from "react";
import { cn } from "@/lib/utils";

interface WordRevealProps {
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  stagger?: number;
  /** Words (without punctuation) to set in the signature script */
  highlight?: string[];
  highlightClassName?: string;
}

const clean = (w: string) => w.replace(/[^a-z0-9]/gi, "").toLowerCase();

/** Words rise out of a mask one after another with a soft blur.
 *  The text stays real, selectable and readable by Google. */
export default function WordReveal({
  text,
  as: Tag = "p",
  className,
  delay = 0,
  stagger = 0.045,
  highlight = [],
  highlightClassName = "font-[family-name:var(--font-signature)] text-[1.3em] leading-none text-muted",
}: WordRevealProps) {
  const marked = new Set(highlight.map(clean));
  const words = text.split(" ");

  return (
    <Tag className={className}>
      <motion.span
        className="inline"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: stagger, delayChildren: delay } },
        }}
      >
      {words.map((word, i) => (
          <span key={i}>
            <span className="inline-block overflow-hidden pb-[0.12em] align-top">
              <motion.span
                className={cn("inline-block", marked.has(clean(word)) && highlightClassName)}
                variants={{
                  hidden: { y: "105%", opacity: 0, filter: "blur(6px)" },
                  show: { y: "0%", opacity: 1, filter: "blur(0px)" },
                }}
                transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              >
                {word}
              </motion.span>
            </span>
            {i < words.length - 1 && " "}
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}