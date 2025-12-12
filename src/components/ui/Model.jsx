/**
 * Model.jsx (Modal)
 * Reusable modal component with smooth animations, keyboard support, and backdrop closing.
 */

import React, { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Modal component with animated entrance/exit and multiple close options.
 * Supports keyboard (Escape) and backdrop click closing.
 * Prevents body scroll when modal is open.
 *
 * @param {Object} props - Component props
 * @param {boolean} props.isOpen - Controls modal open/closed state
 * @param {Function} props.onClose - Callback function when modal should close
 * @param {string} [props.title] - Modal header title (optional)
 * @param {React.ReactNode} props.children - Modal body content
 * @param {string} [props.size="md"] - Modal size ("sm", "md", "lg", "xl")
 * @param {boolean} [props.showCloseButton=true] - Show X button in header
 * @param {boolean} [props.closeOnBackdropClick=true] - Close when clicking backdrop
 * @param {string} [props.className=""] - Additional CSS classes for modal container
 * @returns {React.ReactElement} Modal component
 *
 * @example
 * const [isOpen, setIsOpen] = useState(false);
 *
 * <Modal
 *   isOpen={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   title="Confirm Action"
 *   size="md"
 * >
 *   <p>Are you sure you want to continue?</p>
 *   <button onClick={() => setIsOpen(false)}>Cancel</button>
 *   <button onClick={handleConfirm}>Confirm</button>
 * </Modal>
 *
 * @example
 * // Larger modal with custom styling
 * <Modal
 *   isOpen={showForm}
 *   onClose={() => setShowForm(false)}
 *   title="Edit User"
 *   size="lg"
 *   className="custom-modal"
 * >
 *   <UserForm onSubmit={handleSubmit} />
 * </Modal>
 */
const Model = ({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
  showCloseButton = true,
  closeOnBackdropClick = true,
  className = "",
}) => {
  // Reference to modal container for focus management
  const modalRef = useRef(null);

  /**
   * Handle keyboard and scroll management.
   * Listens for Escape key to close modal and prevents body scrolling.
   */
  useEffect(() => {
    /**
     * Close modal when Escape key is pressed.
     * @param {KeyboardEvent} event - Keyboard event
     */
    const handleEscape = (event) => {
      if (event.key === "Escape" && isOpen && onClose) {
        onClose();
      }
    };

    if (isOpen) {
      // Add Escape key listener
      document.addEventListener("keydown", handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    }

    // Cleanup: Remove listeners and restore scroll
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  /**
   * Handle backdrop click to close modal.
   * Only closes if click is directly on backdrop, not on modal content.
   * @param {React.MouseEvent} event - Click event
   */
  const handleBackdropClick = (event) => {
    if (
      closeOnBackdropClick &&
      event.target === event.currentTarget &&
      onClose
    ) {
      onClose();
    }
  };

  // Map size prop to CSS class names
  const sizeClasses = {
    sm: "modal-sm",
    md: "modal-md",
    lg: "modal-lg",
    xl: "modal-xl",
  };

  return (
    <AnimatePresence>
      {isOpen && (
        // Backdrop with fade animation
        <motion.div
          className="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleBackdropClick}
        >
          {/* Modal container with spring animation */}
          <motion.div
            ref={modalRef}
            className={`modal ${sizeClasses[size]} ${className}`}
            initial={{ scale: 0.9, opacity: 0, y: -50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: -50 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()} // Prevent backdrop click when clicking modal
          >
            {/* Modal header with title and close button */}
            {(title || showCloseButton) && (
              <div className="modal-header">
                {title && <h2 className="modal-title">{title}</h2>}
                {showCloseButton && onClose && (
                  <button
                    type="button"
                    className="modal-close"
                    onClick={onClose}
                    aria-label="Close modal"
                  >
                    <X size={20} />
                  </button>
                )}
              </div>
            )}

            {/* Modal body with children content */}
            <div className="modal-content">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Model;
