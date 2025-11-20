import { getAllPostsMeta } from "@/lib/mdx";
import { calculateReadingTime, formatRelativeDate } from "@/lib/utils";
import TagList from "@/components/TagList";
import type { PostMeta } from "@/types/post";
import Link from "next/link";
import { notFound } from "next/navigation";

interface TagPageProps {
  params: Promise<{ tag: string }>;
}

const getAllTags = (): Set<string> => {
  const posts = getAllPostsMeta();
  const tags = new Set<string>();

  posts.forEach((post) => {
    const postTags = post.frontMatter.tags || [];
    postTags.forEach((tag) => tags.add(tag));
  });

  return tags;
};

const filterPostsByTag = (posts: PostMeta[], tag: string): PostMeta[] => {
  return posts.filter((post) => {
    const tags = post.frontMatter.tags || [];
    return tags.includes(tag);
  });
};

const sortPostsByDate = (posts: PostMeta[]): PostMeta[] => {
  return [...posts].sort(
    (a, b) =>
      new Date(b.frontMatter.date).getTime() -
      new Date(a.frontMatter.date).getTime()
  );
};

export async function generateStaticParams() {
  const tags = getAllTags();
  return Array.from(tags).map((tag) => ({
    tag: encodeURIComponent(tag),
  }));
}

export async function generateMetadata({ params }: TagPageProps) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);

  return {
    title: `タグ: ${decodedTag}`,
    description: `${decodedTag}タグが付いた記事一覧`,
  };
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);

  const allPosts = getAllPostsMeta();
  const filteredPosts = filterPostsByTag(allPosts, decodedTag);

  if (filteredPosts.length === 0) {
    notFound();
  }

  const sortedPosts = sortPostsByDate(filteredPosts);

  return (
    <div className="min-h-screen">
      <main className="max-w-4xl mx-auto px-6 py-16">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-[#2E3440] dark:text-[#ECEFF4] mb-4">
            タグ: {decodedTag}
          </h1>
          <p className="text-[#4C566A] dark:text-[#D8DEE9]">
            {sortedPosts.length}件の記事
          </p>
        </div>

        <div className="space-y-6">
          {sortedPosts.map((post) => {
            const readingTime = calculateReadingTime(post.content);
            const relativeDate = formatRelativeDate(post.frontMatter.date);
            const tags = post.frontMatter.tags || [];

            return (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block group"
              >
                <article className="p-6 rounded-lg bg-white dark:bg-[#3B4252] border border-[#D8DEE9] dark:border-[#4C566A] transition-all duration-200 hover:shadow-lg hover:border-[#88C0D0] dark:hover:border-[#88C0D0]">
                  <h2 className="text-2xl font-semibold text-[#2E3440] dark:text-[#ECEFF4] mb-3 group-hover:text-[#5E81AC] dark:group-hover:text-[#88C0D0] transition-colors">
                    {post.frontMatter.title}
                  </h2>

                  <div className="flex items-center gap-3 text-sm text-[#4C566A] dark:text-[#D8DEE9] mb-3">
                    <time>{relativeDate}</time>
                    <span>•</span>
                    <span>{readingTime}分で読めます</span>
                  </div>

                  {tags.length > 0 && (
                    <div className="mb-3">
                      <TagList tags={tags} clickable={false} size="small" />
                    </div>
                  )}

                  <p className="text-[#434C5E] dark:text-[#E5E9F0] leading-relaxed">
                    {post.frontMatter.description}
                  </p>
                </article>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}
