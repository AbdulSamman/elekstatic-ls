import { Resend } from "resend";
import { EmailTemplate } from "./_components/emailTemplate";

export async function POST(req: Request) {
  const { firstName, totalPrice, email } = await req.json();
  console.log("SEND EMAIL API HIT");

  console.log("RESEND_API_KEY:", process.env.RESEND_API_KEY);

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    const result = await resend.emails.send({
      from: "SAMMAN & BOFFO HiFi Audiotechnik <info@snbaudio.de>",
      to: email,
      bcc: ["tkservas@gmail.com"],
      subject:
        "Welcome to SAM & BOFF HiFi Audiotechnik - Your Order Confirmation",
      react: EmailTemplate({
        firstName,
        email,
        totalPrice: totalPrice,
      }),
    });

    console.log("RESEND RESULT:", result);

    return Response.json(result);
  } catch (err) {
    console.error("FATAL ERROR:", err);
    throw err;
  }
}
