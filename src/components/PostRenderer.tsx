import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";

interface PostRendererProps {
  source: string;
}

const mdxOptions = {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      [
        rehypePrettyCode,
        {
          theme: "github-dark",
          keepBackground: true,
        },
      ],
    ],
  },
};

export default function PostRenderer({ source }: PostRendererProps) {
  return (
    <div className="mdx-content">
      {/* @ts-expect-error - MDXRemote RSC types are not fully compatible with TypeScript */}
      <MDXRemote source={source} options={mdxOptions} />
    </div>
  );
}
