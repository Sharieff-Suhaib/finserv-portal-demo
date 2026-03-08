/**
 * Format a number as USD currency.
 * BUG (Issue 7): There is a duplicate helper below with slightly different behavior.
 */
export function formatCurrency(amount: number): string {
  return "$" + amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/**
 * Another currency formatter — slightly different implementation.
 * This one uses toLocaleString but doesn't handle edge cases the same way.
 * Having two formatters is a refactoring smell (Issue 7).
 */
export function formatUSD(amount: number): string {
  return amount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}

/**
 * Format an ISO date string into a readable date.
 */
export function formatDate(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/**
 * Capitalize the first letter of a string.
 */
export function capitalize(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}
