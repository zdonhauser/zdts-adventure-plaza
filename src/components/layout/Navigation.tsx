"use client";

import { useState } from "react";
import Image from "next/image";
import MobileMenu from "./MobileMenu";
import { trackEvent } from "../analytics/GoogleAnalytics";

const navLinks = [
  { href: "#tenants", label: "Community Members" },
  { href: "#available", label: "Available Spaces" },
  { href: "#rides", label: "Rides" },
  { href: "#contact", label: "Contact" },
];

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (label: string, href: string) => {
    trackEvent('navigation_click', {
      link_text: label,
      link_url: href,
      link_domain: 'internal',
    });
  };

  return (
    <nav className="fixed top-0 w-full bg-white z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12">
              <Image
                src="/images/Circle-Logo-one-color.png"
                alt="ZDT's Logo"
                fill
                className="object-contain"
              />
            </div>
            <span className="text-sm uppercase tracking-wider text-gray-800">Adventure Plaza</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-8 text-sm">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => handleNavClick(link.label, link.href)}
                className="hover:text-gray-600 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex flex-col gap-1.5 w-8 h-8 justify-center items-center"
            aria-label="Toggle menu"
          >
            <span className={`w-6 h-0.5 bg-black transition-all ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`w-6 h-0.5 bg-black transition-all ${mobileMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`w-6 h-0.5 bg-black transition-all ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        links={navLinks}
        onLinkClick={handleNavClick}
      />
    </nav>
  );
}
