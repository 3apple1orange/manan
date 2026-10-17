"use client";

import { motion } from "framer-motion";
import { TextRoll } from "@/components/TextRoll";

const numerals = ["I", "II", "III", "IV", "V", "VI", "VII"];

export default function BookThemes({ themes }: { themes: readonly string[] }) {
  return (
    <ol className="mt-10">
      {themes.map((theme, i) => (
        <motion.li
          key={theme}
          className="group relative flex items-baseline gap-5 py-5 md:gap-8 lg:gap-10"
          initial={{ opacity: 0, x: -40, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.9, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.span
            aria-hidden="true"
            className="absolute left-0 right-0 top-0 h-px origin-left bg-line"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: i * 0.08 + 0.1, ease: [0.22, 1, 0.36, 1] }}
          />
          <span className="w-8 shrink-0 font-serif text-sm italic text-muted md:w-10">{numerals[i]}</span>
          <span className="min-w-0 flex-1 font-serif text-[2.1rem] leading-[1.1] md:text-5xl lg:text-6xl">
            <span className="sr-only">{theme}</span>
            <TextRoll>{theme}</TextRoll>
          </span>
          <span
            aria-hidden="true"
            className="hidden translate-x-[-8px] text-2xl text-muted opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100 lg:inline"
          >
            →
          </span>
        </motion.li>
      ))}
    </ol>
  );
}