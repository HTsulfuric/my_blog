import { getAllPostsMeta } from "@/lib/mdx";
import { calculateReadingTime, formatRelativeDate } from "@/lib/utils";
import Link from "next/link";
import { notFound } from "next/navigation";

interface TagPageProps {
  params: Promise<{ tag: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPostsMeta();
  const tagsSet = new Set<string>();

  posts.forEach((post) => {
    const tags = (post.frontMatter.tags as string[]) || [];
    tags.forEach((tag) => tagsSet.add(tag));
  });

  return Array.from(tagsSet).map((tag) => ({
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
  const filteredPosts = allPosts.filter((post) => {
    const tags = (post.frontMatter.tags as string[]) || [];
    return tags.includes(decodedTag);
  });

  if (filteredPosts.length === 0) {
    notFound();
  }

  filteredPosts.sort(
    (a, b) =>
      new Date(b.frontMatter.date as string).getTime() -
      new Date(a.frontMatter.date as string).getTime(),
  );

  return (
    <div className="min-h-screen">
      <main className="max-w-4xl mx-auto px-6 py-16">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-[#2E3440] dark:text-[#ECEFF4] mb-4">
            タグ: {decodedTag}
          </h1>
          <p className="text-[#4C566A] dark:text-[#D8DEE9]">
            {filteredPosts.length}件の記事
          </p>
        </div>

        <div className="space-y-6">
          {filteredPosts.map((post) => {
            const readingTime = calculateReadingTime(post.content);
            const relativeDate = formatRelativeDate(
              post.frontMatter.date as string,
            );
            const tags = (post.frontMatter.tags as string[]) || [];

            return (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block group"
              >
                <article className="p-6 rounded-lg bg-white dark:bg-[#3B4252] border border-[#D8DEE9] dark:border-[#4C566A] transition-all duration-200 hover:shadow-lg hover:border-[#88C0D0] dark:hover:border-[#88C0D0]">
                  <h2 className="text-2xl font-semibold text-[#2E3440] dark:text-[#ECEFF4] mb-3 group-hover:text-[#5E81AC] dark:group-hover:text-[#88C0D0] transition-colors">
                    {post.frontMatter.title as string}
                  </h2>

                  <div className="flex items-center gap-3 text-sm text-[#4C566A] dark:text-[#D8DEE9] mb-3">
                    <time>{relativeDate}</time>
                    <span>•</span>
                    <span>{readingTime}分で読めます</span>
                  </div>

                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {tags.map((tagItem) => (
                        <span
                          key={tagItem}
                          className="px-2 py-1 text-xs rounded bg-[#88C0D0]/10 text-[#5E81AC] dark:bg-[#88C0D0]/20 dark:text-[#88C0D0]"
                        >
                          {tagItem}
                        </span>
                      ))}
                    </div>
                  )}

                  <p className="text-[#434C5E] dark:text-[#E5E9F0] leading-relaxed">
                    {post.frontMatter.description as string}
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
