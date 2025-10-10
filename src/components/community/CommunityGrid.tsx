"use client";

import { useState, useEffect, useRef } from "react";
import { CommunityMember } from "@/data/types";
import SectionHeader from "../ui/SectionHeader";
import CommunityMemberCard from "./CommunityMemberCard";

interface CommunityGridProps {
  members: CommunityMember[];
}

export default function CommunityGrid({ members }: CommunityGridProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isMobile, setIsMobile] = useState(false);
  const memberRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Check if mobile on mount
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Disable IntersectionObserver on mobile - just keep all cards active
    if (window.innerWidth < 768) {
      return () => window.removeEventListener('resize', checkMobile);
    }

    // Desktop: use IntersectionObserver with left/right alternation
    const observer = new IntersectionObserver(
      (entries) => {
        // Find all intersecting cards and group into row pairs
        const intersecting = entries
          .filter((entry) => entry.isIntersecting && entry.intersectionRatio > 0.2)
          .map((entry) => {
            const index = memberRefs.current.findIndex((ref) => ref === entry.target);
            if (index === -1) return null;

            const rect = entry.boundingClientRect;
            const viewportCenter = window.innerHeight / 2;
            const cardCenter = rect.top + rect.height / 2;
            const rowPairIndex = Math.floor(index / 2); // Which row pair (0,1 are pair 0, 2,3 are pair 1, etc)
            const isLeftCard = index % 2 === 0;

            return {
              index,
              rowPairIndex,
              isLeftCard,
              cardCenter,
              distanceFromCenter: Math.abs(viewportCenter - cardCenter),
              isAboveCenter: cardCenter < viewportCenter
            };
          })
          .filter((item) => item !== null);

        if (intersecting.length === 0) return;

        // Find the row pair closest to center
        const rowPairs = new Map();
        intersecting.forEach(card => {
          if (!rowPairs.has(card.rowPairIndex)) {
            rowPairs.set(card.rowPairIndex, []);
          }
          rowPairs.get(card.rowPairIndex).push(card);
        });

        // Get the row pair with card closest to viewport center
        let closestRow = null;
        let minDistance = Infinity;
        rowPairs.forEach((cards) => {
          const distance = Math.min(...cards.map(c => c.distanceFromCenter));
          if (distance < minDistance) {
            minDistance = distance;
            closestRow = cards;
          }
        });

        if (closestRow) {
          // Determine which card in the pair to activate based on scroll position
          // If row is entering (above center or just reaching it), show left card
          // If row is centered/exiting (below center), show right card
          const rowCenter = closestRow[0].cardCenter;
          const viewportCenter = window.innerHeight / 2;
          const offset = window.innerHeight * 0.15; // Switch 15% before center

          // Activate LEFT when entering (row center above viewport center + offset)
          // Activate RIGHT when row gets closer to center
          const shouldShowLeft = rowCenter > (viewportCenter + offset);

          const targetCard = closestRow.find(c => c.isLeftCard === shouldShowLeft) || closestRow[0];
          setActiveIndex(targetCard.index);
        }
      },
      {
        threshold: [0.2, 0.4, 0.6, 0.8, 1.0],
        rootMargin: "0px",
      }
    );

    const currentRefs = memberRefs.current;
    currentRefs.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      window.removeEventListener('resize', checkMobile);
      currentRefs.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <section className="py-32 bg-gradient-to-b from-gray-100 from-0% to-white to-15%">
      <div className="max-w-7xl mx-auto px-6 mb-20">
        <SectionHeader
          title="Meet Our Tenants"
          description="Independent businesses bringing entertainment and joy to Seguin families from our reimagined spaces"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
        {members.map((member, index) => {
          // On mobile, all cards are active. On desktop, use intersection observer logic
          const isActive = isMobile ? true : (hoveredIndex !== null ? hoveredIndex === index : activeIndex === index);

          return (
            <CommunityMemberCard
              key={index}
              ref={(el) => {
                memberRefs.current[index] = el;
              }}
              member={member}
              isActive={isActive}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              priority={index < 2}
            />
          );
        })}
      </div>
    </section>
  );
}
