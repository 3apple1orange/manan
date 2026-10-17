"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/** A hairline rule that draws itself from left to right on scroll. */
export default function DrawLine({ className, delay = 0 }: { className?: string; delay?: number }) {
  return (
    <motion.div
      aria-hidden="true"
      className={cn("h-px w-full origin-left bg-line", className)}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 1.4, delay, ease: [0.22, 1, 0.36, 1] }}
    />
  );
}