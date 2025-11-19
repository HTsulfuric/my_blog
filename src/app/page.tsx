import { getAllPostsMeta } from "@/lib/mdx";
import { calculateReadingTime, formatRelativeDate } from "@/lib/utils";
import Link from "next/link";

export default function HomePage() {
  const posts = getAllPostsMeta();

  posts.sort(
    (a, b) =>
      new Date(b.frontMatter.date).getTime() -
      new Date(a.frontMatter.date).getTime(),
  );

  return (
    <div>
      <main className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-10 text-[#2E3440] dark:text-[#ECEFF4]">
          最新の記事
        </h2>

        <div className="space-y-6">
          {posts.map((post) => {
            const readingTime = calculateReadingTime(post.content);
            const relativeDate = formatRelativeDate(
              post.frontMatter.date as string,
            );
            const tags = (post.frontMatter.tags as string[]) || [];

            return (
              <article
                key={post.slug}
                className="p-6 rounded-lg bg-white dark:bg-[#3B4252] border border-[#D8DEE9] dark:border-[#4C566A] transition-all duration-200"
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="block group"
                >
                  <h3 className="text-2xl font-semibold text-[#2E3440] dark:text-[#ECEFF4] mb-3 group-hover:text-[#5E81AC] dark:group-hover:text-[#88C0D0] transition-colors">
                    {post.frontMatter.title as string}
                  </h3>
                </Link>

                <div className="flex items-center gap-3 text-sm text-[#4C566A] dark:text-[#D8DEE9] mb-3">
                  <time>{relativeDate}</time>
                  <span>•</span>
                  <span>{readingTime}分で読めます</span>
                </div>

                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {tags.map((tag) => (
                      <Link
                        key={tag}
                        href={`/tag/${encodeURIComponent(tag)}`}
                        className="px-2 py-1 text-xs rounded bg-[#88C0D0]/10 text-[#5E81AC] dark:bg-[#88C0D0]/20 dark:text-[#88C0D0] hover:bg-[#88C0D0]/20 dark:hover:bg-[#88C0D0]/30 transition-colors"
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>
                )}

                <Link
                  href={`/blog/${post.slug}`}
                  className="block group"
                >
                  <p className="text-[#434C5E] dark:text-[#E5E9F0] leading-relaxed group-hover:text-[#2E3440] dark:group-hover:text-[#ECEFF4] transition-colors">
                    {post.frontMatter.description as string}
                  </p>
                </Link>
              </article>
            );
          })}
        </div>
      </main>
    </div>
  );
}

export const metadata = {
  title: "ホーム",
};
