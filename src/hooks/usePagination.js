/**
 * usePagination.js
 * Custom hook for managing pagination of arrays.
 * Handles page navigation and slicing data into pages.
 */

import { useState } from "react";

/**
 * Custom hook for paginating arrays of items.
 * Provides functions to navigate between pages and get current page data.
 *
 * @param {Array} [items=[]] - Array of items to paginate
 * @param {number} [itemsPerPage=10] - Number of items to show per page
 * @returns {Object} Pagination state and control functions
 * @returns {number} returns.page - Current page number (1-indexed)
 * @returns {number} returns.maxPage - Total number of pages
 * @returns {Function} returns.currentData - Function that returns items for current page
 * @returns {Function} returns.next - Move to next page (if available)
 * @returns {Function} returns.prev - Move to previous page (if available)
 * @returns {Function} returns.jump - Jump to specific page number
 *
 * @example
 * const { page, maxPage, currentData, next, prev } = usePagination(users, 10);
 *
 * return (
 *   <>
 *     {currentData().map(user => <UserItem key={user.id} user={user} />)}
 *     <button onClick={prev} disabled={page === 1}>Previous</button>
 *     <span>Page {page} of {maxPage}</span>
 *     <button onClick={next} disabled={page === maxPage}>Next</button>
 *   </>
 * );
 */
const usePagination = (items = [], itemsPerPage = 10) => {
  // Track current page number
  const [page, setPage] = useState(1);

  // Calculate total number of pages
  const maxPage = Math.ceil(items.length / itemsPerPage);

  /**
   * Get items for the current page.
   * Calculates start and end indices based on page number and items per page.
   * @returns {Array} Items for current page
   */
  const currentData = () => {
    const start = (page - 1) * itemsPerPage;
    return items.slice(start, start + itemsPerPage);
  };

  /**
   * Move to next page (if not on last page).
   */
  const next = () => setPage((p) => Math.min(p + 1, maxPage));

  /**
   * Move to previous page (if not on first page).
   */
  const prev = () => setPage((p) => Math.max(p - 1, 1));

  /**
   * Jump to a specific page number.
   * Clamps page number between 1 and maxPage.
   * @param {number} pageNumber - Page number to jump to
   */
  const jump = (pageNumber) =>
    setPage(Math.min(Math.max(1, pageNumber), maxPage));

  return { page, maxPage, currentData, next, prev, jump };
};

export default usePagination;
