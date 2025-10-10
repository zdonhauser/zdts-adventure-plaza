import { forwardRef } from "react";
import Image from "next/image";
import { CommunityMember } from "@/data/types";
import MemberCarousel from "./MemberCarousel";
import { trackEvent } from "../analytics/GoogleAnalytics";

interface CommunityMemberCardProps {
  member: CommunityMember;
  isActive: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  priority?: boolean;
}

const CommunityMemberCard = forwardRef<HTMLDivElement, CommunityMemberCardProps>(
  ({ member, isActive, onMouseEnter, onMouseLeave, priority = false }, ref) => {
    const handleClick = () => {
      if (member.website) {
        trackEvent('tenant_click', {
          tenant_name: member.name,
          website_url: member.website,
        });
      }
    };

    const cardContent = (
      <div
        ref={ref}
        className="group relative overflow-hidden aspect-square cursor-pointer"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {/* Carousel */}
        <MemberCarousel images={member.images} name={member.name} isActive={isActive} priority={priority} />

        {/* Overlay with member info */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-100 group-hover:from-black/90 transition-all duration-300 z-10 pointer-events-none" />

        {/* Logo - positioned at top left */}
        {member.logo && (
          <div className="absolute top-0 left-0 p-6 z-20">
            <div className="relative h-24 w-auto inline-block">
              <Image
                src={member.logo}
                alt={`${member.name} logo`}
                width={240}
                height={96}
                className="object-contain object-left"
                style={{ height: '96px', width: 'auto' }}
              />
            </div>
          </div>
        )}

        <div className="absolute inset-x-0 bottom-0 p-6 z-20 flex flex-col">
          {/* Business name and category - positioned at bottom, slide up on hover */}
          <div className="space-y-3 transition-transform duration-300 group-hover:-translate-y-2">
            <h4 className="text-xl font-bold text-white tracking-tight">{member.name}</h4>
            <p className="text-xs uppercase tracking-wider text-gray-300">{member.category}</p>
          </div>

          {/* Description - slides up from bottom on hover */}
          <div className="max-h-0 group-hover:max-h-96 overflow-hidden transition-all duration-300 ease-in-out">
            <div className="space-y-3 pt-4">
              <p className="text-sm text-white leading-relaxed">
                {member.description}
              </p>
              <p className="text-xs text-gray-400">
                {member.address}
              </p>
              {member.website && (
                <p className="text-xs uppercase tracking-wider text-white opacity-75">
                  Click to visit website →
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    );

    if (member.website) {
      return (
        <a
          href={`https://${member.website}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleClick}
          className="block"
        >
          {cardContent}
        </a>
      );
    }

    return cardContent;
  }
);

CommunityMemberCard.displayName = "CommunityMemberCard";

export default CommunityMemberCard;
