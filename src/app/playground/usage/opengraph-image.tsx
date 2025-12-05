import { ImageResponse } from "next/og";

export const alt = "Claude API usage";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
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
          htsulfuric.com / Playground
        </div>
        <div
          style={{
            lineHeight: 1.3,
            fontWeight: "bold",
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          Claude API 使用量
        </div>
        <div
          style={{
            fontSize: 36,
            marginTop: 20,
            color: "#D8DEE9",
            opacity: 0.8,
          }}
        >
          Daily Cost & Token Tracking
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
