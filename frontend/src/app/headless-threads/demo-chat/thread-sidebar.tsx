"use client"; // harness: not in the prose

import { useThreads } from "@copilotkit/react-core/v2"; // harness: the prose uses it without importing it

// ── doc: Headless Threads prose block "ThreadSidebar.tsx" (verbatim except the labelled id) ──

function ThreadSidebar() {
  const { 
    threads,
    isLoading,
    renameThread,
    archiveThread,
    deleteThread,
  } = useThreads({ agentId: "default" }); // harness: doc prints agentId: "my-agent"; the page's own server.ts registers the agent as "default"

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {threads.map((thread) => (
        <div key={thread.id}>
          <span>{thread.name ?? "New conversation"}</span>
          <button onClick={() => renameThread(thread.id, "Renamed")}>
            Rename
          </button>
          <button onClick={() => archiveThread(thread.id)}>
            Archive
          </button>
        </div>
      ))}
    </div>
  );
}
// ── end doc ──

/** Harness glue: hosts the pagination fragment ("In your JSX") in a component. */
function ThreadSidebarPagination() {
  // ── doc: Headless Threads prose block "ThreadSidebar.tsx" — pagination (verbatim except the labelled id) ──
const {
  threads,
  hasMoreThreads,
  isFetchingMoreThreads,
  fetchMoreThreads,
} = useThreads({
  agentId: "default", // harness: doc prints agentId: "my-agent"
  limit: 20, 
});
  // ── end doc ──

  return (
    <div>
      <p>{threads.length} loaded (page size 20)</p>
      {/* ── doc: (continued) "In your JSX" ── */}
{hasMoreThreads && (
  <button
    onClick={fetchMoreThreads}
    disabled={isFetchingMoreThreads}
  >
    {isFetchingMoreThreads ? "Loading..." : "Load more"}
  </button>
)}
      {/* ── end doc ── */}
    </div>
  );
}

export { ThreadSidebar, ThreadSidebarPagination };
