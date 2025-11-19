import { getAllPostsMeta } from "@/lib/mdx";

// Tailwind CSSの初期設定が適用されているか確認
export default function HomePage() {
  const posts = getAllPostsMeta();

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <header className="mb-10">
        <h1 className="text-4xl font-extrabold text-blue-600">
          モダンブログへようこそ
        </h1>
        <p className="text-gray-500 mt-2">
          Next.js (App Router) + MDX + Tailwind CSS
        </p>
      </header>

      <main className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">最新の記事</h2>

        {posts.map((post) => (
          <article
            key={post.slug}
            className="mb-6 p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition duration-300 bg-white"
          >
            <h3 className="text-xl font-semibold text-gray-900">
              <a href={`/blog/${post.slug}`} className="hover:text-blue-500">
                {post.frontMatter.title as string}
              </a>
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              公開日: {post.frontMatter.date as string}
            </p>
            <p className="text-gray-700 mt-2">
              {post.frontMatter.description as string}
            </p>
          </article>
        ))}
      </main>
    </div>
  );
}
