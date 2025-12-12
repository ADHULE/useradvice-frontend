/**
 * goToPath.js
 * Global navigation utility that allows navigation outside React component context.
 * Useful for programmatic navigation in event handlers, API responses, or utility functions.
 */

/**
 * Global navigate function reference.
 * Initialized by NavigatorInitializer component.
 * @type {Function|null}
 */
let globalNavigate = null;

/**
 * Initialize the global navigation function.
 * Must be called by NavigatorInitializer component on app startup.
 *
 * @param {Function} navigate - React Router navigate function
 *
 * @example
 * // Called automatically by NavigatorInitializer
 * initializeNavigator(useNavigate());
 */
export const initializeNavigator = (navigate) => {
  globalNavigate = navigate;
};

/**
 * Navigate to a specified path from anywhere in the app.
 * Does not require component context or hooks.
 *
 * @param {string} path - Route path to navigate to
 *
 * @throws {Error} Logs error if Navigator has not been initialized
 *
 * @example
 * // Navigate from API response handler
 * api.get('/user').then(() => {
 *   goToPath('/dashboard');
 * });
 *
 * @example
 * // Navigate from event handler
 * document.addEventListener('custom-event', () => {
 *   goToPath('/home');
 * });
 */
export const goToPath = (path) => {
  if (!globalNavigate) {
    console.error("Navigator not initialized!");
    return;
  }
  globalNavigate(path);
};
