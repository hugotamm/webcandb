import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0d4a3a",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontWeight: 800,
          fontSize: 18,
          letterSpacing: -0.5,
          fontFamily: "sans-serif",
        }}
      >
        C&B
      </div>
    ),
    { ...size },
  );
}
