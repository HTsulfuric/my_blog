import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-[#D8DEE9] dark:border-[#4C566A] bg-white dark:bg-[#2E3440]">
      <nav className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="text-xl font-bold text-[#2E3440] dark:text-[#ECEFF4] hover:text-[#5E81AC] dark:hover:text-[#88C0D0] transition-colors"
        >
          熱濃硫酸の本棚
        </Link>

        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="text-sm font-medium text-[#4C566A] dark:text-[#D8DEE9] hover:text-[#5E81AC] dark:hover:text-[#88C0D0] transition-colors"
          >
            ホーム
          </Link>
          <Link
            href="/tag"
            className="text-sm font-medium text-[#4C566A] dark:text-[#D8DEE9] hover:text-[#5E81AC] dark:hover:text-[#88C0D0] transition-colors"
          >
            タグ
          </Link>
        </div>
      </nav>
    </header>
  );
}
