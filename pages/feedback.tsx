import useSWR from "swr";

import { useAuth } from "@lib/auth";
import EmptyState from "@components/EmptyState";
import FeedbackTable from "@components/FeedbackTable";
import DashboardShell from "@components/DashboardShell";
import SiteTableSkeleton from "@components/SiteTableSkeleton";
import { FeedbackTableHeader } from "@components/FeedbackTableHeader";

const fetcher = (url: string, token: string) =>
  fetch(url, {
    method: "GET",
    headers: new Headers({ "Content-Type": "application/json", token }),
    credentials: "same-origin",
  }).then((res) => res.json());

export default function Feedback() {
  const { user, token } = useAuth();
  const { data } = useSWR(user ? ["/api/feedback", token] : null, fetcher);

  if (!data) {
    return (
      <DashboardShell>
        <FeedbackTableHeader />
        {/* <SiteTableSkeleton /> */}
        <FeedbackTable />
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      <FeedbackTableHeader />
      {/* {data.feedback?.length > 0 ? (
        // <FeedbackTable allFeedback={data.feedback} />
      ) : (
        <EmptyState />
      )} */}
    </DashboardShell>
  );
}
