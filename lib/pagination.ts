export interface PaginationResult<T> {
  items: T[];
  total: number;
  totalPages: number;
  page: number;
}

/**
 * Paginate an array of items.
 *
 * BUG: This always returns the total count based on the full `items` array
 * passed in. If the caller passes `allItems` here but displays `filteredItems`,
 * the pagination total will be wrong after filtering.
 */
export function paginate<T>(
  items: T[],
  page: number,
  pageSize: number
): PaginationResult<T> {
  const start = (page - 1) * pageSize;
  return {
    items: items.slice(start, start + pageSize),
    total: items.length,
    totalPages: Math.ceil(items.length / pageSize),
    page,
  };
}
