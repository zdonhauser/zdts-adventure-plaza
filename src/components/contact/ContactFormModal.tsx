"use client";

import { useEffect } from "react";
import { useContactForm } from "@/context/ContactFormContext";
import ContactForm from "./ContactForm";

export default function ContactFormModal() {
  const { isOpen, closeForm } = useContactForm();

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeForm();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, closeForm]);

  // Don't render if not open
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity duration-300"
        onClick={closeForm}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div
          className="relative w-full max-w-3xl max-h-[90vh] bg-white shadow-2xl pointer-events-auto overflow-hidden animate-slideUp"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={closeForm}
            className="absolute top-6 right-6 z-10 w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-colors group"
            aria-label="Close form"
          >
            <svg
              className="w-6 h-6 text-gray-600 group-hover:text-black transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Scrollable Content */}
          <div className="overflow-y-auto max-h-[90vh] p-8 md:p-12">
            <ContactForm />
          </div>
        </div>
      </div>
    </>
  );
}
