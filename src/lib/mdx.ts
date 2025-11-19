import fs from "fs";
import path from "path";
import matter from "gray-matter";

// 記事ディレクトリ
const POSTS_PATH = path.join(process.cwd(), "src/content/posts");

// スラッグ一覧を取得
export const getPostSlugs = () => {
  return fs.readdirSync(POSTS_PATH);
};

// 特定の記事を取得
export const getPostBySlug = async (slug: string) => {
  const realSlug = slug.replace(/\.mdx?$/, "");
  const fullPath = path.join(POSTS_PATH, `${realSlug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const { data: frontMatter, content } = matter(fileContents);

  return {
    slug: realSlug,
    frontMatter,
    content,
  };
};

// 全記事のメタデータを取得
export const getAllPostsMeta = () => {
  const slugs = getPostSlugs();
  const posts = slugs.map((slug) => {
    const realSlug = slug.replace(/\.mdx?$/, "");
    const fullPath = path.join(POSTS_PATH, slug);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data: frontMatter } = matter(fileContents);

    return {
      slug: realSlug,
      frontMatter,
    };
  });

  return posts;
};
