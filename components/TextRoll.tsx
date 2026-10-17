"use client";

import { motion } from "framer-motion";
import type React from "react";
import { cn } from "@/lib/utils";

const STAGGER = 0.035;

/** Letters roll up on hover. Built word by word; words never break
 *  internally, so lines only wrap between whole words. */
export const TextRoll: React.FC<{ children: string; className?: string; center?: boolean }> = ({
  children,
  className,
  center = false,
}) => {
  const words = children.split(" ");
  const total = children.length;
  const starts: number[] = [];
  words.reduce((pos, word) => {
    starts.push(pos);
    return pos + word.length + 1;
  }, 0);

  const delayFor = (i: number) => (center ? STAGGER * Math.abs(i - (total - 1) / 2) : STAGGER * i);

  return (
    <motion.span initial="initial" whileHover="hovered" aria-hidden="true" className={cn("inline", className)}>
      {words.map((word, w) => (
        <span key={w}>
          <span
            className="relative inline-block overflow-hidden whitespace-nowrap align-bottom"
            style={{ lineHeight: 1.1 }}
          >
            <span className="block whitespace-nowrap">
              {word.split("").map((l, i) => (
                <motion.span
                  key={i}
                  className="inline-block"
                  variants={{ initial: { y: 0 }, hovered: { y: "-100%" } }}
                  transition={{ ease: "easeInOut", delay: delayFor(starts[w] + i) }}
                >
                  {l}
                </motion.span>
              ))}
            </span>
            <span className="absolute inset-0 block whitespace-nowrap">
              {word.split("").map((l, i) => (
                <motion.span
                  key={i}
                  className="inline-block"
                  variants={{ initial: { y: "100%" }, hovered: { y: 0 } }}
                  transition={{ ease: "easeInOut", delay: delayFor(starts[w] + i) }}
                >
                  {l}
                </motion.span>
              ))}
            </span>
          </span>
          {w < words.length - 1 && " "}
        </span>
      ))}
    </motion.span>
  );
};