"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { InquiryType } from "@/data/types";

interface ContactFormContextType {
  isOpen: boolean;
  inquiryType: InquiryType;
  spaceInterest: string | undefined;
  openForm: (type: InquiryType, spaceInfo?: string) => void;
  closeForm: () => void;
}

const ContactFormContext = createContext<ContactFormContextType | undefined>(
  undefined
);

export function ContactFormProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [inquiryType, setInquiryType] = useState<InquiryType>("general");
  const [spaceInterest, setSpaceInterest] = useState<string | undefined>();

  const openForm = (type: InquiryType, spaceInfo?: string) => {
    setInquiryType(type);
    setSpaceInterest(spaceInfo);
    setIsOpen(true);
  };

  const closeForm = () => {
    setIsOpen(false);
    // Reset after animation completes
    setTimeout(() => {
      setInquiryType("general");
      setSpaceInterest(undefined);
    }, 300);
  };

  return (
    <ContactFormContext.Provider
      value={{ isOpen, inquiryType, spaceInterest, openForm, closeForm }}
    >
      {children}
    </ContactFormContext.Provider>
  );
}

export function useContactForm() {
  const context = useContext(ContactFormContext);
  if (context === undefined) {
    throw new Error("useContactForm must be used within ContactFormProvider");
  }
  return context;
}
