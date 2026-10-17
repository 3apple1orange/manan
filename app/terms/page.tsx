import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export const metadata = buildMetadata({
  title: `Terms of Use | ${siteConfig.person.name}`,
  description: `Terms governing the use of ${siteConfig.domain.replace("https://www.", "")}.`,
  path: "/terms",
});

const year = new Date().getFullYear();

const sections = [
  {
    h: "Use of this site",
    p: "This website provides information about the work, ventures and writing of " + siteConfig.person.name + ". By using it, you agree to these terms.",
  },
  {
    h: "Content and copyright",
    p: `All text, photographs and other material on this site are © ${year} ${siteConfig.person.name} unless stated otherwise. You may share links and short quotations with attribution. Material from the Media Kit may be used for editorial coverage as described there. Any other reproduction requires written permission.`,
  },
  {
    h: "No professional advice",
    p: "Information on this site is provided for general information only. It is not financial, investment, legal or professional advice, and should not be relied on as such.",
  },
  {
    h: "External links",
    p: "This site links to other websites, including retailers, publishers and venture websites. We are not responsible for their content, availability or practices.",
  },
  {
    h: "Accuracy and liability",
    p: "We aim to keep information accurate and current, but make no guarantee that it is complete or error-free. To the extent permitted by law, we are not liable for any loss arising from the use of this site.",
  },
  {
    h: "Governing law",
    p: "These terms are governed by the laws of India.",
  },
  {
    h: "Contact",
    p: `Questions about these terms can be sent to ${siteConfig.contactEmail}.`,
  },
];

export default function TermsPage() {
  return (
    <article className="mx-auto max-w-2xl px-6 py-20 md:py-28">
      <p className="text-xs uppercase tracking-[0.25em] text-muted">Legal</p>
      <h1 className="mt-4 font-serif text-4xl md:text-6xl">Terms of Use</h1>
      <p className="mt-4 text-sm text-muted">Last updated 17 October 2026</p>
      <div className="mt-14 space-y-10">
        {sections.map((s) => (
          <section key={s.h} className="border-t border-line pt-8">
            <h2 className="font-serif text-2xl">{s.h}</h2>
            <p className="mt-3 leading-relaxed text-muted">{s.p}</p>
          </section>
        ))}
      </div>
    </article>
  );
}