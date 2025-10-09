import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

interface MemberCarouselProps {
  images: string[];
  name: string;
  isActive: boolean;
  priority?: boolean;
}

export default function MemberCarousel({ images, name, isActive, priority = false }: MemberCarouselProps) {
  return (
    <div className="absolute inset-0">
      <Carousel
        showThumbs={false}
        showStatus={false}
        showIndicators={images.length > 1}
        infiniteLoop={true}
        autoPlay={images.length > 1}
        interval={3000}
        swipeable={true}
        emulateTouch={true}
        showArrows={false}
        className="h-full tenant-carousel"
      >
        {images.map((img, imgIndex) => (
          <div key={imgIndex} className="relative h-full">
            <Image
              src={img}
              alt={`${name} - Image ${imgIndex + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={priority && imgIndex === 0}
              className={`object-cover transition-all duration-500 ${
                isActive ? 'grayscale-0' : 'grayscale'
              }`}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
}
