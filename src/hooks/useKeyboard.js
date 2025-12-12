/**
 * useKeyboard.js
 * Custom hook for listening to specific keyboard key presses.
 * Automatically handles cleanup to prevent memory leaks.
 */

import { useEffect } from "react";

/**
 * Custom hook that listens for a specific keyboard key press and triggers a callback.
 * Automatically handles event listener cleanup on component unmount or dependency changes.
 *
 * @param {string} key - The key to listen for (e.g., "Enter", "Escape")
 * @param {Function} callback - Function to call when key is pressed
 *
 * @example
 * // Close modal when Escape key is pressed
 * useKeyboard("Escape", () => setIsOpen(false));
 *
 * @example
 * // Submit form when Enter key is pressed
 * useKeyboard("Enter", handleSubmit);
 */
const useKeyboard = (key, callback) => {
  useEffect(() => {
    /**
     * Handle keyboard keydown event.
     * Checks if pressed key matches target key before calling callback.
     * @param {KeyboardEvent} e - The keyboard event
     */
    const handler = (e) => {
      if (e.key === key) callback(e);
    };

    // Add event listener for keyboard events using cross-environment API
    globalThis.addEventListener("keydown", handler);

    // Cleanup: Remove event listener when component unmounts or dependencies change
    return () => globalThis.removeEventListener("keydown", handler);
  }, [key, callback]);
};

export default useKeyboard;
