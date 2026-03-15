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
          background: "linear-gradient(135deg, #3b82f6, #06b6d4)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            fontSize: 100,
            fontWeight: 800,
            color: "white",
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
