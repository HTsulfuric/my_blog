import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";
import LinkCard from "@/components/LinkCard";

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

const components = {
  LinkCard,
};

export default function PostRenderer({ source }: PostRendererProps) {
  return (
    <div className="mdx-content">
      <MDXRemote
        source={source}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        options={mdxOptions as any}
        components={components}
      />
    </div>
  );
}
