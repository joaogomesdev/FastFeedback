import useSWR from "swr";
import React from "react";

import { useAuth } from "@lib/auth";
import SiteTable from "@components/SiteTable";
import EmptyState from "@components/EmptyState";
import DashboardShell from "@components/DashboardShell";
import SiteTableSkeleton from "@components/SiteTableSkeleton";
import { SiteTableHeader } from "@components/SiteTableHeader";
import { Button } from "@chakra-ui/react";
import { GetStaticProps } from "next";
import { stripe } from "@lib/stripe";
import { SubscribeButton } from "@components/SubscribeButton";
import { getSubscriptionByUserId, getUserByEmail } from "@lib/supabase-db";
import { supabaseClient } from "@lib/supabase-client";

// const fetcher = (url: string, token: string) =>
//   fetch(url, {
//     method: "GET",
//     headers: new Headers({ "Content-Type": "application/json", token }),
//     credentials: "same-origin",
//   }).then((res) => res.json());

const productsPricesId = {
  starter: "price_1L3045AzPT6IHsqUYpQfnZT7",
  premium: "price_1L304TAzPT6IHsqUEmUXLMif",
};

export const getStaticProps: GetStaticProps = async () => {
  const plans = await stripe.products.list({
    apiKey: process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY,
  });

  return {
    props: {
      plans: plans.data,
    },
  };
};

export default function Account({ plans }) {
  const { user, token, signOut } = useAuth();
  const [userActiveSubscription, setUserActiveSubscription] = React.useState(
    {}
  );

  const handleUserActiveSubscription = async () => {
    const response = await getUserByEmail(user?.email);
    console.log(response);

    // setUserActiveSubscription(response);
  };

  React.useEffect(() => {
    // handleUserActiveSubscription();
  }, []);

  // const { data } = useSWR(user ? ["/api/sites", token] : null, fetcher);
  // if (!data) {
  //   return (
  //     <DashboardShell>
  //       <SiteTableHeader />

  //       <SiteTableSkeleton />
  //     </DashboardShell>
  //   );
  // }

  return (
    <DashboardShell>
      <SubscribeButton />

      {user && (
        <Button variant="ghost" mr={2} onClick={signOut}>
          Log Out
        </Button>
      )}
    </DashboardShell>
  );
}
