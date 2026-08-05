// Cofolio brand colors, matching src/index.css (--neon, --electric, --background, etc.)
// Kept as plain hex here since email clients don't support CSS custom properties.
const COLORS = {
  bg: "#050505",
  card: "#0d0d0f",
  border: "rgba(255,255,255,0.08)",
  panel: "rgba(255,255,255,0.03)",
  neon: "#abff1a",
  electric: "#a64dff",
  foreground: "#f2f2f2",
  muted: "#8c8c8c",
};

function escapeHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const STAGE_LABELS: Record<string, string> = {
  idea: "Idea",
  building: "Building",
  live: "Live",
  scaling: "Scaling",
};

export function buildWaitlistEmail({
  building,
  stage,
  linkedin,
  website,
}: {
  building: string;
  stage: string;
  linkedin: string;
  website?: string;
}) {
  const stageLabel = STAGE_LABELS[stage] ?? stage;
  const year = new Date().getFullYear();

  const receiptRows: Array<[string, string]> = [
    ["Building", building],
    ["Stage", stageLabel],
    ["LinkedIn", linkedin],
  ];
  if (website) receiptRows.push(["Website", website]);

  const text = [
    "Thanks for applying — we only let doers in.",
    "",
    "What you told us:",
    ...receiptRows.map(([label, value]) => `- ${label}: ${value}`),
    "",
    "We review every application. If you're a fit, we'll follow up with next steps and let you in.",
    "",
    "— Cofolio",
  ].join("\n");

  const receiptHtml = receiptRows
    .map(([label, value], i) => `
                  ${i > 0 ? `<tr><td style="padding:0 20px;"><div style="border-top:1px solid ${COLORS.border}; line-height:0;">&nbsp;</div></td></tr>` : ""}
                  <tr>
                    <td style="padding:${i === 0 ? 20 : 16}px 20px 4px; color:${COLORS.muted}; font-size:11px; letter-spacing:0.15em; text-transform:uppercase;">${escapeHtml(label)}</td>
                  </tr>
                  <tr>
                    <td style="padding:0 20px ${i === receiptRows.length - 1 ? 20 : 16}px; color:${label === "Stage" ? COLORS.neon : COLORS.foreground}; font-size:15px; font-weight:${label === "Stage" ? 600 : 500};">${escapeHtml(value)}</td>
                  </tr>`)
    .join("");

  const html = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>You're on the Cofolio waitlist</title>
  </head>
  <body style="margin:0; padding:0; background-color:${COLORS.bg}; font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
    <div style="display:none; max-height:0; overflow:hidden; opacity:0;">
      We've got your application — it's in review.
    </div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${COLORS.bg};">
      <tr>
        <td align="center" style="padding:40px 16px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;">
            <tr>
              <td style="padding-bottom:28px;">
                <table role="presentation" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="width:32px; height:32px; border-radius:8px; background-color:rgba(171,255,26,0.15); text-align:center; vertical-align:middle; font-family:monospace;">
                      <span style="color:${COLORS.neon}; font-weight:700; font-size:14px; line-height:32px;">C</span>
                    </td>
                    <td style="padding-left:10px; color:${COLORS.foreground}; font-weight:700; font-size:18px; letter-spacing:-0.02em;">cofolio</td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td style="background-color:${COLORS.card}; border:1px solid ${COLORS.border}; border-radius:20px; padding:40px 32px;">
                <p style="margin:0 0 8px; color:${COLORS.neon}; font-size:12px; font-weight:600; letter-spacing:0.3em; text-transform:uppercase;">Application Received</p>
                <h1 style="margin:0 0 20px; color:${COLORS.foreground}; font-size:32px; line-height:1.15; font-weight:700; letter-spacing:-0.02em;">
                  Your Application<br /><span style="color:${COLORS.neon};">Is In Review.</span>
                </h1>
                <p style="margin:0 0 28px; color:${COLORS.muted}; font-size:15px; line-height:1.6;">
                  Thanks for applying — we only let doers in. Here's what you told us:
                </p>

                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${COLORS.panel}; border:1px solid ${COLORS.border}; border-radius:14px; margin-bottom:28px;">${receiptHtml}
                </table>

                <p style="margin:0; color:${COLORS.muted}; font-size:14px; line-height:1.6;">
                  We review every application. If you're a fit, we'll follow up with next steps and let you in.
                </p>
              </td>
            </tr>

            <tr>
              <td style="padding-top:28px; text-align:center; color:${COLORS.muted}; font-size:12px;">
                © ${year} Cofolio. Built by builders, for builders.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  return { text, html };
}
