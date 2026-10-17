import type { Metadata } from "next";
import { siteConfig } from "./site-config";

interface PageSeoInput {
  title: string; // exact SEO title, e.g. "About Manan Singla | Founder of ECTO India"
  description: string;
  path: string; // e.g. "/about"
  /** 1200x630 social image path relative to /public, defaults to the site-wide one. */
  ogImage?: string;
}

export function buildMetadata({ title, description, path, ogImage }: PageSeoInput): Metadata {
  const url = `${siteConfig.domain}${path}`;
  const image = ogImage ?? "/og/default-social-share.jpeg";

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.person.name,
      images: [{ url: image, width: 1200, height: 630 }],
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
