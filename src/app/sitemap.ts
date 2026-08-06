import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";

const ROUTES: { path: string; priority: number; freq: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "/", priority: 1, freq: "weekly" },
  { path: "/menu", priority: 0.9, freq: "weekly" },
  { path: "/contact", priority: 0.8, freq: "monthly" },
  { path: "/catering", priority: 0.7, freq: "monthly" },
  { path: "/about", priority: 0.6, freq: "monthly" },
  { path: "/reviews", priority: 0.6, freq: "weekly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return ROUTES.map((r) => ({
    url: `${siteUrl}${r.path}`,
    lastModified,
    changeFrequency: r.freq,
    priority: r.priority,
  }));
}
