/**
 * mois.js
 * Month options in French for date pickers and form selects.
 */

/**
 * French month names array.
 * @type {string[]}
 * @private
 */
const monthNames = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre",
];

/**
 * Array of month options for select dropdowns.
 * Provides French month names with zero-padded numeric values (01-12).
 *
 * @type {Array<{value: string, label: string}>}
 *
 * @example
 * // Output example:
 * [
 *   { value: "01", label: "Janvier" },
 *   { value: "02", label: "Février" },
 *   // ...
 *   { value: "12", label: "Décembre" },
 * ]
 */
export const MOIS = monthNames.map((name, index) => ({
  value: String(index + 1).padStart(2, "0"), // Zero-padded: "01", "02", etc.
  label: name,
}));
