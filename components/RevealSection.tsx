"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface RevealSectionProps {
  children: ReactNode;
  tint: string; // rgba string, e.g. "rgba(65, 54, 178, 0.06)"
  className?: string;
}

/** Fades + slides a section into view as it scrolls into the viewport,
 *  with a low-opacity color wash behind it. Reveal only triggers once. */
export default function RevealSection({ children, tint, className }: RevealSectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={className}
      style={{ backgroundColor: tint }}
    >
      {children}
    </motion.section>
  );
}