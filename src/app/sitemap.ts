import type { MetadataRoute } from "next";
import { getAllSlugs } from "@/lib/mdx";
import { projects } from "@/lib/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://taylorburke.me";

  const writingSlugs = getAllSlugs();
  const writingUrls = writingSlugs.map((slug) => ({
    url: `${baseUrl}/writing/${slug}`,
    lastModified: new Date(),
  }));

  const projectUrls = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date(),
  }));

  return [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/projects`, lastModified: new Date() },
    { url: `${baseUrl}/writing`, lastModified: new Date() },
    { url: `${baseUrl}/contact`, lastModified: new Date() },
    ...writingUrls,
    ...projectUrls,
  ];
}
