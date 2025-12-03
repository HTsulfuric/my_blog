import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Post, PostMeta, PostFrontMatter } from "@/types/post";

const POSTS_PATH = path.join(process.cwd(), "src/content/posts");

export const getPostSlugs = (): string[] => {
  return fs.readdirSync(POSTS_PATH);
};

export const getPostBySlug = async (slug: string): Promise<Post> => {
  const sanitized = slug.replace(/[^a-zA-Z0-9-_]/g, "");

  if (slug !== sanitized || slug.includes("..")) {
    throw new Error("Invalid slug format");
  }

  const realSlug = sanitized.replace(/\.mdx?$/, "");
  const fullPath = path.join(POSTS_PATH, `${realSlug}.mdx`);

  const normalizedPath = path.normalize(fullPath);
  if (!normalizedPath.startsWith(POSTS_PATH)) {
    throw new Error("Path traversal attempt detected");
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  // In production, prevent access to unpublished posts
  if (process.env.NODE_ENV === "production" && data.published === false) {
    throw new Error("Post is not published");
  }

  return {
    slug: realSlug,
    frontMatter: data as PostFrontMatter,
    content,
  };
};

export const getAllPostsMeta = (): PostMeta[] => {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => {
      const realSlug = slug.replace(/\.mdx?$/, "");
      const fullPath = path.join(POSTS_PATH, slug);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      return {
        slug: realSlug,
        frontMatter: data as PostFrontMatter,
        content,
      };
    })
    .filter((post) => {
      // In production, filter out posts where published is strictly false
      if (process.env.NODE_ENV === "production") {
        return post.frontMatter.published !== false;
      }
      // In development, show all posts
      return true;
    });

  return posts;
};
