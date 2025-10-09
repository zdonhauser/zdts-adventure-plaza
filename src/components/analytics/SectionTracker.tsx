"use client";

import { useEffect, useRef } from "react";
import { trackSectionView } from "./GoogleAnalytics";

interface SectionTrackerProps {
  sectionId: string;
  sectionName: string;
  children: React.ReactNode;
  threshold?: number; // Percentage of section that needs to be visible (0-1)
}

export default function SectionTracker({
  sectionId,
  sectionName,
  children,
  threshold = 0.5, // Default: track when 50% visible
}: SectionTrackerProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const hasTrackedRef = useRef(false);

  useEffect(() => {
    const currentSection = sectionRef.current;
    if (!currentSection) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Track only once when section becomes visible
          if (entry.isIntersecting && !hasTrackedRef.current) {
            hasTrackedRef.current = true;
            trackSectionView(sectionName, sectionId);

            // Also track as virtual page view for better reporting
            if (typeof window !== 'undefined' && (window as any).gtag) {
              (window as any).gtag('event', 'page_view', {
                page_title: `${sectionName} Section`,
                page_location: `${window.location.origin}${window.location.pathname}#${sectionId}`,
                page_path: `/#${sectionId}`,
              });
            }
          }
        });
      },
      {
        threshold: threshold,
        rootMargin: "0px",
      }
    );

    observer.observe(currentSection);

    return () => {
      if (currentSection) {
        observer.unobserve(currentSection);
      }
    };
  }, [sectionId, sectionName, threshold]);

  return (
    <div ref={sectionRef} id={sectionId}>
      {children}
    </div>
  );
}
