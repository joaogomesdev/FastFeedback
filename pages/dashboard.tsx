import useSWR from "swr";

import SiteTable from "@components/SiteTable";
import EmptyState from "@components/EmptyState";
import DashboardShell from "@components/DashboardShell";
import SiteTableSkeleton from "@components/SiteTableSkeleton";

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
