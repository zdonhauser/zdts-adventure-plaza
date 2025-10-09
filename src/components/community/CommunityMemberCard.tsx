import { forwardRef } from "react";
import Image from "next/image";
import { CommunityMember } from "@/data/types";
import MemberCarousel from "./MemberCarousel";

interface CommunityMemberCardProps {
  member: CommunityMember;
  isActive: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  priority?: boolean;
}

const CommunityMemberCard = forwardRef<HTMLDivElement, CommunityMemberCardProps>(
  ({ member, isActive, onMouseEnter, onMouseLeave, priority = false }, ref) => {
    return (
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

        <div className="absolute inset-x-0 bottom-0 p-6 z-20 flex flex-col">
          {/* Logo and category - positioned at bottom, slide up on hover */}
          <div className="space-y-3 transition-transform duration-300 group-hover:-translate-y-2">
            {member.logo ? (
              <div className="relative h-16 w-auto inline-block mb-2">
                <Image
                  src={member.logo}
                  alt={`${member.name} logo`}
                  width={160}
                  height={64}
                  className="object-contain object-left"
                  style={{ height: '64px', width: 'auto' }}
                />
              </div>
            ) : (
              <h4 className="text-2xl font-bold text-white mb-2 tracking-tight">{member.name}</h4>
            )}
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
                <a
                  href={`https://${member.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-xs uppercase tracking-wider border-b border-white pb-1 hover:text-gray-300 hover:border-gray-300 transition-colors pointer-events-auto text-white"
                >
                  Visit Website →
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

CommunityMemberCard.displayName = "CommunityMemberCard";

export default CommunityMemberCard;
