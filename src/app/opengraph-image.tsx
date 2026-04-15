import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "John Devos — Consultant Digital & Accompagnement sur-mesure";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#06060b",
          backgroundImage:
            "radial-gradient(circle at 25% 25%, rgba(124, 92, 252, 0.15) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(0, 212, 170, 0.1) 0%, transparent 50%)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "20px",
          }}
        >
          <div
            style={{
              fontSize: 28,
              fontWeight: 500,
              color: "#00d4aa",
              letterSpacing: "4px",
              textTransform: "uppercase",
            }}
          >
            Accompagnement Digital
          </div>
          <div
            style={{
              fontSize: 64,
              fontWeight: 700,
              color: "#f8fafc",
              textAlign: "center",
              lineHeight: 1.2,
            }}
          >
            John Devos
          </div>
          <div
            style={{
              fontSize: 24,
              color: "#94a3b8",
              textAlign: "center",
              maxWidth: "800px",
              lineHeight: 1.5,
            }}
          >
            Sites web • Applications SaaS • Identité visuelle • IA & Automatisation
          </div>
          <div
            style={{
              marginTop: "20px",
              fontSize: 18,
              color: "#7c5cfc",
              borderBottom: "2px solid #7c5cfc",
              paddingBottom: "4px",
            }}
          >
            johndevos.fr
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
