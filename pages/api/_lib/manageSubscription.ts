import { stripe } from "@lib/stripe";
import { supabaseClient } from "@lib/supabase-client";
import {
  createSubscription,
  getSubscriptionByUserId,
  getUser,
  getUserByCustomerId,
} from "@lib/supabase-db";

export async function saveSubscription(
  subscriptionId: string,
  customerId: string,
  createAction = false
) {
  const userRef = await getUserByCustomerId(customerId.trim());

  const subscription = await stripe.subscriptions.retrieve(
    subscriptionId,
    {},
    {
      apiKey: process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY,
    }
  );

  const subscriptionData = {
    id: subscription.id,
    userId: userRef.user[0].id,
    status: subscription.status,
    price_id: subscription.items.data[0].price.id,
  };

  if (createAction) {
    const createdSubscription = await getSubscriptionByUserId(
      subscriptionData.userId
    );

    if (createdSubscription.sub.length == 0) {
      await createSubscription(subscriptionData);
    }
  } else {
    const response = await supabaseClient
      .from("subscriptions")
      .update(subscriptionData)
      .match({ id: subscription.id });
  }
}
