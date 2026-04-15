import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// In-memory rate limiting (per IP, resets on deploy — sufficient for a showcase site)
const rateLimit = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const CLEANUP_INTERVAL_MS = 5 * 60 * 1000; // cleanup every 5 minutes
let lastCleanup = Date.now();

function cleanupExpiredEntries() {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL_MS) return;
  lastCleanup = now;
  for (const [ip, entry] of rateLimit) {
    if (now > entry.resetAt) rateLimit.delete(ip);
  }
}

function isRateLimited(ip: string): boolean {
  cleanupExpiredEntries();
  const now = Date.now();
  const entry = rateLimit.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  entry.count++;
  return entry.count > RATE_LIMIT_MAX;
}

function sanitize(str: string): string {
  return str
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .trim();
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  // Rate limiting
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Trop de requêtes. Réessayez dans quelques minutes." },
      { status: 429 }
    );
  }

  // Parse body
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Requête invalide." },
      { status: 400 }
    );
  }

  const { name, email, company, message, website } = body as {
    name?: string;
    email?: string;
    company?: string;
    message?: string;
    website?: string; // honeypot
  };

  // Honeypot — if filled, it's a bot
  if (website) {
    // Return success to not reveal the trap
    return NextResponse.json({ success: true });
  }

  // Validation
  if (!name || typeof name !== "string" || name.trim().length < 2) {
    return NextResponse.json(
      { error: "Le nom est requis (2 caractères minimum)." },
      { status: 400 }
    );
  }

  if (!email || typeof email !== "string" || !EMAIL_REGEX.test(email.trim())) {
    return NextResponse.json(
      { error: "Adresse email invalide." },
      { status: 400 }
    );
  }

  if (!message || typeof message !== "string" || message.trim().length < 10) {
    return NextResponse.json(
      { error: "Le message est requis (10 caractères minimum)." },
      { status: 400 }
    );
  }

  if (name.length > 200 || email.length > 200 || (company && typeof company === "string" && company.length > 200) || message.length > 5000) {
    return NextResponse.json(
      { error: "Un ou plusieurs champs dépassent la longueur maximale." },
      { status: 400 }
    );
  }

  // Sanitize
  const sanitizedData = {
    name: sanitize(name),
    email: email.trim().toLowerCase(),
    company: company && typeof company === "string" ? sanitize(company) : "",
    message: sanitize(message),
    submittedAt: new Date().toISOString(),
  };

  // ── Send email via Resend ──
  const apiKey = process.env.RESEND_API_KEY;
  const contactEmail = process.env.CONTACT_EMAIL || "contact@johndevos.fr";

  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY is not set");
    // In dev, log instead of failing
    if (process.env.NODE_ENV === "development") {
      console.log("[contact] DEV MODE — email would be:", JSON.stringify(sanitizedData, null, 2));
      return NextResponse.json({ success: true });
    }
    return NextResponse.json(
      { error: "Service temporairement indisponible." },
      { status: 500 }
    );
  }

  try {
    const resend = new Resend(apiKey);

    await resend.emails.send({
      from: "Site johndevos.fr <onboarding@resend.dev>",
      to: contactEmail,
      replyTo: sanitizedData.email,
      subject: `Nouveau contact : ${sanitizedData.name}${sanitizedData.company ? ` (${sanitizedData.company})` : ""}`,
      text: [
        `Nom : ${sanitizedData.name}`,
        `Email : ${sanitizedData.email}`,
        sanitizedData.company ? `Entreprise : ${sanitizedData.company}` : null,
        ``,
        `Message :`,
        sanitizedData.message,
        ``,
        `---`,
        `Envoyé depuis johndevos.fr le ${sanitizedData.submittedAt}`,
      ]
        .filter(Boolean)
        .join("\n"),
    });
  } catch (err) {
    console.error("[contact] Resend error:", err);
    return NextResponse.json(
      { error: "Impossible d'envoyer le message. Réessayez." },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
