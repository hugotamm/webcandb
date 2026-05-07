import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0d4a3a",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Subtle gradient accent in corner */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: 60,
            height: 60,
            background:
              "radial-gradient(circle at top right, rgba(52,211,153,0.4), transparent 70%)",
          }}
        />
        <div
          style={{
            fontWeight: 800,
            fontSize: 88,
            letterSpacing: -3,
            lineHeight: 1,
          }}
        >
          C&B
        </div>
        <div
          style={{
            marginTop: 8,
            fontSize: 14,
            fontWeight: 600,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.7)",
          }}
        >
          Web
        </div>
      </div>
    ),
    { ...size },
  );
}
