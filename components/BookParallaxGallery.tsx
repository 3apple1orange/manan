"use client";

import { motion, type MotionValue, useScroll, useTransform } from "framer-motion";
import Lenis from "lenis";
import { useEffect, useRef, useState } from "react";

// Five photos. Give each a short, honest description: Google reads these.
const photos = [
    { src: "/images/book/1.jpeg", alt: "Meet Me in the Backyard by Manan Singla, front cover" },
    { src: "/images/book/2.jpeg", alt: "Meet Me in the Backyard by Manan Singla, open pages" },
    { src: "/images/book/3.jpeg", alt: "Meet Me in the Backyard by Manan Singla, detail" },
    { src: "/images/book/4.jpeg", alt: "Meet Me in the Backyard by Manan Singla, book in hand" },
    { src: "/images/book/5.jpeg", alt: "Meet Me in the Backyard by Manan Singla, spine and cover" },
];

// Which photo goes in which column (by position in the list above).
// Photo 1 repeats in the outer columns, far apart and moving at different speeds.
const layout = [
  [0, 1],
  [2, 3],
  [4, 0],
];

export default function BookParallaxGallery() {
  const gallery = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const { scrollYProgress } = useScroll({ target: gallery, offset: ["start end", "end start"] });

  // Each column drifts at its own speed; that difference is the parallax.
  const y1 = useTransform(scrollYProgress, [0, 1], [0, height * 2]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, height * 3.3]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, height * 1.25]);
  const speeds = [y1, y2, y3];

  useEffect(() => {
    const lenis = new Lenis();
    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);
    const resize = () => setHeight(window.innerHeight);
    resize();
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <div ref={gallery} className="relative box-border flex h-[175vh] gap-[2vw] overflow-hidden bg-paper p-[2vw]">
      {layout.map((column, i) => (
        <Column key={i} photos={column.map((index) => photos[index])} y={speeds[i]} />
      ))}
    </div>
  );
}

function Column({ photos, y }: { photos: { src: string; alt: string }[]; y: MotionValue<number> }) {
  return (
    <motion.div
      className="relative -top-[45%] flex h-full w-1/3 flex-col gap-[2vw] [&:nth-child(2)]:top-[-95%]"
      style={{ y }}
    >
      {photos.map((photo, i) => (
        <div key={`${photo.src}-${i}`} className="relative h-full w-full overflow-hidden rounded-sm bg-line">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={photo.src} alt={photo.alt} className="pointer-events-none h-full w-full object-cover" />
        </div>
      ))}
    </motion.div>
  );
}