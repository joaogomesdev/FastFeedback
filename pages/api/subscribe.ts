import { NextApiRequest, NextApiResponse } from "next";
import { getUserByEmail } from "@lib/supabase-db";
import { supabaseClient } from "@lib/supabase-client";
import { stripe } from "@lib/stripe";

type User = {
  ref: {
    id: string;
  };
  data: {
    stripe_customer_id: string;
  };
};

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "POST") {
    try {
      const token = req.headers.authorization.split("Bearer")[1].trim();

      const { data } = await supabaseClient.auth.api.getUser(String(token));

      const { user } = await getUserByEmail(data.email);

      let customerId = user[0].stripe_customer_id;

      if (!customerId) {
        const stripeCustomer = await stripe.customers.create(
          {
            name: user[0].name,
            email: user[0].email,
          },
          {
            apiKey: process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY,
          }
        );

        await supabaseClient
          .from("users")
          .update({ stripe_customer_id: stripeCustomer.id })
          .match({ email: user[0].email });
        customerId = stripeCustomer.id;
      }
      const stripeCheckoutSession = await stripe.checkout.sessions.create(
        {
          customer: customerId,
          payment_method_types: ["card"],
          billing_address_collection: "required",
          line_items: [
            { price: "price_1L3045AzPT6IHsqUYpQfnZT7", quantity: 1 },
          ],
          mode: "subscription",
          allow_promotion_codes: true,
          success_url: process.env.STRIPE_SUCCESS_URL,
          cancel_url: process.env.STRIPE_CANCEL_URL,
        },
        {
          apiKey: `${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`,
        }
      );

      return res.status(200).json({ sessionId: stripeCheckoutSession.id });
    } catch (error) {
      console.log(error);

      return res.status(500).json({ error: error });
    }
  } else {
    res.setHeader("Aloow", "POST");
    res.status(405).end("Method not allowed");
  }
}
