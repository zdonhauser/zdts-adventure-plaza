"use client";

import Image from "next/image";
import { Ride } from "@/data/types";
import { trackEvent } from "../analytics/GoogleAnalytics";

interface RideCardProps {
  ride: Ride;
}

export default function RideCard({ ride }: RideCardProps) {
  const hasWebsite = !!ride.website;

  const handleClick = () => {
    if (ride.website) {
      trackEvent('ride_website_click', {
        ride_name: ride.name,
        website_url: ride.website,
      });
    }
  };

  const CardContent = (
    <>
      <div className="relative h-64 mb-6 overflow-hidden bg-gray-100">
        <Image
          src={ride.image}
          alt={ride.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="space-y-2">
        <p className="text-sm uppercase tracking-wider text-gray-500">
          {hasWebsite ? 'Relocated' : 'Sold'}
        </p>
        <h5 className={`text-2xl font-bold tracking-tight ${hasWebsite ? 'group-hover:text-gray-600 transition-colors' : ''}`}>
          {ride.name}
        </h5>
        <p className="text-gray-600 italic">{ride.status}</p>
        {hasWebsite && (
          <p className="text-sm text-gray-500 group-hover:text-gray-700 transition-colors">
            Click to visit →
          </p>
        )}
      </div>
    </>
  );

  if (hasWebsite) {
    return (
      <a
        href={ride.website}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className="group block cursor-pointer"
      >
        {CardContent}
      </a>
    );
  }

  return (
    <div className="group">
      {CardContent}
    </div>
  );
}
