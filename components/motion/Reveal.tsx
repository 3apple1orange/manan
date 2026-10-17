"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  x?: number;
  blur?: number;
}

/** Fades, unblurs and slides content into place once it enters view. */
export default function Reveal({ children, className, delay = 0, y = 28, x = 0, blur = 10 }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, x, filter: `blur(${blur}px)` }}
      whileInView={{ opacity: 1, y: 0, x: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}