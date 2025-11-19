import { getPostBySlug, getPostSlugs } from "@/lib/mdx";
import { calculateReadingTime, formatRelativeDate } from "@/lib/utils";
import PostRenderer from "@/components/PostRenderer";
import { notFound } from "next/navigation";
import Link from "next/link";

// ----------------------------------------------------
// 1. 型定義: Next.js 15 (または最新版) では params は Promise です
// ----------------------------------------------------
interface PostPageProps {
  params: Promise<{ slug: string }>;
}

// ----------------------------------------------------
// 2. SSG: ビルド時に全ての記事パスを生成
// ----------------------------------------------------
export async function generateStaticParams() {
  const slugs = getPostSlugs();

  // ファイル名から拡張子を除いたスラッグを返す
  return slugs.map((slug) => ({
    slug: slug.replace(/\.mdx?$/, ""),
  }));
}

// ----------------------------------------------------
// 3. SEO: 記事のフロントマターからメタデータを生成
// ----------------------------------------------------
export async function generateMetadata({ params }: PostPageProps) {
  // 💡 Next.js 15 のため await が必要
  const { slug } = await params;

  try {
    // getPostBySlug は await して呼び出す
    const post = await getPostBySlug(slug);

    return {
      title: post.frontMatter.title as string,
      description: post.frontMatter.description as string,
    };
  } catch (error) {
    return {
      title: "記事が見つかりません",
    };
  }
}

// ----------------------------------------------------
// 4. メインのページコンポーネント
// ----------------------------------------------------
export default async function PostPage({ params }: PostPageProps) {
  // 💡 Next.js 15 のため await が必要
  const { slug } = await params;

  let post;
  try {
    // getPostBySlug は { slug, frontMatter, content } を返します
    post = await getPostBySlug(slug);
  } catch (error) {
    // ファイルが存在しない場合は404ページを表示
    notFound();
  }

  const readingTime = calculateReadingTime(post.content);
  const relativeDate = formatRelativeDate(post.frontMatter.date as string);
  const tags = (post.frontMatter.tags as string[]) || [];

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <header className="mb-8 border-b border-[#D8DEE9] dark:border-[#4C566A] pb-6">
        <h1 className="text-4xl font-extrabold mb-4 text-[#2E3440] dark:text-[#ECEFF4]">
          {post.frontMatter.title as string}
        </h1>

        <div className="flex items-center gap-3 text-sm text-[#4C566A] dark:text-[#D8DEE9] mb-4">
          <time>{relativeDate}</time>
          <span>•</span>
          <span>{readingTime}分で読めます</span>
        </div>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Link
                key={tag}
                href={`/tag/${encodeURIComponent(tag)}`}
                className="px-3 py-1 text-sm rounded bg-[#88C0D0]/10 text-[#5E81AC] dark:bg-[#88C0D0]/20 dark:text-[#88C0D0] hover:bg-[#88C0D0]/20 dark:hover:bg-[#88C0D0]/30 transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>
        )}
      </header>

      <article className="prose lg:prose-xl dark:prose-invert">
        <PostRenderer source={post.content} />
      </article>
    </div>
  );
}
