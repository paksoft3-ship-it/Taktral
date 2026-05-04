import { MetadataRoute } from "next";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://taktral.com";
const locales = ["de", "en", "tr", "ar"];

// Static routes and their priorities
const staticRoutes = [
  { path: "",           priority: 1.0, changeFrequency: "weekly"  as const },
  { path: "/services",  priority: 0.9, changeFrequency: "weekly"  as const },
  { path: "/projects",  priority: 0.9, changeFrequency: "weekly"  as const },
  { path: "/about",     priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/insights",  priority: 0.8, changeFrequency: "weekly"  as const },
  { path: "/contact",   priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/partner-guide", priority: 0.7, changeFrequency: "monthly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const { path, priority, changeFrequency } of staticRoutes) {
    for (const locale of locales) {
      entries.push({
        url: `${baseUrl}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency,
        priority,
      });
    }
  }

  return entries;
}
