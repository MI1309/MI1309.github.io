import { ImageResponse } from "next/og";
export const dynamic = "force-static";
export const alt = "MI1309, portofolio Muhammad Imron";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";
export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px 84px",
        backgroundColor: "#101312",
        color: "#e8ece6",
        fontFamily: "Arial, sans-serif",
        border: "14px solid #c7f36b",
      }}
    >
      <div
        style={{
          display: "flex",
          color: "#c7f36b",
          fontSize: 24,
          letterSpacing: 4,
          textTransform: "uppercase",
        }}
      >
        MI1309 / PORTOFOLIO
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <div style={{ fontSize: 88, fontWeight: 700 }}>MI1309</div>
        <div style={{ color: "#c7f36b", fontSize: 34 }}>
          Pengembangan web · Pembelajaran keamanan siber
        </div>
      </div>
      <div style={{ display: "flex", color: "#a4aea6", fontSize: 23 }}>
        Bangun. Belajar. Amankan.
      </div>
    </div>,
    { ...size },
  );
}
