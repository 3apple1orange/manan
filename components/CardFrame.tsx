import Image from "next/image";
import type { ReactNode } from "react";

interface CardFrameProps {
  backgroundSrc: string;
  backgroundAlt: string;
  children: ReactNode;
  maxWidth?: string; // Tailwind max-w-* class, defaults to 5xl
}

export default function CardFrame({
  backgroundSrc,
  backgroundAlt,
  children,
  maxWidth = "max-w-5xl",
}: CardFrameProps) {
  return (
    <div className="relative">
      <div className="fixed inset-0 -z-10">
        <Image
          src={backgroundSrc}
          alt={backgroundAlt}
          fill
          sizes="100vw"
          className="object-cover opacity-[0.38] grayscale"
          priority
        />
      </div>

      <div
        className={`relative z-10 mx-auto mt-12 mb-12 ${maxWidth} min-h-[85vh] bg-paper border border-line shadow-sm px-6 py-14 md:px-14 md:py-20`}
      >
        {children}
      </div>
    </div>
  );
}