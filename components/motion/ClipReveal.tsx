"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

/** Opens a block like a window: starts as a small rounded inset
 *  and expands to full size as it scrolls into view. */
export default function ClipReveal({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ clipPath: "inset(14% 10% 14% 10% round 48px)", opacity: 0.4 }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0% round 28px)", opacity: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}