"use client";

import { motion, type Variants } from "framer-motion";
import { siteConfig } from "@/lib/site-config";

const steps = [
  {
    title: "Isolate the Signal",
    description:
      "I strip away the narratives, the hashtags and the noise. If an idea cannot survive the cold math of unit economics and physical reality, it is discarded immediately.",
    paths: ["M20 2V38", "M2 20H38", "M2 38L38 2"],
  },
  {
    title: "Obsessive Incubation",
    description:
      "I work in the silence between the lines, overcaffeinated, living with scattered ideas until a coherent pattern finally emerges.",
    paths: ["M20 2V38", "M2 20H38", "M2 2A36 36 0 0 1 38 38"],
  },
  {
    title: "Forge the Prototype",
    description: `Whether it is an auto-rickshaw platform on trial in eleven cities or a sweeping contract in Kurukshetra, the prototype is the only argument that matters.`,
    paths: ["M2 20H38", "M20 2A18 18 0 0 1 20 38Z"],
  },
  {
    title: "Silent Deployment",
    description:
      "I do not announce milestones. I deliver infrastructure that works. The impact is the only notification the world receives. The work speaks for itself.",
    paths: ["M20 2V38", "M2 20H38", "M2 2L38 38"],
  },
];

const container: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.15 } } };
const card: Variants = {
  hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};
const draw: Variants = {
  hidden: { pathLength: 0 },
  show: { pathLength: 1, transition: { duration: 1.4, ease: [0.65, 0, 0.35, 1], delay: 0.3 } },
};

export default function LogicProcess() {
  return (
    <motion.ol
      className="mt-12 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      aria-label={`${siteConfig.person.name}'s process`}
    >
      {steps.map((step, i) => (
        <motion.li
          key={step.title}
          variants={card}
          whileHover="hover"
          className="group relative bg-paper p-6 transition-colors duration-500 hover:bg-ink hover:text-paper"
        >
          <div className="flex items-start justify-between">
            <motion.div
              className="flex h-14 w-14 items-center justify-center border border-current"
              variants={{ hidden: { rotate: 0 }, show: { rotate: 0 }, hover: { rotate: 90 } }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <svg width="28" height="28" viewBox="0 0 40 40" fill="none" aria-hidden="true">
                {step.paths.map((d) => (
                  <motion.path key={d} d={d} stroke="currentColor" strokeWidth="1.2" variants={draw} />
                ))}
              </svg>
            </motion.div>
            <span className="font-serif text-3xl text-muted transition-colors duration-500 group-hover:text-paper/40">
              0{i + 1}
            </span>
          </div>
          <h3 className="mt-8 font-serif text-xl">{step.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted transition-colors duration-500 group-hover:text-paper/70">
            {step.description}
          </p>
        </motion.li>
      ))}
    </motion.ol>
  );
}