import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Santiago Arias Paul — Frontend Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0a0a0a",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px 100px",
          fontFamily: "monospace",
          position: "relative",
        }}
      >
        {/* Top label */}
        <div
          style={{
            position: "absolute",
            top: 48,
            left: 100,
            color: "#6b6b6b",
            fontSize: 12,
            letterSpacing: "0.2em",
          }}
        >
          SAP.DEV // v1.0.0
        </div>

        {/* Corner coord */}
        <div
          style={{
            position: "absolute",
            top: 48,
            right: 100,
            color: "#6b6b6b",
            fontSize: 12,
            letterSpacing: "0.1em",
          }}
        >
          25.6866° N, 100.3161° W
        </div>

        {/* Main name */}
        <div
          style={{
            fontSize: 96,
            fontWeight: 700,
            color: "#ededed",
            lineHeight: 0.95,
            letterSpacing: "-0.03em",
            marginBottom: 24,
          }}
        >
          SANTIAGO
          <br />
          ARIAS PAUL
        </div>

        {/* Accent line */}
        <div
          style={{
            width: 200,
            height: 2,
            background: "#00ff88",
            marginBottom: 32,
          }}
        />

        {/* Subtitle */}
        <div
          style={{
            color: "#a1a1a1",
            fontSize: 20,
            letterSpacing: "0.15em",
            marginBottom: 12,
          }}
        >
          FULL-STACK ENGINEER
        </div>
        <div style={{ color: "#6b6b6b", fontSize: 14, letterSpacing: "0.1em" }}>
          Computer Science and Technology · Tec de Monterrey
        </div>

        {/* Bottom right — credentials */}
        <div
          style={{
            position: "absolute",
            bottom: 48,
            right: 100,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: 8,
          }}
        >
          <div
            style={{
              color: "#00ff88",
              fontSize: 11,
              letterSpacing: "0.15em",
            }}
          >
            FUNDACIÓN GALLAGHER SCHOLAR
          </div>
          <div
            style={{
              color: "#6b6b6b",
              fontSize: 11,
              letterSpacing: "0.15em",
            }}
          >
            CODEX // COMPETITIVE PROGRAMMING
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
