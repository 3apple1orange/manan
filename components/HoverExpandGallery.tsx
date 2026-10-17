"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface GalleryImage {
  src: string;
  alt: string;
  label: string;
}

export default function HoverExpandGallery({
  images,
  className,
}: {
  images: GalleryImage[];
  className?: string;
}) {
  const [activeImage, setActiveImage] = useState<number | null>(0);

  return (
    <motion.div
      initial={{ opacity: 0, translateY: 20 }}
      whileInView={{ opacity: 1, translateY: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.4 }}
      className={cn("relative w-full", className)}
    >
      <div className="flex w-full items-center justify-center gap-1 overflow-x-auto">
        {images.map((image, index) => (
          <motion.div
            key={image.src}
            className="relative cursor-pointer overflow-hidden rounded-2xl shrink-0 bg-line"
            initial={{ width: "2.5rem", height: "18rem" }}
            animate={{
              width: activeImage === index ? "20rem" : "4rem",
              height: "18rem",
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            onClick={() => setActiveImage(index)}
            onHoverStart={() => setActiveImage(index)}
          >
            <AnimatePresence>
              {activeImage === index && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute h-full w-full bg-gradient-to-t from-black/50 to-transparent z-10"
                />
              )}
            </AnimatePresence>
            <AnimatePresence>
              {activeImage === index && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute z-20 flex h-full w-full flex-col items-start justify-end p-4"
                >
                  <p className="text-left text-sm text-white font-serif">{image.label}</p>
                </motion.div>
              )}
            </AnimatePresence>
            <img src={image.src} className="size-full object-cover" alt={image.alt} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}