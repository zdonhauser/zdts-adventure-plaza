import Image from "next/image";
import { AvailableSpace } from "@/data/types";
import Badge from "../ui/Badge";
import ImageGallery from "./ImageGallery";

interface SpaceCardProps {
  space: AvailableSpace;
  currentImageIndex: number;
  onImageSelect: (index: number) => void;
}

export default function SpaceCard({ space, currentImageIndex, onImageSelect }: SpaceCardProps) {
  const currentImage = space.images[currentImageIndex];

  return (
    <div className="group border border-gray-200 bg-white hover:shadow-2xl transition-shadow duration-300">
      {/* Main Image */}
      <div className="relative h-[400px] overflow-hidden bg-gray-100">
        <Image
          src={currentImage.src}
          alt={`${space.title} - ${currentImage.label}`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-opacity duration-500"
        />
        <div className="absolute top-4 left-4">
          <Badge>Available Now</Badge>
        </div>
        {currentImage.label.includes("Concept") && (
          <div className="absolute top-4 right-4">
            <Badge variant="concept" size="sm">Concept</Badge>
          </div>
        )}
      </div>

      {/* Space Details */}
      <div className="p-8 space-y-6">
        <div className="space-y-3">
          <h4 className="text-3xl font-bold tracking-tight">{space.title}</h4>
          <div className="flex items-center gap-3 text-sm uppercase tracking-wider text-gray-500">
            <span className="font-semibold text-black">{space.sqft}</span>
            <span>•</span>
            <span>{space.features}</span>
          </div>
        </div>

        <p className="text-gray-700 leading-relaxed">
          {space.description}
        </p>

        <ImageGallery
          images={space.images}
          currentIndex={currentImageIndex}
          onSelect={onImageSelect}
        />

        {/* CTA */}
        <div className="pt-4">
          <a
            href="#contact"
            className="block w-full text-center bg-black text-white px-6 py-4 text-sm uppercase tracking-wider font-medium hover:bg-gray-900 transition-colors"
          >
            Request Information
          </a>
        </div>
      </div>
    </div>
  );
}
