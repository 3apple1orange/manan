import Image from "next/image";
import { siteConfig } from "@/lib/site-config";

export default function AboutRightRail() {
  return (
    <div className="flex h-full flex-col justify-between py-10 px-6">
      <div className="flex items-center gap-2 text-xs uppercase tracking-wide">
        <span className="h-2 w-2 rounded-full bg-accent" />
        <span className="text-muted">{siteConfig.person.basedIn}</span>
      </div>

      <div>
        <div className="aspect-square w-full relative bg-line overflow-hidden">
          <Image
            src="/images/manan-singla-founder-ecto-india.jpeg"
            alt={`${siteConfig.person.name}, founder of ${siteConfig.ecto.name}`}
            fill
            sizes="280px"
            className="object-cover"
          />
        </div>
        <p className="mt-4 font-[family-name:var(--font-signature)] text-2xl text-muted">
          {siteConfig.person.name}
        </p>
        <p className="text-sm text-muted">{siteConfig.person.attributes.join(" · ")}</p>
        <p className="text-xs text-muted opacity-60">Since {siteConfig.person.activeSince}</p>
      </div>
    </div>
  );
}