"use client";

import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface ReelPlayerProps {
  src: string;
  poster?: string;
  label: string;
}

/** Vertical reel in a phone-shaped frame. Plays muted while on screen,
 *  pauses when scrolled away, with a sound toggle. */
export default function ReelPlayer({ src, poster, label }: ReelPlayerProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    video.muted = true; // required for autoplay in every browser
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.25 }
    );
    io.observe(video);
    return () => io.disconnect();
  }, []);

  const toggleSound = () => {
    const video = ref.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  };

  return (
    <motion.figure
      initial={{ opacity: 0, y: 40, rotate: -3 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto w-full max-w-[300px]"
    >
      <div className="relative aspect-[9/16] overflow-hidden rounded-[2rem] border border-line bg-black shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)]">
        <video
          ref={ref}
          src={src}
          poster={poster}
          loop
          playsInline
          preload="metadata"
          aria-label={label}
          className="h-full w-full object-cover"
        />
        <button
          type="button"
          onClick={toggleSound}
          aria-label={muted ? "Unmute video" : "Mute video"}
          className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur transition-colors hover:bg-black/70"
        >
          {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>
      </div>
      <figcaption className="mt-4 text-center text-[10px] uppercase tracking-[0.25em] text-muted">{label}</figcaption>
    </motion.figure>
  );
}