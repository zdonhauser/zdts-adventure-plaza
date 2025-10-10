"use client";

import { useContactForm } from "@/context/ContactFormContext";
import { trackEvent } from "@/components/analytics/GoogleAnalytics";

export default function ContactSection() {
  const { openForm } = useContactForm();

  const handleContactUs = () => {
    trackEvent("contact_form_open", {
      source: "contact_section",
      type: "general",
    });
    openForm("general");
  };

  return (
    <section className="py-32 bg-black text-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h3 className="text-5xl md:text-6xl font-bold mb-8 tracking-tight">Start Your Journey</h3>
        <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
          Ready to join our community of local entertainment businesses? Let's make it happen together.
        </p>
        <button
          onClick={handleContactUs}
          className="px-8 py-4 text-lg font-medium transition-colors bg-white text-black hover:bg-gray-100"
        >
          Contact Us
        </button>
      </div>
    </section>
  );
}
