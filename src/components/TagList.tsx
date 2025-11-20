import Link from "next/link";

interface TagListProps {
  tags: string[];
  clickable?: boolean;
  size?: "small" | "medium";
}

export default function TagList({
  tags,
  clickable = true,
  size = "small",
}: TagListProps) {
  if (tags.length === 0) return null;

  const sizeClasses = {
    small: "px-2 py-1 text-xs",
    medium: "px-3 py-1 text-sm",
  };

  const baseClasses = `${sizeClasses[size]} rounded bg-[#88C0D0]/10 text-[#5E81AC] dark:bg-[#88C0D0]/20 dark:text-[#88C0D0]`;
  const hoverClasses = clickable
    ? "hover:bg-[#88C0D0]/20 dark:hover:bg-[#88C0D0]/30 transition-colors"
    : "";

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) =>
        clickable ? (
          <Link
            key={tag}
            href={`/tag/${encodeURIComponent(tag)}`}
            className={`${baseClasses} ${hoverClasses}`}
          >
            {tag}
          </Link>
        ) : (
          <span key={tag} className={baseClasses}>
            {tag}
          </span>
        )
      )}
    </div>
  );
}
