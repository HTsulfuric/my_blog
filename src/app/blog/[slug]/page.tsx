import { getPostBySlug, getPostSlugs } from "@/lib/mdx";
import { calculateReadingTime, formatRelativeDate } from "@/lib/utils";
import PostRenderer from "@/components/PostRenderer";
import TagList from "@/components/TagList";
import { notFound } from "next/navigation";

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getPostSlugs();
  return slugs.map((slug) => ({
    slug: slug.replace(/\.mdx?$/, ""),
  }));
}

export async function generateMetadata({ params }: PostPageProps) {
  const { slug } = await params;

  try {
    const post = await getPostBySlug(slug);
    return {
      title: post.frontMatter.title,
      description: post.frontMatter.description,
    };
  } catch {
    return {
      title: "記事が見つかりません",
    };
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;

  let post;
  try {
    post = await getPostBySlug(slug);
  } catch {
    notFound();
  }

  const readingTime = calculateReadingTime(post.content);
  const relativeDate = formatRelativeDate(post.frontMatter.date);
  const tags = post.frontMatter.tags || [];

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <header className="mb-8 border-b border-[#D8DEE9] dark:border-[#4C566A] pb-6">
        <h1 className="text-4xl font-extrabold mb-4 text-[#2E3440] dark:text-[#ECEFF4]">
          {post.frontMatter.title}
        </h1>

        <div className="flex items-center gap-3 text-sm text-[#4C566A] dark:text-[#D8DEE9] mb-4">
          <time>{relativeDate}</time>
          <span>•</span>
          <span>{readingTime}分で読めます</span>
        </div>

        <TagList tags={tags} size="medium" />
      </header>

      <article className="prose lg:prose-xl dark:prose-invert">
        <PostRenderer source={post.content} />
      </article>
    </div>
  );
}
