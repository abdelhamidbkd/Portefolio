// /app/api/contact/route.js
import nodemailer from "nodemailer";

export async function POST(req) {
  const { name, email, message } = await req.json();

  const transporter = nodemailer.createTransport({
    service: "gmail", // ou smtp, ex: 'smtp.mailtrap.io'
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: process.env.EMAIL_TO,
      subject: "Nouveau message de contact",
      text: message,
      html: `<p><strong>Nom:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Message:</strong><br/>${message}</p>`,
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
} catch (error) {
    console.error("Erreur lors de l'envoi de l'email:", error); // <-- ajoute ça
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
  }
}
