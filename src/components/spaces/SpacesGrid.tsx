"use client";

import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { AvailableSpace } from "@/data/types";
import SectionHeader from "../ui/SectionHeader";
import SpaceCard from "./SpaceCard";

interface SpacesGridProps {
  spaces: AvailableSpace[];
}

export default function SpacesGrid({ spaces }: SpacesGridProps) {
  const [spaceImageIndices, setSpaceImageIndices] = useState<{ [key: number]: number }>({});
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Memoize spaces to prevent recreation on every render
  const memoizedSpaces = useMemo(() => spaces, [spaces]);

  // Function to start/restart the auto-cycle timer
  const startAutoCycle = useCallback(() => {
    // Clear existing interval if any
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Start new interval
    intervalRef.current = setInterval(() => {
      setSpaceImageIndices((prev) => {
        const newIndices = { ...prev };
        memoizedSpaces.forEach((space, index) => {
          const currentIndex = newIndices[index] || 0;
          const nextIndex = (currentIndex + 1) % space.images.length;
          newIndices[index] = nextIndex;
        });
        return newIndices;
      });
    }, 4000);
  }, [memoizedSpaces]);

  // Auto-cycle images for spaces
  useEffect(() => {
    startAutoCycle();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [startAutoCycle]);

  const handleImageSelect = (spaceIndex: number, imageIndex: number) => {
    setSpaceImageIndices(prev => ({ ...prev, [spaceIndex]: imageIndex }));
    // Reset the auto-cycle timer when user manually selects an image
    startAutoCycle();
  };

  return (
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          title="Space for Your Dream"
          description="Affordable spaces for local entrepreneurs and family entertainment businesses"
        />

        <div className="grid md:grid-cols-2 gap-8">
          {memoizedSpaces.map((space, spaceIndex) => {
            const currentImageIndex = spaceImageIndices[spaceIndex] || 0;

            return (
              <SpaceCard
                key={spaceIndex}
                space={space}
                currentImageIndex={currentImageIndex}
                onImageSelect={(imageIndex) => handleImageSelect(spaceIndex, imageIndex)}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
