import Head from "next/head";
import useSWR from "swr";
import { useAuth } from "@lib/auth";
import EmptyState from "@components/EmptyState";
import SiteTableSkeleton from "@components/SiteTableSkeleton";
import DashboardShell from "@components/DashboardShell";
import { isGeneratorObject } from "util/types";
import SiteTable from "@components/SiteTable";
const fetcher = (apiURL: string) => fetch(apiURL).then((res) => res.json());

export default function Dashboard() {
  const { data } = useSWR("/api/sites", fetcher);

  if (!data) {
    return (
      <DashboardShell>
        <SiteTableSkeleton />
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      {data.sites?.length > 0 ? (
        <SiteTable sites={data.sites} />
      ) : (
        <EmptyState />
      )}
    </DashboardShell>
  );
}
