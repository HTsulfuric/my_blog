export const metadata = {
  title: "About",
  description: "熱濃硫酸の部屋について",
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-[#2E3440] dark:text-[#ECEFF4] mb-8">
        About
      </h1>

      <div className="prose prose-lg dark:prose-invert max-w-none">
        <div className="text-[#434C5E] dark:text-[#E5E9F0] leading-relaxed space-y-6">
          <p>
            プログラミングと技術についてのブログです。
          </p>

          <p>
            主に以下のトピックを扱っています:
          </p>

          <ul className="list-disc pl-6 space-y-2">
            <li>Web開発 (Next.js, React, TypeScript)</li>
            <li>システムプログラミング</li>
            <li>技術記事とチュートリアル</li>
          </ul>

          <div className="pt-6 border-t border-[#D8DEE9] dark:border-[#4C566A]">
            <h2 className="text-2xl font-semibold text-[#2E3440] dark:text-[#ECEFF4] mb-4">
              Tech Stack
            </h2>
            <p>
              このブログは以下の技術で構築されています:
            </p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Next.js 16 (App Router)</li>
              <li>React 19</li>
              <li>TypeScript</li>
              <li>MDX (コンテンツ管理)</li>
              <li>Tailwind CSS v4</li>
              <li>Shiki (シンタックスハイライト)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
