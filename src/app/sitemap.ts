import { MetadataRoute } from "next";
import { getAllPostsMeta } from "@/lib/mdx";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPostsMeta();

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `https://htsulfuric.com/blog/${post.slug}`,
    lastModified: new Date(post.frontMatter.date as string),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: "https://your-domain.com",
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1.0,
    },
    ...postEntries,
  ];
}
