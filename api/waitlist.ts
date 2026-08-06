import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient } from "@supabase/supabase-js";
import nodemailer from "nodemailer";
import { buildWaitlistEmail } from "./_emailTemplate";

// Server-only clients — instantiated lazily so a missing env var doesn't crash
// the whole function on import, just the request that needs it.
function getSupabase() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

function getTransporter() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return null;
  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT ?? 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: { user: SMTP_USER, pass: SMTP_PASS },
    // A hung SMTP connection would otherwise block the whole serverless
    // invocation until Vercel's platform timeout kills it (a bare 500 with
    // no JSON body) — these keep a bad SMTP config failing fast and catchable.
    connectionTimeout: 5000,
    greetingTimeout: 5000,
    socketTimeout: 5000,
  });
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const VALID_STAGES = new Set(["idea", "building", "live", "scaling"]);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method !== "POST") {
      res.status(405).json({ error: "Method not allowed" });
      return;
    }

    const { email, building, stage, linkedin, website } = (req.body ?? {}) as {
      email?: string;
      building?: string;
      stage?: string;
      linkedin?: string;
      website?: string;
    };

    if (!email || !EMAIL_RE.test(email)) {
      res.status(400).json({ error: "A valid email is required" });
      return;
    }
    if (!building || !building.trim()) {
      res.status(400).json({ error: "Tell us what you're building" });
      return;
    }
    if (!stage || !VALID_STAGES.has(stage)) {
      res.status(400).json({ error: "Invalid stage" });
      return;
    }
    if (!linkedin || !linkedin.trim()) {
      res.status(400).json({ error: "A LinkedIn profile is required" });
      return;
    }

    const supabase = getSupabase();
    if (!supabase) {
      console.error("Waitlist: SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY not set");
      res.status(503).json({ error: "Waitlist storage is not configured" });
      return;
    }

    const { error: dbError } = await supabase.from("waitlist").insert({
      email: email.trim().toLowerCase(),
      building: building.trim(),
      stage,
      linkedin: linkedin.trim(),
      website: website?.trim() || null,
    });

    if (dbError) {
      console.error("Supabase insert failed:", dbError.message, dbError.details, dbError.hint);
      res.status(500).json({ error: "Could not save your application" });
      return;
    }

    // The application is saved — a failed confirmation email shouldn't fail the request.
    const transporter = getTransporter();
    if (transporter) {
      try {
        const { text, html } = buildWaitlistEmail({
          building: building.trim(),
          stage,
          linkedin: linkedin.trim(),
          website: website?.trim() || undefined,
        });
        await transporter.sendMail({
          from: process.env.SMTP_FROM || process.env.SMTP_USER,
          to: email,
          subject: "You're on the Cofolio waitlist",
          text,
          html,
        });
      } catch (mailError) {
        console.error("Confirmation email failed:", mailError);
      }
    } else {
      console.warn("Waitlist: SMTP env vars not fully set — skipping confirmation email");
    }

    res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Waitlist handler crashed:", err);
    res.status(500).json({ error: "Something went wrong. Please try again." });
  }
}
