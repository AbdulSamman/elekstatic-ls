import { Resend } from "resend";
import { EmailTemplate } from "./_components/emailTemplate";

export async function POST(req: Request) {
  const { firstName, totalAmount, email } = await req.json();
  console.log("SEND EMAIL API HIT");

  console.log("RESEND_API_KEY:", process.env.RESEND_API_KEY);

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    const result = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Test",
      react: EmailTemplate({
        firstName,
        email,
        totalPrice: totalAmount,
      }),
    });

    console.log("RESEND RESULT:", result);

    return Response.json(result);
  } catch (err) {
    console.error("FATAL ERROR:", err);
    throw err;
  }
}
