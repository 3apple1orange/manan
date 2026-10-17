"use client";

import { AnimatePresence, motion, useSpring } from "framer-motion";
import { Play, Plus } from "lucide-react";
import {
  MediaControlBar,
  MediaController,
  MediaMuteButton,
  MediaPlayButton,
  MediaTimeRange,
} from "media-chrome/react";
import type { ComponentProps } from "react";
import React, { useState } from "react";
import { cn } from "@/lib/utils";

const VIDEO_SRC = "/showreel/manan-singla-reel.mp4";

// Zoom applied to the small looping preview so the black bars baked into
// the footage are cropped out. Raise to 1.5 if a sliver of black remains,
// lower toward 1 once the file itself is cropped.
const PREVIEW_ZOOM = 1.35;

type VideoPlayerProps = ComponentProps<typeof MediaController>;
const VideoPlayer = ({ style, ...props }: VideoPlayerProps) => (
  <MediaController style={{ ...style }} {...props} />
);

const VideoPlayerContent = ({ className, ...props }: ComponentProps<"video">) => (
  <video className={cn("mb-0 mt-0", className)} {...props} />
);

export default function HeroVideo() {
  const [showPopover, setShowPopover] = useState(false);
  const SPRING = { mass: 0.1 };
  const x = useSpring(0, SPRING);
  const y = useSpring(0, SPRING);
  const opacity = useSpring(0, SPRING);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    opacity.set(1);
    const bounds = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - bounds.left);
    y.set(e.clientY - bounds.top);
  };

  return (
    <>
      <AnimatePresence>
        {showPopover && <VideoPopOver onClose={() => setShowPopover(false)} />}
      </AnimatePresence>

      <motion.div
        onPointerMove={handlePointerMove}
        onPointerLeave={() => opacity.set(0)}
        onClick={() => setShowPopover(true)}
        onKeyDown={(e) => e.key === "Enter" && setShowPopover(true)}
        role="button"
        tabIndex={0}
        aria-label="Play video of Manan Singla"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.04 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative inline-block h-20 w-[6.75rem] shrink-0 cursor-pointer overflow-hidden rounded-xl bg-ink align-middle shadow-sm md:h-28 md:w-[9.5rem]"
      >
        <motion.div
          style={{ x, y, opacity }}
          className="pointer-events-none absolute left-0 top-0 z-20 flex w-fit select-none items-center gap-1 p-2 text-xs text-white mix-blend-exclusion"
        >
          <Play className="size-3 fill-white" /> Play
        </motion.div>
        <video
          autoPlay
          muted
          playsInline
          loop
          className="h-full w-full object-cover grayscale"
          style={{ transform: `scale(${PREVIEW_ZOOM})` }}
        >
          <source src={VIDEO_SRC} />
        </video>
      </motion.div>
    </>
  );
}

function VideoPopOver({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed left-0 top-0 z-[101] flex h-screen w-screen items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="absolute left-0 top-0 h-full w-full bg-black/80 backdrop-blur-lg"
        onClick={onClose}
      />
      <motion.div
        initial={{ clipPath: "inset(43.5% 43.5% 33.5% 43.5%)", opacity: 0 }}
        animate={{ clipPath: "inset(0 0 0 0)", opacity: 1 }}
        exit={{
          clipPath: "inset(43.5% 43.5% 33.5% 43.5%)",
          opacity: 0,
          transition: { duration: 1, type: "spring", stiffness: 100, damping: 20, opacity: { duration: 0.2, delay: 0.8 } },
        }}
        transition={{ duration: 1, type: "spring", stiffness: 100, damping: 20 }}
        className="relative aspect-video w-full max-w-4xl px-4"
      >
        <VideoPlayer style={{ width: "100%", height: "100%" }}>
          <VideoPlayerContent
            src={VIDEO_SRC}
            autoPlay
            slot="media"
            className="w-full object-cover"
            style={{ width: "100%", height: "100%" }}
          />
          <span onClick={onClose} className="absolute right-2 top-2 z-10 cursor-pointer rounded-full p-1">
            <Plus className="size-5 rotate-45 text-white" />
          </span>
          <MediaControlBar className="absolute bottom-0 left-1/2 flex w-full max-w-4xl -translate-x-1/2 items-center justify-center px-5 mix-blend-exclusion md:px-10 md:py-5">
            <MediaPlayButton className="h-4 bg-transparent" />
            <MediaTimeRange className="bg-transparent" />
            <MediaMuteButton className="size-4 bg-transparent" />
          </MediaControlBar>
        </VideoPlayer>
      </motion.div>
    </div>
  );
}