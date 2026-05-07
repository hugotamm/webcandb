import type { PackageId } from "./stripe-products";

/**
 * Skicka användaren till Stripe Checkout.
 * Anropas från client components (Pricing-knappar, Hero-form, Calculator-CTA).
 */
export async function startCheckout(packageId: PackageId, websiteUrl?: string) {
  try {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ package: packageId, url: websiteUrl }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error || "Något gick fel. Försök igen eller mejla web.candb@gmail.com");
      return;
    }

    if (data.url) {
      window.location.href = data.url;
    }
  } catch (err) {
    console.error("Checkout error:", err);
    alert("Kunde inte starta checkout. Försök igen eller mejla web.candb@gmail.com");
  }
}
