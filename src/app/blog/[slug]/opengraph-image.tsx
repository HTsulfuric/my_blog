import { ImageResponse } from "next/og";
import { getPostBySlug } from "@/lib/mdx";

export const alt = "Blog Post";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 64,
          background: "#2E3440",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px",
          color: "#ECEFF4",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 32,
            marginBottom: 40,
            color: "#88C0D0",
            fontWeight: "bold",
          }}
        >
          htsulfuric.com
        </div>
        <div
          style={{
            lineHeight: 1.3,
            fontWeight: "bold",
            display: "flex", // Ensure text wrapping works as expected in satori
            flexWrap: "wrap",
          }}
        >
          {post.frontMatter.title}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
