import Link from "next/link";

export const metadata = {
  title: "遊び場",
  description: "いろいろなツールを置いておく場所です。",
};

export default function PlaygroundPage() {
  const tools = [
    {
      title: "ClaudeAPI使用量",
      description: "自分のClaude APIの使用量をグラフにしてみた(不定期更新)",
      href: "/playground/usage",
    },
  ];

  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 text-[#2E3440] dark:text-[#ECEFF4]">
          遊び場
        </h1>
        <p className="text-[#4C566A] dark:text-[#D8DEE9]">
          いろいろなツールを置いておく場所です。
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tools.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="block bg-white dark:bg-[#3B4252] border border-[#D8DEE9] dark:border-[#434C5E] rounded-lg p-6 hover:border-[#5E81AC] dark:hover:border-[#88C0D0] transition-colors shadow-sm"
          >
            <h2 className="text-xl font-bold mb-2 text-[#2E3440] dark:text-[#ECEFF4]">
              {tool.title}
            </h2>
            <p className="text-[#4C566A] dark:text-[#D8DEE9]">
              {tool.description}
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}
