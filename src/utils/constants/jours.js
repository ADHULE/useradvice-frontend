/**
 * jours.js
 * Day of month options (1-31) for date pickers and form selects.
 */

/**
 * Array of day options for select dropdowns.
 * Generates days 1-31 with zero-padded string values for consistent formatting.
 *
 * @type {Array<{value: string, label: number}>}
 *
 * @example
 * // Output example:
 * [
 *   { value: "01", label: 1 },
 *   { value: "02", label: 2 },
 *   // ...
 *   { value: "31", label: 31 },
 * ]
 */
export const JOURS = Array.from({ length: 31 }, (_, i) => ({
  value: String(i + 1).padStart(2, "0"), // Zero-padded: "01", "02", etc.
  label: i + 1,
}));
