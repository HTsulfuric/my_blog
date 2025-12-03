
export const metadata = {
  title: "About",
  description: "熱濃硫酸の本棚について",
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-[#2E3440] dark:text-[#ECEFF4] mb-8">
        About
      </h1>

      {/* Intro */}
      <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
        <div className="text-[#434C5E] dark:text-[#E5E9F0] leading-relaxed space-y-6">
          <p>技術談義と雑談をする場所。</p>

          <ul className="list-disc pl-6 space-y-2">
            <li>最近やったこと(雑多)</li>
            <li>雑談</li>
          </ul>

          <p>が主に投稿されるはず。</p>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-semibold text-[#2E3440] dark:text-[#ECEFF4] mb-8">
          Timeline
        </h2>

        <div className="space-y-8">
          {/* Timeline Item 1 */}
          <div className="flex gap-6">
            <div className="flex flex-col items-center flex-shrink-0">
              <div className="w-4 h-4 rounded-full bg-[#88C0D0]"></div>
              <div className="w-0.5 h-full bg-[#88C0D0] mt-2"></div>
            </div>
            <div className="flex-grow pb-4">
              <div className="text-sm font-bold text-[#88C0D0] mb-2">2022</div>
              <h3 className="text-lg font-semibold text-[#2E3440] dark:text-[#ECEFF4] mb-2">
                私立東海高等学校 卒業
              </h3>
            </div>
          </div>

          {/* Timeline Item 2 */}
          <div className="flex gap-6">
            <div className="flex flex-col items-center flex-shrink-0">
              <div className="w-4 h-4 rounded-full bg-[#88C0D0]"></div>
              <div className="w-0.5 h-full bg-[#88C0D0] mt-2"></div>
            </div>
            <div className="flex-grow pb-4">
              <div className="text-sm font-bold text-[#88C0D0] mb-2">2022</div>
              <h3 className="text-lg font-semibold text-[#2E3440] dark:text-[#ECEFF4] mb-2">
                東京大学 理科一類 入学
              </h3>
            </div>
          </div>

          {/* Timeline Item 3 */}
          <div className="flex gap-6">
            <div className="flex flex-col items-center flex-shrink-0">
              <div className="w-4 h-4 rounded-full bg-[#88C0D0]"></div>
            </div>
            <div className="flex-grow">
              <div className="text-sm font-bold text-[#88C0D0] mb-2">2024</div>
              <h3 className="text-lg font-semibold text-[#2E3440] dark:text-[#ECEFF4] mb-2">
                東京大学 工学部 電気電子工学科 進学
              </h3>
              <p className="text-[#434C5E] dark:text-[#E5E9F0]">
                現在所属(mtl lab)
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Uses Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-semibold text-[#2E3440] dark:text-[#ECEFF4] mb-8">
          /uses
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Editor */}
          <div>
            <h3 className="text-lg font-semibold text-[#88C0D0] mb-3">
              Editor
            </h3>
            <ul className="space-y-2 text-[#434C5E] dark:text-[#E5E9F0] text-sm">
              <li>NeoVim </li>
              <li>VScode</li>
            </ul>
          </div>

          {/* Terminal */}
          <div>
            <h3 className="text-lg font-semibold text-[#88C0D0] mb-3">
              Terminal
            </h3>
            <ul className="space-y-2 text-[#434C5E] dark:text-[#E5E9F0] text-sm">
              <li>Wezterm</li>
              <li>fish</li>
            </ul>
          </div>

          {/* Hardware */}
          <div>
            <h3 className="text-lg font-semibold text-[#88C0D0] mb-3">
              Hardware
            </h3>
            <ul className="space-y-2 text-[#434C5E] dark:text-[#E5E9F0] text-sm">
              <li>MacBook Air M1</li>
              <li>HHKB professional classic type-s</li>
            </ul>
          </div>

          {/* Daily Drivers */}
          <div>
            <h3 className="text-lg font-semibold text-[#88C0D0] mb-3">
              Daily Drivers
            </h3>
            <ul className="space-y-2 text-[#434C5E] dark:text-[#E5E9F0] text-sm">
              <li>firefox</li>
              <li>Obsidian</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Tech Stack */}
      <div className="pt-6 border-t border-[#D8DEE9] dark:border-[#4C566A]">
        <h2 className="text-2xl font-semibold text-[#2E3440] dark:text-[#ECEFF4] mb-4">
          Tech Stack
        </h2>
        <ul className="list-disc pl-6 space-y-1 text-[#434C5E] dark:text-[#E5E9F0]">
          <li>Next.js 16 (App Router)</li>
          <li>React 19</li>
          <li>TypeScript</li>
          <li>MDX</li>
          <li>Tailwind CSS v4</li>
        </ul>


      </div>
    </div>
  );
}
