import lighthouseData from "../../../public/lighthouse.json";

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
          Technical Journey
        </h2>

        <div className="space-y-8">
          {/* Timeline Item 1 */}
          <div className="flex gap-6">
            <div className="flex flex-col items-center flex-shrink-0">
              <div className="w-4 h-4 rounded-full bg-[#88C0D0]"></div>
              <div className="w-0.5 h-full bg-[#88C0D0] mt-2"></div>
            </div>
            <div className="flex-grow pb-4">
              <div className="text-sm font-bold text-[#88C0D0] mb-2">YYYY</div>
              <h3 className="text-xl font-semibold text-[#2E3440] dark:text-[#ECEFF4] mb-2">
                Milestone Title
              </h3>
              <p className="text-[#434C5E] dark:text-[#E5E9F0]">
                What you learned or what changed in your thinking. Focus on the
                lesson, not just the technology.
              </p>
            </div>
          </div>

          {/* Timeline Item 2 */}
          <div className="flex gap-6">
            <div className="flex flex-col items-center flex-shrink-0">
              <div className="w-4 h-4 rounded-full bg-[#88C0D0]"></div>
              <div className="w-0.5 h-full bg-[#88C0D0] mt-2"></div>
            </div>
            <div className="flex-grow pb-4">
              <div className="text-sm font-bold text-[#88C0D0] mb-2">YYYY</div>
              <h3 className="text-xl font-semibold text-[#2E3440] dark:text-[#ECEFF4] mb-2">
                Another Milestone
              </h3>
              <p className="text-[#434C5E] dark:text-[#E5E9F0]">
                A key learning moment or pivot in your journey.
              </p>
            </div>
          </div>

          {/* Timeline Item 3 */}
          <div className="flex gap-6">
            <div className="flex flex-col items-center flex-shrink-0">
              <div className="w-4 h-4 rounded-full bg-[#88C0D0]"></div>
            </div>
            <div className="flex-grow">
              <div className="text-sm font-bold text-[#88C0D0] mb-2">YYYY</div>
              <h3 className="text-xl font-semibold text-[#2E3440] dark:text-[#ECEFF4] mb-2">
                Recent Development
              </h3>
              <p className="text-[#434C5E] dark:text-[#E5E9F0]">
                Where you are now and what you focus on.
              </p>
            </div>
          </div>
        </div>

        {/* TODO for user */}
        {/*
          TODO: Customize timeline above
          - Replace YYYY with actual years
          - Update titles and descriptions with your journey
          - Add or remove items (duplicate the structure)
          - Focus on what you learned, not just tech lists
        */}
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
              <li>VSCode - Primary editor</li>
              <li>Theme: Nord</li>
              <li>Font: JetBrains Mono</li>
            </ul>
          </div>

          {/* Terminal */}
          <div>
            <h3 className="text-lg font-semibold text-[#88C0D0] mb-3">
              Terminal
            </h3>
            <ul className="space-y-2 text-[#434C5E] dark:text-[#E5E9F0] text-sm">
              <li>iTerm2 - Terminal</li>
              <li>zsh - Shell</li>
              <li>tmux - Sessions</li>
            </ul>
          </div>

          {/* Hardware */}
          <div>
            <h3 className="text-lg font-semibold text-[#88C0D0] mb-3">
              Hardware
            </h3>
            <ul className="space-y-2 text-[#434C5E] dark:text-[#E5E9F0] text-sm">
              <li>MacBook Pro M2</li>
              <li>LG UltraFine 4K</li>
              <li>HHKB Keyboard</li>
            </ul>
          </div>

          {/* Daily Drivers */}
          <div>
            <h3 className="text-lg font-semibold text-[#88C0D0] mb-3">
              Daily Drivers
            </h3>
            <ul className="space-y-2 text-[#434C5E] dark:text-[#E5E9F0] text-sm">
              <li>Arc Browser</li>
              <li>Raycast Launcher</li>
              <li>Obsidian Notes</li>
            </ul>
          </div>
        </div>

        {/* What I Stopped Using */}
        <div className="mt-8 p-4 bg-[#BF616A] bg-opacity-10 dark:bg-[#BF616A] dark:bg-opacity-20 rounded-lg border border-[#BF616A]">
          <h3 className="text-lg font-semibold text-[#BF616A] mb-3">
            What I Stopped Using
          </h3>
          <ul className="space-y-2 text-[#434C5E] dark:text-[#E5E9F0] text-sm">
            <li>Docker Desktop - Too heavy, switched to Colima</li>
            <li>Postman - Bloated, using Bruno now</li>
            <li>Notion - Too slow, back to markdown</li>
          </ul>
        </div>

        {/* TODO for user */}
        {/*
          TODO: Update /uses section with your actual tools
          - Replace all placeholder tools with what you use
          - Add or remove categories as needed
          - Keep "What I Stopped Using" honest
        */}
      </div>

      {/* Tech Stack */}
      <div className="pt-6 border-t border-[#D8DEE9] dark:border-[#4C566A]">
        <h2 className="text-2xl font-semibold text-[#2E3440] dark:text-[#ECEFF4] mb-4">
          Tech Stack
        </h2>
        <p className="text-[#434C5E] dark:text-[#E5E9F0] mb-2">
          このブログの構成要素:
        </p>
        <ul className="list-disc pl-6 space-y-1 text-[#434C5E] dark:text-[#E5E9F0]">
          <li>Next.js 16 (App Router)</li>
          <li>React 19</li>
          <li>TypeScript</li>
          <li>MDX</li>
          <li>Tailwind CSS v4</li>
        </ul>

        {/* Lighthouse Score */}
        {lighthouseData.score > 0 && (
          <div className="mt-6 p-4 bg-[#88C0D0] bg-opacity-10 dark:bg-[#88C0D0] dark:bg-opacity-20 rounded-lg border border-[#88C0D0]">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#434C5E] dark:text-[#E5E9F0]">
                Lighthouse Performance
              </span>
              <span className="text-2xl font-bold text-[#88C0D0]">
                {lighthouseData.score}/100
              </span>
            </div>
            <p className="text-xs text-[#434C5E] dark:text-[#E5E9F0] mt-2">
              Last tested:{" "}
              {new Date(lighthouseData.lastUpdated).toLocaleDateString("ja-JP")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
