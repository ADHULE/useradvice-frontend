/**
 * useDebounce.js
 * Custom hook for debouncing values with configurable delay.
 * Useful for delaying updates on frequently changing values (e.g., search input).
 */

import { useEffect, useState } from "react";

/**
 * Custom hook that delays updating a value until after a specified delay has passed
 * without the value changing. Commonly used for search inputs or API calls.
 *
 * @param {*} value - The value to debounce
 * @param {number} [delay=500] - Debounce delay in milliseconds
 * @returns {*} The debounced value (updates after delay)
 *
 * @example
 * // Debounce search input with 300ms delay
 * const [searchInput, setSearchInput] = useState("");
 * const debouncedSearch = useDebounce(searchInput, 300);
 *
 * useEffect(() => {
 *   // Only call API when debounced value changes
 *   if (debouncedSearch) {
 *     searchUsers(debouncedSearch);
 *   }
 * }, [debouncedSearch]);
 *
 * return <input value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />;
 */
const useDebounce = (value, delay = 500) => {
  // State for debounced value - initially set to input value
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set timeout to update debounced value after delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Clear timeout if value changes before delay completes
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
