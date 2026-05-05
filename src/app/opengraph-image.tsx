import { ImageResponse } from "next/og";

export const alt = "Web C&B — Din gamla hemsida. Helt ny igen.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#f7f6f2",
          display: "flex",
          flexDirection: "column",
          padding: "80px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            fontSize: 28,
            fontWeight: 700,
            color: "#0a0a0a",
            display: "flex",
            alignItems: "center",
          }}
        >
          Web <span style={{ color: "#0d4a3a", marginLeft: 8 }}>C&B</span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginTop: 40,
            color: "#0d4a3a",
            fontSize: 18,
            fontWeight: 600,
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          <div style={{ width: 8, height: 8, background: "#0d4a3a", borderRadius: "50%" }} />
          AI-driven webdesign · Sverige
        </div>

        <div
          style={{
            marginTop: 24,
            fontSize: 96,
            fontWeight: 700,
            letterSpacing: -2,
            lineHeight: 1.05,
            color: "#0a0a0a",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <span>Din gamla hemsida.</span>
          <span style={{ color: "#0d4a3a", fontStyle: "italic" }}>Helt ny igen.</span>
        </div>

        <div
          style={{
            marginTop: "auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            color: "#6b7280",
            fontSize: 22,
          }}
        >
          <div>Modern, snabb sajt på 5 dagar — fast pris.</div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              background: "#0d4a3a",
              color: "white",
              padding: "16px 28px",
              borderRadius: 999,
              fontSize: 22,
              fontWeight: 600,
            }}
          >
            Få demo för 199 kr →
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
