import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import SearchBox from "../components/SearchBox";
import IssueTable from "../components/IssueTable";
import Pagination from "../components/Pagination";

interface Issue {
  id: number;
  title: string;
  status: string;
  label: string;
  priority: string;
  createdAt: string;
}

interface IssuesResponse {
  items: Issue[];
  total: number;
  totalPages: number;
  page: number;
}

export default function IssuesPage() {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [syncing, setSyncing] = useState(false);

  useEffect(() => {
    fetchIssues();
  }, [search, page]);

  async function fetchIssues() {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    params.set("page", String(page));

    const res = await fetch(`/api/issues?${params.toString()}`);
    const data: IssuesResponse = await res.json();

    setIssues(data.items);
    setTotalPages(data.totalPages);
  }

  async function handleSync() {
    // BUG (Issue 4): No loading state — button is not disabled during sync,
    // no spinner is shown, and users can click repeatedly.
    setSyncing(true);
    // Simulate a sync operation
    await new Promise((resolve) => setTimeout(resolve, 2000));
    await fetchIssues();
    setSyncing(false);
  }

  function handleSearchChange(value: string) {
    setSearch(value);
    setPage(1);
  }

  return (
    <Layout>
      <div className="issues-page">
        <div className="page-header">
          <h1>Issues Inbox</h1>
          <button onClick={handleSync} className="btn btn-primary">
            Sync Issues
          </button>
        </div>

        <SearchBox
          value={search}
          onChange={handleSearchChange}
          placeholder="Search issues..."
        />

        <IssueTable issues={issues} />

        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </Layout>
  );
}
