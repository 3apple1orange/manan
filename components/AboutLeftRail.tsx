import { Linkedin } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export default function AboutLeftRail() {
  const linkedin = siteConfig.person.sameAs.find((url) => url.includes("linkedin.com"));

  return (
    <div className="flex h-full flex-col justify-between py-10 px-6">
      <div>
        <p className="text-xs tracking-[0.2em] uppercase text-muted">Profile</p>
        <h1 className="mt-4 font-serif text-4xl leading-[1.05]">
          Founder <br /> &amp; Writer.
        </h1>
      </div>

      <div className="space-y-8">
        <div className="space-y-3 text-sm">
          {[
            ["Founder", siteConfig.ecto.name],
            ["Proprietor", siteConfig.ssSolutions.name],
            ["Author", siteConfig.book.title],
            ["Based in", siteConfig.person.basedIn],
          ].map(([label, value]) => (
            <div key={label} className="flex justify-between gap-4 border-t border-line pt-3">
              <span className="text-muted">{label}</span>
              <span className="text-right">{value}</span>
            </div>
          ))}
        </div>

        {linkedin && (
          <div className="flex gap-3 border-t border-line pt-6">
            <a
              href={linkedin}
              target="_blank"
              rel="noopener"
              aria-label="Manan Singla on LinkedIn"
              className="opacity-40 hover:opacity-100 transition-opacity"
            >
              <Linkedin size={18} />
            </a>
          </div>
        )}
      </div>
    </div>
  );
}