import React from "react";
import { formatDate, capitalize } from "../lib/format";

interface Issue {
  id: number;
  title: string;
  status: string;
  label: string;
  priority: string;
  createdAt: string;
}

interface IssueTableProps {
  issues: Issue[];
}

export default function IssueTable({ issues }: IssueTableProps) {
  if (issues.length === 0) {
    return <p className="empty-state">No issues found.</p>;
  }

  return (
    <table className="issue-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Status</th>
          <th>Label</th>
          <th>Priority</th>
          <th>Created</th>
        </tr>
      </thead>
      <tbody>
        {issues.map((issue) => (
          <tr key={issue.id}>
            <td>{issue.id}</td>
            <td>{issue.title}</td>
            <td>
              <span className={`status-badge status-${issue.status}`}>
                {capitalize(issue.status)}
              </span>
            </td>
            <td>
              <span className="label-badge">{issue.label}</span>
            </td>
            <td>{capitalize(issue.priority)}</td>
            <td>{formatDate(issue.createdAt)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
