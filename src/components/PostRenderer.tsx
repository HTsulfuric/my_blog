import { MDXRemote } from "next-mdx-remote/rsc"; // 💡 RSC版を使用
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";

const options = {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      [
        rehypePrettyCode,
        {
          theme: "github-dark", // 好きなテーマ
          keepBackground: true,
        },
      ],
    ],
  },
};

export default function PostRenderer({ source }: { source: string }) {
  return (
    <div className="mdx-content">
      {/* @ts-expect-error Server Component types compatibility */}
      <MDXRemote source={source} options={options} />
    </div>
  );
}
