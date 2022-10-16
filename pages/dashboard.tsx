import useSWR from "swr";
import React from "react";

import { useAuth } from "@lib/auth";
import SiteTable from "@components/SiteTable";
import EmptyState from "@components/EmptyState";
import DashboardShell from "@components/DashboardShell";
import SiteTableSkeleton from "@components/SiteTableSkeleton";
import { SiteTableHeader } from "@components/SiteTableHeader";

const fetcher = (url: string, token: string) =>
  fetch(url, {
    method: "GET",
    headers: new Headers({ "Content-Type": "application/json", token }),
    credentials: "same-origin",
  }).then((res) => res.json());

export default function Dashboard() {
  const { user, token } = useAuth();
  const { data } = useSWR(user ? ["/api/sites", token] : null, fetcher);
  if (!data) {
    return (
      <DashboardShell>
        <SiteTableHeader />

        <SiteTableSkeleton />
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      <SiteTableHeader />
      {data.sites?.length > 0 ? (
        <SiteTable sites={data.sites} />
      ) : (
        <EmptyState />
      )}
    </DashboardShell>
  );
}
