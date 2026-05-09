import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL || "web.candb@gmail.com";
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "Web C&B <onboarding@resend.dev>";

type OrderNotification = {
  packageName: string;
  amountSEK: number;
  customerEmail: string | null;
  customerName: string | null;
  billingAddress: string | null;
  websiteUrl: string | null;
  stripeSessionId: string;
  stripeDashboardUrl: string;
};

export async function sendOrderNotification(order: OrderNotification) {
  const subject = `🎉 Ny beställning: ${order.packageName} (${order.amountSEK} kr)`;

  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 32px 24px; color: #111;">
      <div style="background: #f5f5f4; border-radius: 16px; padding: 32px; margin-bottom: 24px;">
        <div style="font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; color: #d4750c; margin-bottom: 12px;">
          Ny beställning
        </div>
        <h1 style="font-size: 28px; margin: 0 0 16px 0; line-height: 1.2;">
          ${order.packageName}
        </h1>
        <div style="font-size: 32px; font-weight: 700; color: #111;">
          ${order.amountSEK.toLocaleString("sv-SE")} kr
        </div>
      </div>

      <h2 style="font-size: 16px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #666; margin: 32px 0 12px 0;">
        Kunduppgifter
      </h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #666; width: 140px;">Namn</td>
          <td style="padding: 12px 0; border-bottom: 1px solid #eee;"><strong>${order.customerName || "—"}</strong></td>
        </tr>
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #666;">Email</td>
          <td style="padding: 12px 0; border-bottom: 1px solid #eee;">
            ${order.customerEmail ? `<a href="mailto:${order.customerEmail}" style="color: #d4750c;">${order.customerEmail}</a>` : "—"}
          </td>
        </tr>
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #666;">Faktureringsadress</td>
          <td style="padding: 12px 0; border-bottom: 1px solid #eee; white-space: pre-line;">${order.billingAddress || "—"}</td>
        </tr>
        ${order.websiteUrl ? `
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #666;">Webbadress</td>
          <td style="padding: 12px 0; border-bottom: 1px solid #eee;">
            <a href="${order.websiteUrl}" style="color: #d4750c;">${order.websiteUrl}</a>
          </td>
        </tr>
        ` : ""}
      </table>

      <div style="margin-top: 32px; padding-top: 24px; border-top: 2px solid #f5f5f4;">
        <a href="${order.stripeDashboardUrl}" style="display: inline-block; background: #111; color: #fff; padding: 14px 24px; border-radius: 999px; text-decoration: none; font-weight: 600; font-size: 14px;">
          Öppna i Stripe →
        </a>
      </div>

      <p style="color: #999; font-size: 12px; margin-top: 32px;">
        Session-ID: ${order.stripeSessionId}<br>
        Detta mail skickades automatiskt från webcandb.com.
      </p>
    </div>
  `;

  const text = [
    `Ny beställning: ${order.packageName}`,
    `Belopp: ${order.amountSEK.toLocaleString("sv-SE")} kr`,
    "",
    `Namn: ${order.customerName || "—"}`,
    `Email: ${order.customerEmail || "—"}`,
    `Adress: ${order.billingAddress || "—"}`,
    order.websiteUrl ? `Webbadress: ${order.websiteUrl}` : "",
    "",
    `Stripe: ${order.stripeDashboardUrl}`,
    `Session-ID: ${order.stripeSessionId}`,
  ].filter(Boolean).join("\n");

  return resend.emails.send({
    from: FROM_EMAIL,
    to: NOTIFY_EMAIL,
    subject,
    html,
    text,
  });
}
