/**
 * userFetch.js
 * Custom hook for fetching data from API endpoints.
 * Manages loading, error, and data states automatically with cleanup.
 */

import { useState, useEffect } from "react";
import useAxios from "../api/useAxios";

/**
 * Custom hook for fetching data from an API endpoint.
 * Handles loading, error, and success states automatically.
 * Includes cleanup to prevent state updates on unmounted components.
 *
 * @param {string} url - API endpoint URL to fetch from
 * @param {Array} [deps=[]] - Dependencies array to trigger refetch (similar to useEffect)
 * @returns {Object} Fetch state and data
 * @returns {*} returns.data - Fetched data or null
 * @returns {boolean} returns.loading - Whether data is currently loading
 * @returns {Error|null} returns.error - Error object if fetch failed, null otherwise
 *
 * @example
 * const { data: users, loading, error } = useFetch('/users', []);
 *
 * if (loading) return <Loader />;
 * if (error) return <Error message={error.message} />;
 * return <UserList users={data} />;
 */
const useFetch = (url, deps = []) => {
  // Initialize axios instance with interceptors and token handling
  const api = useAxios();

  // State management for fetch data, loading indicator, and errors
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Flag to check if component is still mounted (prevents memory leaks)
    let isMounted = true;
    setLoading(true);

    // Fetch data from API
    api
      .get(url)
      // Only update state if component is still mounted
      .then((res) => isMounted && setData(res.data))
      .catch((err) => isMounted && setError(err))
      .finally(() => isMounted && setLoading(false));

    // Cleanup: Set isMounted to false when component unmounts or dependencies change
    return () => (isMounted = false);
  }, deps);

  return { data, loading, error };
};

export default useFetch;
