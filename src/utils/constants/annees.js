/**
 * annees.js
 * Generates list of years for form select dropdowns.
 * Provides last 100 years from current year in descending order.
 */

/**
 * Array of year objects for form select options.
 * Generates 100 years starting from current year going backwards.
 * Each year has 'value' (as string) and 'label' (for display).
 *
 * @type {Array<{value: string, label: number}>}
 *
 * @example
 * // Output example (for 2024):
 * [
 *   { value: "2024", label: 2024 },
 *   { value: "2023", label: 2023 },
 *   { value: "2022", label: 2022 },
 *   // ... 96 more years
 *   { value: "1925", label: 1925 },
 * ]
 */
export const ANNEES = Array.from({ length: 100 }, (_, i) => {
  const year = new Date().getFullYear() - i;
  return { value: String(year), label: year };
});
