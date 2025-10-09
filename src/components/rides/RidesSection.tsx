import SectionHeader from "../ui/SectionHeader";
import FeaturedRide from "./FeaturedRide";
import RideCard from "./RideCard";
import { featuredRide, soldRides } from "@/data/rides";

export default function RidesSection() {
  return (
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          title="Former Attractions"
          description="Classic rides finding new homes across the country"
        />

        {/* For Sale */}
        <div className="mb-24">
          <h4 className="text-3xl font-bold mb-10 tracking-tight">Available for Purchase</h4>
          <div className="grid md:grid-cols-1 gap-8 max-w-3xl">
            <FeaturedRide ride={featuredRide} />
          </div>
        </div>

        {/* Sold Rides */}
        <div>
          <h4 className="text-3xl font-bold mb-10 tracking-tight">Previously Sold</h4>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {soldRides.map((ride, index) => (
              <RideCard key={index} ride={ride} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
