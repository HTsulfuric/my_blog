import { getPostBySlug, getPostSlugs } from "@/lib/mdx";
import PostRenderer from "@/components/PostRenderer";
import { notFound } from "next/navigation";

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

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <header className="mb-8 border-b pb-4">
        <h1 className="text-4xl font-extrabold mb-3 text-gray-900 dark:text-white">
          {post.frontMatter.title as string}
        </h1>
        <p className="text-sm text-gray-500">
          公開日: {post.frontMatter.date as string}
        </p>
      </header>

      <article className="prose lg:prose-xl dark:prose-invert">
        {/* 💡 ポイント: 
          シリアライズされた mdxSource ではなく、
          生のテキストデータ (content) を渡します。
          変換は Server Component である PostRenderer 内部で行われます。
        */}
        <PostRenderer source={post.content} />
      </article>
    </div>
  );
}
