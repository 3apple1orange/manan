import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export const metadata = buildMetadata({
  title: `Privacy Policy | ${siteConfig.person.name}`,
  description: `How ${siteConfig.domain.replace("https://www.", "")} handles personal information.`,
  path: "/privacy",
});

const sections = [
  {
    h: "Who we are",
    p: `This website is the personal site of ${siteConfig.person.name}. Questions about this policy can be sent to ${siteConfig.contactEmail}.`,
  },
  {
    h: "What we collect",
    p: "If you write to us by email, we receive your name, email address and whatever you choose to include. To understand how the site is used, we use Google Analytics, which collects information such as pages visited, approximate location, device and browser type through cookies. Our hosting provider, Cloudflare, processes technical data such as IP addresses to keep the site secure and available.",
  },
  {
    h: "How we use it",
    p: "We use your messages only to reply to you. We use analytics only in aggregate, to improve the site. We do not sell or rent personal information, and we do not use it for advertising.",
  },
  {
    h: "Third parties",
    p: "Google (analytics) and Cloudflare (hosting and security) process data on our behalf under their own privacy policies. Links to other websites, such as retailers or publishers, are governed by those websites' policies.",
  },
  {
    h: "Retention",
    p: "Emails are kept for as long as needed to respond and maintain a record of correspondence. Analytics data is retained according to Google Analytics settings.",
  },
  {
    h: "Your choices and rights",
    p: `You can block or delete cookies in your browser at any time. You may ask to access, correct or delete personal information we hold about you, including under India's Digital Personal Data Protection Act, 2023, by writing to ${siteConfig.contactEmail}.`,
  },
  {
    h: "Changes",
    p: "We may update this policy from time to time. The date below shows when it was last revised.",
  },
];

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-2xl px-6 py-20 md:py-28">
      <p className="text-xs uppercase tracking-[0.25em] text-muted">Legal</p>
      <h1 className="mt-4 font-serif text-4xl md:text-6xl">Privacy Policy</h1>
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