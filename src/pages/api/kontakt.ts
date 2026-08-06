import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
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
      Authorization: `Bearer ${import.meta.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "web@smichovliving.cz",
      to: "info@smichovliving.cz",
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
    return new Response(JSON.stringify({ error: "Email failed" }), {
      status: 500,
    });
  }

  return new Response(JSON.stringify({ success: true }), { status: 200 });
};
