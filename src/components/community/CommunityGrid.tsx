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

    // Desktop: use IntersectionObserver with simpler threshold
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            const index = memberRefs.current.findIndex(
              (ref) => ref === entry.target
            );
            if (index !== -1) {
              setActiveIndex(index);
            }
          }
        });
      },
      {
        threshold: 0.5,
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
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 mb-20">
        <SectionHeader
          title="Our Community"
          description="Local small businesses bringing entertainment and joy to Seguin families"
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
