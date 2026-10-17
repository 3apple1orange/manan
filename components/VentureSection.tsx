import type { ReactNode } from "react";
import Reveal from "@/components/motion/Reveal";
import DrawLine from "@/components/motion/DrawLine";

interface VentureSectionProps {
  index: string;
  label: string;
  first?: boolean;
  children: ReactNode;
}

/** A numbered editorial chapter. Below 1024px the number and label sit
 *  above the content; on wider screens they move to a left column. */
export default function VentureSection({ index, label, first = false, children }: VentureSectionProps) {
  return (
    <section>
      {!first && <DrawLine />}
      <div className="grid gap-6 py-12 md:py-14 lg:grid-cols-[180px_1fr] lg:gap-12 lg:py-16">
        <Reveal y={16} className="self-start lg:sticky lg:top-28">
          <div className="flex items-baseline gap-4 lg:block">
            <span aria-hidden="true" className="block font-serif text-4xl leading-none text-ink/15 lg:text-6xl">
              {index}
            </span>
            <h2 className="text-[10px] uppercase tracking-[0.25em] text-muted lg:mt-3">{label}</h2>
          </div>
        </Reveal>
        <div className="min-w-0">{children}</div>
      </div>
    </section>
  );
}