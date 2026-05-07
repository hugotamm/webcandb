import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { PACKAGES, isValidPackage } from "@/lib/stripe-products";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-04-22.dahlia",
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const packageId = body.package as string | undefined;
    const websiteUrl = body.url as string | undefined; // optional, for demo

    if (!packageId || !isValidPackage(packageId)) {
      return NextResponse.json(
        { error: "Ogiltigt paket. Måste vara: demo, start, klassisk eller premium." },
        { status: 400 },
      );
    }

    const pkg = PACKAGES[packageId];
    const origin = req.headers.get("origin") || "https://webcandb.com";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "sek",
            product_data: {
              name: `Web C&B — ${pkg.name}`,
              description: pkg.description,
            },
            unit_amount: pkg.priceOre,
          },
          quantity: 1,
        },
      ],
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}&package=${pkg.id}`,
      cancel_url: `${origin}/avbruten?package=${pkg.id}`,
      locale: "sv",
      // Lägg URL:n i metadata om det är en demo-beställning
      metadata: {
        package: pkg.id,
        ...(websiteUrl ? { website_url: websiteUrl } : {}),
      },
      // För svenska företag — be om billing address för fakturering
      billing_address_collection: "required",
      // Tillåt promo-koder (för återkundsrabatten)
      allow_promotion_codes: true,
      // VAT/momsuppgifter
      tax_id_collection: { enabled: true },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout error:", err);
    const message =
      err instanceof Error ? err.message : "Något gick fel — försök igen.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
