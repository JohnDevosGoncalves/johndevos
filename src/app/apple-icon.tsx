import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          borderRadius: 36,
          background: "#111a2e",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle gradient glow behind the letter */}
        <div
          style={{
            position: "absolute",
            width: 160,
            height: 160,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(56,210,228,0.25) 0%, rgba(90,154,249,0.1) 50%, transparent 70%)",
            top: 10,
            left: 10,
          }}
        />
        {/* Faint border glow */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 36,
            border: "1px solid rgba(90,154,249,0.15)",
          }}
        />
        <div
          style={{
            fontSize: 100,
            fontWeight: 800,
            background: "linear-gradient(135deg, #5a9af9, #38d2e4)",
            backgroundClip: "text",
            color: "transparent",
            letterSpacing: -4,
          }}
        >
          J
        </div>
      </div>
    ),
    { ...size }
  );
}
