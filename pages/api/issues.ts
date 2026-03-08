import type { NextApiRequest, NextApiResponse } from "next";
import allIssues from "../../data/issues.json";
import { filterIssues } from "../../lib/filters";
import { paginate } from "../../lib/pagination";

const PAGE_SIZE = 5;

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { search, page } = req.query;

  const searchQuery = typeof search === "string" ? search : "";
  const pageNum = typeof page === "string" ? parseInt(page, 10) : 1;

  // Filter issues by search query
  const filtered = filterIssues(allIssues, searchQuery);

  // BUG (Issue 2): We paginate using `allIssues` instead of `filtered`,
  // so the total count is wrong after filtering.
  // The displayed rows come from `filtered` but pagination metadata uses `allIssues`.
  const paginatedAll = paginate(allIssues, pageNum, PAGE_SIZE);
  const paginatedDisplay = filtered.slice(
    (pageNum - 1) * PAGE_SIZE,
    pageNum * PAGE_SIZE
  );

  res.status(200).json({
    items: paginatedDisplay,
    total: paginatedAll.total,
    totalPages: paginatedAll.totalPages,
    page: pageNum,
  });
}
