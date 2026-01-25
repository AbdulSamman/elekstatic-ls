import { EmailTemplateProps } from "../../../../interfaces";

export function EmailTemplate({ firstName, totalPrice }: EmailTemplateProps) {
  return (
    <div>
      <h1>Hallo {firstName},</h1>
      <p>Vielen Dank für deine Bestellung.</p>
      <p>Gesamtbetrag: €{totalPrice}</p>
    </div>
  );
}
