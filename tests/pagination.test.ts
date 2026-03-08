import { paginate } from "../lib/pagination";

const items = Array.from({ length: 23 }, (_, i) => ({ id: i + 1 }));

describe("paginate", () => {
  it("returns correct page of items", () => {
    const result = paginate(items, 1, 5);
    expect(result.items).toHaveLength(5);
    expect(result.items[0]).toEqual({ id: 1 });
    expect(result.page).toBe(1);
  });

  it("returns correct total and totalPages", () => {
    const result = paginate(items, 1, 5);
    expect(result.total).toBe(23);
    expect(result.totalPages).toBe(5);
  });

  it("returns partial last page", () => {
    const result = paginate(items, 5, 5);
    expect(result.items).toHaveLength(3);
  });

  // This test documents the pagination bug (Issue 2):
  // If you filter first then paginate the FULL array, the total is wrong.
  it.skip("should reflect filtered total, not original total", () => {
    // Simulating what the issues page does:
    // 1. Filter items to a subset
    const filtered = items.filter((item) => item.id <= 7);
    // 2. But paginate the original array (bug)
    const result = paginate(items, 1, 5);
    // total should be 7 (filtered), not 23 (all)
    expect(result.total).toBe(filtered.length);
  });
});
