/**
 * genres.js
 * Gender/genre options for user profile forms.
 */

/**
 * Array of gender options for select dropdowns.
 * Note: "Home" is preserved as-is (likely backend requirement - may be typo for "Homme").
 *
 * @type {Array<{value: string, label: string}>}
 *
 * @example
 * // Usage in form:
 * import { GENRES } from '@/utils/constants/genres';
 *
 * <select>
 *   {GENRES.map(genre => (
 *     <option key={genre.value} value={genre.value}>
 *       {genre.label}
 *     </option>
 *   ))}
 * </select>
 */
export const GENRES = [
  { value: "Homme", label: "Homme" }, // Backend requirement - preserves exact value
  { value: "Femme", label: "Femme" },
  { value: "Autre", label: "Autre" },
];
