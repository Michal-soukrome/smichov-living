import type { APIRoute } from "astro";

const RESEND_API_KEY = import.meta.env.RESEND_API_KEY;
const RESEND_FROM_EMAIL = import.meta.env.RESEND_FROM_EMAIL;
const RESEND_TO_EMAIL = import.meta.env.RESEND_TO_EMAIL;

export const POST: APIRoute = async ({ request }) => {
  if (!RESEND_API_KEY || !RESEND_FROM_EMAIL || !RESEND_TO_EMAIL) {
    return new Response(
      JSON.stringify({ error: "Email configuration missing" }),
      {
        status: 500,
      },
    );
  }

  const data = await request.formData();

  const jmeno = data.get("jmeno")?.toString();
  const telefon = data.get("telefon")?.toString();
  const email = data.get("email")?.toString();
  const popis = data.get("popis")?.toString();

  if (!jmeno || !telefon || !email) {
    return new Response(JSON.stringify({ error: "Missing required fields" }), {
      status: 400,
    });
  }

  const resendResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: RESEND_FROM_EMAIL,
      to: RESEND_TO_EMAIL,
      reply_to: email,
      subject: `Nová poptávka – ${jmeno}`,
      html: `
        <h2>Nová poptávka z webu</h2>

        <p><strong>Jméno:</strong> ${jmeno}</p>
        <p><strong>Telefon:</strong> ${telefon}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Zpráva:</strong></p>
        <p>${popis ?? ""}</p>
      `,
    }),
  });

  if (!resendResponse.ok) {
    const error = await resendResponse.text();

    console.error("Resend error:", error);

    return new Response(JSON.stringify({ error: "Email failed" }), {
      status: 500,
    });
  }

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
  });
};
