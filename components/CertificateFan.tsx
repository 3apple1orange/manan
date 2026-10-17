"use client";

import { motion } from "framer-motion";

/** Certificates fanned like cards. Hover lifts and straightens one;
 *  click opens it full size. */
export default function CertificateFan({ items }: { items: readonly { src: string; alt: string }[] }) {
  const middle = (items.length - 1) / 2;
  return (
    <div className="mt-6 flex items-end pl-2">
      {items.map((cert, i) => (
        <motion.a
          key={cert.src}
          href={cert.src}
          target="_blank"
          rel="noopener"
          aria-label={`View ${cert.alt}`}
          className="relative -ml-6 block w-36 shrink-0 rounded-md border border-paper/20 bg-paper p-1.5 shadow-2xl first:ml-0 md:-ml-8 md:w-44"
          style={{ zIndex: i }}
          initial={{ opacity: 0, y: 30, rotate: 0 }}
          whileInView={{ opacity: 1, y: 0, rotate: (i - middle) * 5 }}
          whileHover={{ y: -14, rotate: 0, scale: 1.06, zIndex: 20 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={cert.src} alt={cert.alt} className="aspect-[4/3] w-full bg-white object-contain" />
        </motion.a>
      ))}
    </div>
  );
}