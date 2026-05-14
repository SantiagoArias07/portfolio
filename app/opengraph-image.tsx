import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Santiago Arias Paul — Software Engineer";
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
          padding: "72px 96px",
          fontFamily: "monospace",
          position: "relative",
        }}
      >
        {/* Green left rail */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 3,
            height: "100%",
            background: "#00ff88",
          }}
        />

        {/* Top row */}
        <div
          style={{
            position: "absolute",
            top: 44,
            left: 96,
            right: 96,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={{ color: "#6b6b6b", fontSize: 11, letterSpacing: "0.2em" }}>
            SAP.DEV // v1.0.0
          </span>
          <span style={{ color: "#6b6b6b", fontSize: 11, letterSpacing: "0.1em" }}>
            25.6515° N, 100.2897° W · TEC DE MONTERREY
          </span>
        </div>

        {/* Name */}
        <div
          style={{
            fontSize: 100,
            fontWeight: 900,
            color: "#ededed",
            lineHeight: 0.92,
            letterSpacing: "-0.04em",
            marginBottom: 28,
          }}
        >
          SANTIAGO
          <br />
          ARIAS PAUL
        </div>

        {/* Accent line */}
        <div
          style={{
            width: 180,
            height: 2,
            background: "#00ff88",
            marginBottom: 28,
          }}
        />

        {/* Title + institution row */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div
            style={{
              color: "#a1a1a1",
              fontSize: 18,
              letterSpacing: "0.18em",
              fontWeight: 500,
            }}
          >
            SOFTWARE ENGINEER · FRONTEND-FOCUSED
          </div>
          <div style={{ color: "#6b6b6b", fontSize: 13, letterSpacing: "0.1em" }}>
            B.S. Computer Science and Technology · Tec de Monterrey · 2029
          </div>
        </div>

        {/* Bottom row */}
        <div
          style={{
            position: "absolute",
            bottom: 44,
            left: 96,
            right: 96,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <div style={{ display: "flex", gap: 32 }}>
            <span
              style={{
                color: "#00ff88",
                fontSize: 10,
                letterSpacing: "0.18em",
                fontWeight: 600,
              }}
            >
              GALLAGHER FOUNDATION SCHOLAR
            </span>
            <span style={{ color: "#6b6b6b", fontSize: 10, letterSpacing: "0.18em" }}>
              CODEX // COMPETITIVE PROGRAMMING
            </span>
          </div>
          <span style={{ color: "#3a3a3a", fontSize: 10, letterSpacing: "0.12em" }}>
            santiagoapaul.dev
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
