import { loadStripe } from "@stripe/stripe-js";

export async function getStripeJs() {
  try {
    const stripeJs = await loadStripe(
      `${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}`
    );

    return stripeJs;
  } catch (error) {
    throw new Error(error);
  }
}
