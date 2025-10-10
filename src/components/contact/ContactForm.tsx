"use client";

import { useState, FormEvent } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useContactForm } from "@/context/ContactFormContext";
import { ContactFormData } from "@/data/types";

export default function ContactForm() {
  const { inquiryType, spaceInterest, closeForm } = useContactForm();
  const { executeRecaptcha } = useGoogleReCaptcha();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    parkName: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // Get dynamic form title based on inquiry type
  const getFormTitle = () => {
    switch (inquiryType) {
      case "space":
        return "Request Space Information";
      case "tour":
        return "Schedule a Tour";
      case "ride":
        return "Ride Purchase Inquiry";
      case "general":
      default:
        return "Get In Touch";
    }
  };

  // Get dynamic placeholder for message field
  const getMessagePlaceholder = () => {
    switch (inquiryType) {
      case "space":
        return "Tell us about your business concept and space requirements...";
      case "tour":
        return "What dates work best for your tour?";
      case "ride":
        return "Tell us about your amusement park and why this ride would be a good fit...";
      case "general":
      default:
        return "How can we help you?";
    }
  };

  // Validation functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    if (!phone) return true; // Phone is optional
    const phoneRegex = /^[\d\s\-\(\)\.+]+$/;
    return phoneRegex.test(phone) && phone.replace(/\D/g, "").length >= 10;
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim() || formData.name.length < 2) {
      newErrors.name = "Please enter your full name (at least 2 characters)";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (formData.phone && !validatePhone(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    // Require park name for ride inquiries
    if (inquiryType === "ride" && (!formData.parkName.trim() || formData.parkName.length < 3)) {
      newErrors.parkName = "Please enter your amusement park name (at least 3 characters)";
    }

    if (!formData.message.trim() || formData.message.length < 10) {
      newErrors.message = "Please enter a message (at least 10 characters)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitStatus("idle");
    setErrorMessage("");

    // Validate form
    if (!validateForm()) {
      return;
    }

    // Check if reCAPTCHA is ready
    if (!executeRecaptcha) {
      setSubmitStatus("error");
      setErrorMessage("reCAPTCHA not loaded. Please refresh and try again.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Execute reCAPTCHA
      const recaptchaToken = await executeRecaptcha("submit_contact_form");

      // Prepare submission data
      const submissionData: ContactFormData = {
        ...formData,
        inquiryType,
        spaceInterest,
        recaptchaToken,
      };

      // Submit to API
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus("success");
        // Reset form
        setFormData({ name: "", email: "", phone: "", message: "", parkName: "" });
        // Close form after 2 seconds
        setTimeout(() => {
          closeForm();
          setSubmitStatus("idle");
        }, 2000);
      } else {
        setSubmitStatus("error");
        setErrorMessage(result.error || "Failed to send message. Please try again.");
      }
    } catch (error) {
      setSubmitStatus("error");
      setErrorMessage("Network error. Please check your connection and try again.");
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (
    field: keyof typeof formData,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  return (
    <div className="w-full max-w-2xl">
      {/* Form Header */}
      <div className="mb-8">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
          {getFormTitle()}
        </h2>
        {spaceInterest && (
          <div className="bg-gray-100 border-l-4 border-black px-4 py-3">
            <p className="text-sm uppercase tracking-wider text-gray-600 mb-1">
              Space of Interest
            </p>
            <p className="font-semibold text-lg">{spaceInterest}</p>
          </div>
        )}
      </div>

      {/* Success Message */}
      {submitStatus === "success" && (
        <div className="mb-6 bg-green-50 border-l-4 border-green-500 px-6 py-4">
          <p className="font-semibold text-green-900">Thank you!</p>
          <p className="text-green-800">
            Your message has been sent. We'll get back to you shortly.
          </p>
        </div>
      )}

      {/* Error Message */}
      {submitStatus === "error" && (
        <div className="mb-6 bg-red-50 border-l-4 border-red-500 px-6 py-4">
          <p className="font-semibold text-red-900">Error</p>
          <p className="text-red-800">{errorMessage}</p>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Park Name Field (only for ride inquiries) */}
        {inquiryType === "ride" && (
          <div>
            <label
              htmlFor="parkName"
              className="block text-sm font-semibold uppercase tracking-wider mb-2"
            >
              Amusement Park Name *
            </label>
            <input
              type="text"
              id="parkName"
              value={formData.parkName}
              onChange={(e) => handleInputChange("parkName", e.target.value)}
              className={`w-full px-4 py-3 border-2 ${
                errors.parkName ? "border-red-500" : "border-gray-300"
              } focus:border-black focus:outline-none transition-colors`}
              placeholder="Adventure Plaza Amusement Park"
              disabled={isSubmitting}
            />
            {errors.parkName && (
              <p className="mt-2 text-sm text-red-600">{errors.parkName}</p>
            )}
            <p className="mt-2 text-xs text-gray-500">
              Required to verify serious business inquiries
            </p>
          </div>
        )}

        {/* Name Field */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-semibold uppercase tracking-wider mb-2"
          >
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            className={`w-full px-4 py-3 border-2 ${
              errors.name ? "border-red-500" : "border-gray-300"
            } focus:border-black focus:outline-none transition-colors`}
            placeholder="John Doe"
            disabled={isSubmitting}
          />
          {errors.name && (
            <p className="mt-2 text-sm text-red-600">{errors.name}</p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-semibold uppercase tracking-wider mb-2"
          >
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            className={`w-full px-4 py-3 border-2 ${
              errors.email ? "border-red-500" : "border-gray-300"
            } focus:border-black focus:outline-none transition-colors`}
            placeholder="john@example.com"
            disabled={isSubmitting}
          />
          {errors.email && (
            <p className="mt-2 text-sm text-red-600">{errors.email}</p>
          )}
        </div>

        {/* Phone Field */}
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-semibold uppercase tracking-wider mb-2"
          >
            Phone Number <span className="text-gray-500">(Optional)</span>
          </label>
          <input
            type="tel"
            id="phone"
            value={formData.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            className={`w-full px-4 py-3 border-2 ${
              errors.phone ? "border-red-500" : "border-gray-300"
            } focus:border-black focus:outline-none transition-colors`}
            placeholder="(555) 123-4567"
            disabled={isSubmitting}
          />
          {errors.phone && (
            <p className="mt-2 text-sm text-red-600">{errors.phone}</p>
          )}
        </div>

        {/* Message Field */}
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-semibold uppercase tracking-wider mb-2"
          >
            Message *
          </label>
          <textarea
            id="message"
            value={formData.message}
            onChange={(e) => handleInputChange("message", e.target.value)}
            rows={6}
            className={`w-full px-4 py-3 border-2 ${
              errors.message ? "border-red-500" : "border-gray-300"
            } focus:border-black focus:outline-none transition-colors resize-none`}
            placeholder={getMessagePlaceholder()}
            disabled={isSubmitting}
          />
          {errors.message && (
            <p className="mt-2 text-sm text-red-600">{errors.message}</p>
          )}
        </div>

        {/* reCAPTCHA Notice */}
        <p className="text-xs text-gray-500">
          This site is protected by reCAPTCHA and the Google{" "}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-black"
          >
            Privacy Policy
          </a>{" "}
          and{" "}
          <a
            href="https://policies.google.com/terms"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-black"
          >
            Terms of Service
          </a>{" "}
          apply.
        </p>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting || submitStatus === "success"}
          className="w-full bg-black text-white px-8 py-4 text-sm uppercase tracking-wider font-medium hover:bg-gray-900 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Sending..." : submitStatus === "success" ? "Sent!" : "Send Message"}
        </button>
      </form>
    </div>
  );
}
