import type { APIRoute } from "astro";

const RESEND_API_KEY = import.meta.env.RESEND_API_KEY;
const RESEND_FROM_EMAIL =
  import.meta.env.RESEND_FROM_EMAIL ?? "web@smichovliving.cz";
const RESEND_TO_EMAIL =
  import.meta.env.RESEND_TO_EMAIL ?? "info@smichovliving.cz";

export const POST: APIRoute = async ({ request }) => {
  if (!RESEND_API_KEY) {
    return new Response("Missing Resend API key", { status: 500 });
  }

  const data = await request.formData();
  const name = data.get("jmeno")?.toString() ?? "Neznámý";
  const phone = data.get("telefon")?.toString() ?? "";
  const email = data.get("email")?.toString() ?? "";
  const projectType = data.get("typ_projektu")?.toString() ?? "";
  const message = data.get("popis")?.toString() ?? "";

  const html = `
    <p><strong>Jméno:</strong> ${name}</p>
    <p><strong>Telefon:</strong> ${phone}</p>
    <p><strong>Email:</strong> ${email}</p>
    ${projectType ? `<p><strong>Typ projektu:</strong> ${projectType}</p>` : ""}
    ${message ? `<p><strong>Popis:</strong> ${message}</p>` : ""}
  `;

  const resendResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: RESEND_FROM_EMAIL,
      to: RESEND_TO_EMAIL,
      subject: `Nová poptávka – ${name}`,
      html,
    }),
  });

  if (!resendResponse.ok) {
    const errorText = await resendResponse.text();
    return new Response(`Resend error: ${errorText}`, { status: 502 });
  }

  return new Response("OK", { status: 200 });
};
