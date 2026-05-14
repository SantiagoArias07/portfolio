import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0a0a0a",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "5px",
        }}
      >
        <span
          style={{
            color: "#00ff88",
            fontSize: 21,
            fontWeight: 900,
            fontFamily: "sans-serif",
            lineHeight: 1,
            letterSpacing: "-0.04em",
          }}
        >
          S
        </span>
      </div>
    ),
    { ...size }
  );
}
