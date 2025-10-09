"use client";

import Script from "next/script";

interface GoogleAnalyticsProps {
  measurementId: string;
}

export default function GoogleAnalytics({ measurementId }: GoogleAnalyticsProps) {
  if (!measurementId || measurementId === "G-XXXXXXXXXX") {
    // Don't load GA if no valid measurement ID is provided
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${measurementId}', {
            page_path: window.location.pathname,
            // Enhanced Measurement is enabled by default in GA4
            // This tracks: scrolls, outbound clicks, site search, video engagement, file downloads
          });
        `}
      </Script>
    </>
  );
}

// Helper function to track events (can be imported and used anywhere)
export const trackEvent = (eventName: string, eventParams?: Record<string, any>) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, eventParams);
  }
};

// Helper function to track virtual page views
export const trackPageView = (pageTitle: string, pagePath: string) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'page_view', {
      page_title: pageTitle,
      page_location: window.location.href,
      page_path: pagePath,
    });
  }
};

// Helper function to track section views
export const trackSectionView = (sectionName: string, sectionId: string) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'section_view', {
      section_name: sectionName,
      section_id: sectionId,
      page_location: window.location.href,
    });
  }
};
