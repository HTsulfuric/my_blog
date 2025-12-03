import * as cheerio from "cheerio";

interface LinkCardProps {
  url: string;
}

async function getMetaTags(url: string) {
  try {
    const res = await fetch(url, { next: { revalidate: 3600 } }); // Cache for 1 hour
    const html = await res.text();
    const $ = cheerio.load(html);

    const title =
      $('meta[property="og:title"]').attr("content") || $("title").text() || "";
    const description =
      $('meta[property="og:description"]').attr("content") ||
      $('meta[name="description"]').attr("content") ||
      "";
    const image = $('meta[property="og:image"]').attr("content") || "";

    // 相対パスの画像を絶対パスに変換する簡易的な処理
    let imageUrl = image;
    if (image && !image.startsWith("http")) {
      try {
        const urlObj = new URL(url);
        imageUrl = `${urlObj.protocol}//${urlObj.host}${image}`;
      } catch {
        // URLパースエラーの場合はそのままにする
      }
    }

    return { title, description, image: imageUrl };
  } catch (error) {
    console.error("Failed to fetch meta tags", error);
    return null;
  }
}

export default async function LinkCard({ url }: LinkCardProps) {
  const meta = await getMetaTags(url);

  if (!meta) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#5E81AC] dark:text-[#88C0D0] hover:underline break-all"
      >
        {url}
      </a>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block my-6 no-underline bg-white dark:bg-[#3B4252] border border-[#D8DEE9] dark:border-[#434C5E] rounded-lg overflow-hidden hover:border-[#88C0D0] transition-colors group not-prose"
    >
      <div className="flex h-auto md:h-32">
        <div className="flex-1 p-4 flex flex-col justify-center min-w-0">
          <h3 className="text-base font-bold text-[#2E3440] dark:text-[#ECEFF4] truncate group-hover:text-[#88C0D0] mb-1">
            {meta.title}
          </h3>
          <p className="text-sm text-[#4C566A] dark:text-[#D8DEE9] line-clamp-2 text-ellipsis overflow-hidden">
            {meta.description}
          </p>
          <span className="text-xs text-[#4C566A] dark:text-[#D8DEE9] mt-2 opacity-70 truncate">
            {new URL(url).hostname}
          </span>
        </div>
        {meta.image && (
          <div className="hidden md:block w-48 relative bg-gray-100 dark:bg-gray-800 flex-shrink-0 border-l border-[#D8DEE9] dark:border-[#434C5E]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={meta.image}
              alt={meta.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>
    </a>
  );
}
