import Image from "next/image";
import { FeaturedRide as FeaturedRideType } from "@/data/types";

interface FeaturedRideProps {
  ride: FeaturedRideType;
}

export default function FeaturedRide({ ride }: FeaturedRideProps) {
  return (
    <div className="group flex flex-col md:flex-row gap-8">
      <div className="relative w-full md:w-1/2 h-80 overflow-hidden bg-gray-100">
        <Image
          src={ride.image}
          alt={ride.name}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="flex-1 flex flex-col justify-center">
        <p className="text-sm uppercase tracking-wider text-gray-500 mb-3">{ride.badge}</p>
        <h5 className="text-4xl font-bold mb-4 tracking-tight">{ride.name}</h5>
        <p className="text-lg text-gray-600 mb-6">
          {ride.description}
        </p>
        <a href="#contact" className="self-start text-sm uppercase tracking-wider border-b-2 border-black pb-1 hover:text-gray-600 hover:border-gray-600 transition-colors">
          Inquire Now
        </a>
      </div>
    </div>
  );
}
