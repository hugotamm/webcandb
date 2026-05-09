import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { PACKAGES, isValidPackage } from "@/lib/stripe-products";
import { sendOrderNotification } from "@/lib/email";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-04-22.dahlia",
});

const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing stripe-signature header" }, { status: 400 });
  }

  const rawBody = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, WEBHOOK_SECRET);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Invalid signature";
    console.error("Stripe webhook signature verification failed:", message);
    return NextResponse.json({ error: `Webhook signature error: ${message}` }, { status: 400 });
  }

  if (event.type !== "checkout.session.completed") {
    return NextResponse.json({ received: true, type: event.type });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const packageId = session.metadata?.package;
  const packageName =
    packageId && isValidPackage(packageId) ? PACKAGES[packageId].name : "Okänt paket";

  const amountSEK = session.amount_total ? session.amount_total / 100 : 0;

  const billing = session.customer_details?.address;
  const billingAddress = billing
    ? [
        billing.line1,
        billing.line2,
        [billing.postal_code, billing.city].filter(Boolean).join(" "),
        billing.country,
      ]
        .filter(Boolean)
        .join("\n")
    : null;

  const stripeDashboardUrl = `https://dashboard.stripe.com/payments/${session.payment_intent}`;

  try {
    await sendOrderNotification({
      packageName,
      amountSEK,
      customerEmail: session.customer_details?.email ?? null,
      customerName: session.customer_details?.name ?? null,
      billingAddress,
      websiteUrl: session.metadata?.website_url ?? null,
      stripeSessionId: session.id,
      stripeDashboardUrl,
    });
  } catch (err) {
    console.error("Failed to send order notification email:", err);
    return NextResponse.json(
      { error: "Email notification failed", received: true },
      { status: 500 },
    );
  }

  return NextResponse.json({ received: true });
}
