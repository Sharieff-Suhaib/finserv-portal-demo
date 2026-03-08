/**
 * Filter issues by a search query.
 * Matches against the issue title.
 */
export function filterIssues(
  items: Array<{ title: string; status: string }>,
  query: string
) {
  if (!query.trim()) return items;
  // BUG: case-sensitive comparison — searching "payment" won't match "Payment"
  return items.filter((item) => item.title.includes(query));
}

/**
 * Filter issues by label.
 */
export function filterByLabel(
  items: Array<{ label: string }>,
  label: string
) {
  if (!label) return items;
  return items.filter((item) => item.label === label);
}
