import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[#D8DEE9] dark:border-[#4C566A] bg-white dark:bg-[#2E3440] mt-auto">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
          <p className="text-sm text-[#4C566A] dark:text-[#D8DEE9]">
            © {currentYear} 熱濃硫酸の本棚. All rights reserved.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <Link
              href="/about"
              className="text-sm text-[#4C566A] dark:text-[#D8DEE9] hover:text-[#5E81AC] dark:hover:text-[#88C0D0] transition-colors"
            >
              About
            </Link>

            <div className="flex items-center gap-4">
              <a
                href="https://github.com/htsulfuric"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[#4C566A] dark:text-[#D8DEE9] hover:text-[#5E81AC] dark:hover:text-[#88C0D0] transition-colors"
                aria-label="GitHub"
              >
                GitHub
              </a>
              <a
                href="https://twitter.com/htsulfuricacid"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[#4C566A] dark:text-[#D8DEE9] hover:text-[#5E81AC] dark:hover:text-[#88C0D0] transition-colors"
                aria-label="Twitter"
              >
                Twitter
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
