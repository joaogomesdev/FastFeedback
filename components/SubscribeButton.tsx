import { Button } from "@chakra-ui/react";
import { useAuth } from "@lib/auth";
import { stripe } from "@lib/stripe";
import { getStripeJs } from "@lib/stripe-js";
import { GetStaticProps } from "next";
import Router from "next/router";
import { api } from "services/api";

export function SubscribeButton(props) {
  const { session, token } = useAuth();

  async function handleSubscription() {
    if (!session) {
      Router.push("/");
      return;
    }

    try {
      const response = await api.post(
        "/subscribe",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { sessionId } = response.data;

      const stripe = await getStripeJs();

      await stripe.redirectToCheckout({ sessionId });
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <>
      <pre></pre>

      <Button
        onClick={handleSubscription}
        backgroundColor="gray.900"
        color="white"
        fontWeight="medium"
        mt={4}
        maxW="200px"
        _hover={{ bg: "gray.700" }}
        _active={{
          bg: "gray.800",
          transform: "scale(0.95)",
        }}
      >
        Update to starter
      </Button>
    </>
  );
}
