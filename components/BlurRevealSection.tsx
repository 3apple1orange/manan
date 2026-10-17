"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";

interface BlurRevealSectionProps {
  children: ReactNode;
  tint: string;
  className?: string;
}

/** Blurs in and slides up as the section scrolls into view, tracking
 *  scroll position continuously (not just a one-time trigger) so the
 *  focus/sharpen feels tied to how far you've scrolled past it. */
export default function BlurRevealSection({ children, tint, className }: BlurRevealSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 95%", "start 45%"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [48, 0]);
  const blur = useTransform(scrollYProgress, [0, 1], [10, 0]);
  const filter = useTransform(blur, (v) => `blur(${v}px)`);

  return (
    <motion.section
      ref={ref}
      style={{ opacity, y, filter, backgroundColor: tint }}
      className={className}
    >
      {children}
    </motion.section>
  );
}