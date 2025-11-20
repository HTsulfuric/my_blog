import { getAllPostsMeta } from "@/lib/mdx";
import Link from "next/link";

export const metadata = {
  title: "タグ一覧",
  description: "全てのタグを表示",
};

const getTagCounts = (): Map<string, number> => {
  const posts = getAllPostsMeta();
  const tagCounts = new Map<string, number>();

  posts.forEach((post) => {
    const tags = post.frontMatter.tags || [];
    tags.forEach((tag) => {
      tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
    });
  });

  return tagCounts;
};

const sortTagsByCount = (
  tagCounts: Map<string, number>
): [string, number][] => {
  return Array.from(tagCounts.entries()).sort((a, b) => b[1] - a[1]);
};

export default function TagIndexPage() {
  const tagCounts = getTagCounts();
  const sortedTags = sortTagsByCount(tagCounts);

  return (
    <div className="min-h-screen">
      <main className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-[#2E3440] dark:text-[#ECEFF4] mb-10">
          タグ一覧
        </h1>

        {sortedTags.length === 0 ? (
          <p className="text-[#4C566A] dark:text-[#D8DEE9]">
            タグが見つかりません
          </p>
        ) : (
          <div className="flex flex-wrap gap-4">
            {sortedTags.map(([tag, count]) => (
              <Link
                key={tag}
                href={`/tag/${encodeURIComponent(tag)}`}
                className="group"
              >
                <div className="px-4 py-3 rounded-lg bg-white dark:bg-[#3B4252] border border-[#D8DEE9] dark:border-[#4C566A] transition-all duration-200 hover:shadow-md hover:border-[#88C0D0] dark:hover:border-[#88C0D0]">
                  <span className="text-lg font-medium text-[#2E3440] dark:text-[#ECEFF4] group-hover:text-[#5E81AC] dark:group-hover:text-[#88C0D0] transition-colors">
                    {tag}
                  </span>
                  <span className="ml-2 text-sm text-[#4C566A] dark:text-[#D8DEE9]">
                    ({count})
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
