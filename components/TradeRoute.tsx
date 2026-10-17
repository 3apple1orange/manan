"use client";

import { motion } from "framer-motion";

/** The route as a single line of cities, fading in one after another. */
export default function TradeRoute({ stops }: { stops: readonly { city: string; role: string }[] }) {
  return (
    <ol className="mt-10 flex flex-wrap items-baseline gap-x-4 gap-y-2 font-serif text-xl md:text-2xl">
      {stops.map((stop, i) => (
        <motion.li
          key={stop.city}
          className="flex items-baseline gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8, delay: i * 0.15 }}
        >
          <span title={stop.role}>{stop.city}</span>
          {i < stops.length - 1 && (
            <span aria-hidden="true" className="text-base text-paper/30">
              →
            </span>
          )}
        </motion.li>
      ))}
    </ol>
  );
}