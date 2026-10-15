import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const alt = "Muhammad Imron, Cybersecurity and Full-Stack Developer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 84px",
          backgroundColor: "#030b12",
          color: "#eafefb",
          fontFamily: "Arial, sans-serif",
          border: "14px solid #71f4b1",
        }}
      >
        <div
          style={{
            display: "flex",
            color: "#71f4b1",
            fontSize: 24,
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          Portfolio / 2026
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 72, fontWeight: 700 }}>Muhammad Imron</div>
          <div style={{ color: "#7df9ff", fontSize: 34 }}>
            Cybersecurity &amp; Full-Stack Developer
          </div>
        </div>
        <div style={{ display: "flex", color: "#9cc5bc", fontSize: 23 }}>
          Secure applications. Thoughtful engineering.
        </div>
      </div>
    ),
    { ...size },
  );
}