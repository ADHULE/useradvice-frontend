/**
 * useForm.js
 * Custom hook for managing form state with automatic change handlers and reset functionality.
 * Simplifies form state management and change event handling.
 */

import { useState } from "react";

/**
 * Custom hook for managing form input state.
 * Automatically binds form input change events and provides reset functionality.
 *
 * @param {Object} [initialValues={}] - Initial form values object with field names as keys
 * @returns {Object} Form state and handlers
 * @returns {Object} returns.values - Current form field values
 * @returns {Function} returns.handleChange - Change handler for form inputs (pass to onChange)
 * @returns {Function} returns.reset - Function to reset form to initial values
 *
 * @example
 * const { values, handleChange, reset } = useForm({
 *   email: '',
 *   password: ''
 * });
 *
 * return (
 *   <>
 *     <input name="email" value={values.email} onChange={handleChange} />
 *     <input name="password" value={values.password} onChange={handleChange} />
 *     <button onClick={reset}>Reset</button>
 *   </>
 * );
 */
const useForm = (initialValues = {}) => {
  // Store current form values in state
  const [values, setValues] = useState(initialValues);

  /**
   * Handle input change events.
   * Automatically extracts name and value from event target.
   * @param {Event} e - Change event from form input
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Update only the changed field while preserving other fields
    setValues({ ...values, [name]: value });
  };

  /**
   * Reset form to initial values.
   */
  const reset = () => setValues(initialValues);

  return { values, handleChange, reset };
};

export default useForm;
