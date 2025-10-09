import Image from "next/image";
import { SpaceImage } from "@/data/types";
import Badge from "../ui/Badge";

interface ImageGalleryProps {
  images: SpaceImage[];
  currentIndex: number;
  onSelect: (index: number) => void;
}

export default function ImageGallery({ images, currentIndex, onSelect }: ImageGalleryProps) {
  return (
    <div className="border-t border-gray-200 pt-6">
      <div className="grid grid-cols-4 gap-2">
        {images.map((img, imgIndex) => (
          <div
            key={imgIndex}
            onClick={() => onSelect(imgIndex)}
            onMouseEnter={() => onSelect(imgIndex)}
            className={`relative h-20 overflow-hidden bg-gray-100 cursor-pointer border-2 transition-all duration-200 ${
              currentIndex === imgIndex ? 'border-black' : 'border-transparent hover:border-gray-300'
            }`}
          >
            <Image
              src={img.src}
              alt={img.label}
              fill
              sizes="150px"
              className="object-cover"
            />
            {img.label.includes("Concept") && (
              <div className="absolute bottom-0 left-0 right-0 bg-blue-600/90 text-white text-[8px] text-center py-0.5 uppercase tracking-wide">
                Concept
              </div>
            )}
          </div>
        ))}
      </div>
      <p className="text-xs text-gray-500 mt-2 text-center">{images[currentIndex].label}</p>
    </div>
  );
}
