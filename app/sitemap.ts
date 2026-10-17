import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
export const dynamic = "force-static";
// Add every real, published route here. Do NOT add thin/placeholder pages —
// the brief is explicit that empty pages built solely for ranking hurt more
// than they help.
const routes = [
  "",
  "/about",
  "/logic",
  "/ventures",
  "/ecto-india",
  "/ss-solutions",
  "/writing/meet-me-in-the-backyard",
  "/research",
  "/press",
  "/media-kit",
  "/contact",
  "/diamonds",
  "/privacy",
  "/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${siteConfig.domain}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/about" ? 0.9 : 0.6,
  }));
}
