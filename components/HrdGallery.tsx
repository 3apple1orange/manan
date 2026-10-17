"use client";

import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface HrdGalleryProps {
  video: string;
  poster?: string;
  photos: readonly { src: string; alt: string }[];
}

const columns: Record<number, string> = {
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-2 md:grid-cols-4",
};

/** Video and photos as one even row of tall tiles. */
export default function HrdGallery({ video, poster, photos }: HrdGalleryProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.muted = true;
    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? el.play().catch(() => {}) : el.pause()),
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const toggleSound = () => {
    const el = ref.current;
    if (!el) return;
    el.muted = !el.muted;
    setMuted(el.muted);
  };

  const tile = "group relative aspect-[3/4] overflow-hidden rounded-2xl bg-line";
  const enter = (i: number) => ({
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.9, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  });

  return (
    <div className={`grid gap-3 md:gap-4 ${columns[Math.min(photos.length + 1, 4)] ?? "grid-cols-3"}`}>
      <motion.div className={tile} {...enter(0)}>
        <video
          ref={ref}
          src={video}
          poster={poster}
          loop
          playsInline
          preload="metadata"
          aria-label="Manan Singla at HRD Antwerp"
          className="h-full w-full object-cover"
        />
        <button
          type="button"
          onClick={toggleSound}
          aria-label={muted ? "Unmute video" : "Mute video"}
          className="absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur transition-colors hover:bg-black/70 md:h-9 md:w-9"
        >
          {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
        </button>
      </motion.div>

      {photos.map((photo, i) => (
        <motion.a
          key={photo.src}
          href={photo.src}
          target="_blank"
          rel="noopener"
          aria-label={`View ${photo.alt} full size`}
          className={tile}
          {...enter(i + 1)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photo.src}
            alt={photo.alt}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </motion.a>
      ))}
    </div>
  );
}