"use client";

import { ReactNode } from "react";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { ContactFormProvider } from "@/context/ContactFormContext";
import ContactFormModal from "@/components/contact/ContactFormModal";

export default function Providers({ children }: { children: ReactNode }) {
  const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "";

  return (
    <GoogleReCaptchaProvider reCaptchaKey={recaptchaSiteKey}>
      <ContactFormProvider>
        {children}
        <ContactFormModal />
      </ContactFormProvider>
    </GoogleReCaptchaProvider>
  );
}
