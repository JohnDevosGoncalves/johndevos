import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 6,
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
            width: 28,
            height: 28,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(56,210,228,0.25) 0%, rgba(90,154,249,0.1) 50%, transparent 70%)",
            top: 2,
            left: 2,
          }}
        />
        <div
          style={{
            fontSize: 18,
            fontWeight: 800,
            background: "linear-gradient(135deg, #5a9af9, #38d2e4)",
            backgroundClip: "text",
            color: "transparent",
            letterSpacing: -1,
          }}
        >
          J
        </div>
      </div>
    ),
    { ...size }
  );
}
