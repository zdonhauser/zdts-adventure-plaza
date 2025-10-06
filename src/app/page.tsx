"use client";

import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useState, useEffect, useRef } from "react";

export default function Home() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const tenantRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [spaceImageIndices, setSpaceImageIndices] = useState<{ [key: number]: number }>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        let maxIntersectionRatio = 0;
        let mostVisibleIndex = 0;

        entries.forEach((entry) => {
          if (entry.intersectionRatio > maxIntersectionRatio) {
            maxIntersectionRatio = entry.intersectionRatio;
            const index = tenantRefs.current.findIndex(
              (ref) => ref === entry.target
            );
            if (index !== -1) {
              mostVisibleIndex = index;
            }
          }
        });

        // On mobile (single column), update active on any visibility
        // On desktop, only update if more than 30% visible
        const threshold = window.innerWidth < 768 ? 0.2 : 0.3;

        if (maxIntersectionRatio > threshold) {
          setActiveIndex(mostVisibleIndex);
        }
      },
      {
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
        rootMargin: window.innerWidth < 768 ? "-20% 0px -20% 0px" : "-10% 0px -10% 0px",
      }
    );

    tenantRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      tenantRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  const tenants = [
    {
      name: "Jungle Jam Xtreme",
      category: "Indoor Family Entertainment",
      description: "Five-level playground, 25-foot rock climbing wall, arcade games, and indoor bouncy obstacle course. Fun for all ages!",
      address: "Former ZDT's Indoor Space",
      images: [
        "/images/tenants/Jungle Jam Xtreme/jje_1.jpg",
        "/images/tenants/Jungle Jam Xtreme/jje_2.jpg",
        "/images/tenants/Jungle Jam Xtreme/jje_3.jpg",
        "/images/tenants/Jungle Jam Xtreme/jje_4.jpg",
        "/images/tenants/Jungle Jam Xtreme/jje_5.jpg",
      ],
      logo: "/images/tenants/Jungle Jam Xtreme/jje_logo.jpg",
      website: "junglejamplay.com"
    },
    {
      name: "Entertainment Venue",
      category: "Coming Soon",
      description: "Exciting new entertainment destination to be announced. Stay tuned for updates!",
      address: "1115 N Bowie St, Seguin, TX",
      images: [
        "/images/tenants/dbat/IMG_2568.JPG",
      ],
      logo: null,
      website: null
    },
    {
      name: "Uptown Collar",
      category: "Pet Resort & Boutique",
      description: "Boutique suites, Day Play programs, onsite baths, and a stylish pet boutique. Luxurious care for your furry friends.",
      address: "1100 N Camp St, Seguin, TX",
      images: [
        "/images/tenants/UptownCollar/uc_1.jpg",
        "/images/tenants/UptownCollar/uc_2.jpg",
        "/images/tenants/UptownCollar/uc_3.jpg",
        "/images/tenants/UptownCollar/uc_4.jpg",
      ],
      logo: "/images/tenants/UptownCollar/uc_logo.jpg",
      website: "uptowncollar.com"
    },
    {
      name: "Paws to Perfection",
      category: "Pet Grooming Salon",
      description: "Premier grooming services including bathing, haircuts, nail care, and specialized treatments in a calm, relaxed environment.",
      address: "1100 N Camp St Suite #200, Seguin, TX",
      images: [
        "/images/tenants/Paws2Perfection/p2p_1.jpg",
        "/images/tenants/Paws2Perfection/p2p_3.jpg",
      ],
      logo: "/images/tenants/Paws2Perfection/p2p_logo.jpg",
      website: "pawstoperfectiontx.com"
    }
  ];

  const availableSpaces = [
    {
      title: "1123 N Bowie St",
      sqft: "15,000+ sq ft",
      features: "Expansive warehouse space, high ceilings, flexible layout",
      description: "Large-scale entertainment venue perfect for bowling alleys, laser tag arenas, indoor sports facilities, or multi-use entertainment complexes.",
      images: [
        { src: "/images/spaces/1123 N Bowie/IMG_2602.jpg", label: "Main View" },
        { src: "/images/spaces/1123 N Bowie/warehouse.png", label: "Interior" },
        { src: "/images/spaces/1123 N Bowie/bowling concept.png", label: "Bowling Concept" },
        { src: "/images/spaces/1123 N Bowie/laser tag concept.png", label: "Laser Tag Concept" },
      ]
    },
    {
      title: "1202 N Camp St",
      sqft: "8,000 sq ft",
      features: "Multiple rooms, excellent visibility, ample parking",
      description: "Versatile space ideal for entertainment venues, event centers, or multi-purpose recreational facilities.",
      images: [
        { src: "/images/spaces/1202 N Camp/IMG_2581.JPG", label: "Main View" },
        { src: "/images/spaces/1202 N Camp/IMG_2582.JPG", label: "Interior 1" },
        { src: "/images/spaces/1202 N Camp/IMG_2583.JPG", label: "Interior 2" },
        { src: "/images/spaces/1202 N Camp/IMG_2584.JPG", label: "Interior 3" },
        { src: "/images/spaces/1202 N Camp/IMG_2599.JPG", label: "Exterior" },
      ]
    },
    {
      title: "1204 N Camp St",
      sqft: "5,500 sq ft",
      features: "Prime location, flexible floor plan, street access",
      description: "Compact yet functional space suitable for boutique entertainment concepts, specialty venues, or experiential retail.",
      images: [
        { src: "/images/spaces/1204 N Camp/IMG_2591.JPG", label: "Main View" },
        { src: "/images/spaces/1204 N Camp/IMG_2592.JPG", label: "Interior" },
      ]
    },
    {
      title: "The Silos",
      sqft: "Unique footprint",
      features: "Iconic landmark structures, one-of-a-kind opportunity",
      description: "Historic grain silos offering a truly distinctive venue opportunity for creative entertainment or hospitality concepts.",
      images: [
        { src: "/images/spaces/The Silos/IMG_2596.JPG", label: "Main View" },
        { src: "/images/spaces/The Silos/IMG_2598 2.JPG", label: "Detail" },
        { src: "/images/spaces/The Silos/IMG_2604.JPG", label: "Exterior" },
      ]
    }
  ];

  // Auto-cycle images for spaces
  useEffect(() => {
    const interval = setInterval(() => {
      setSpaceImageIndices((prev) => {
        const newIndices = { ...prev };
        availableSpaces.forEach((space, index) => {
          const currentIndex = newIndices[index] || 0;
          const nextIndex = (currentIndex + 1) % space.images.length;
          newIndices[index] = nextIndex;
        });
        return newIndices;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-sm z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12">
                <Image
                  src="/images/Circle Logo one color.png"
                  alt="ZDT's Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-sm uppercase tracking-wider text-gray-800">Adventure Plaza</span>
            </div>
            <div className="hidden md:flex gap-8 text-sm">
              <a href="#tenants" className="hover:text-gray-600 transition-colors">Current Tenants</a>
              <a href="#available" className="hover:text-gray-600 transition-colors">Available Spaces</a>
              <a href="#rides" className="hover:text-gray-600 transition-colors">Rides</a>
              <a href="#contact" className="hover:text-gray-600 transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-black text-white">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40 z-10" />
        <Image
          src="/images/tenants/Jungle Jam Xtreme/MainBldg2.jpg"
          alt="ZDT's Adventure Plaza"
          fill
          className="object-cover"
          priority
        />
        <div className="relative z-20 max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight">
            Local Entertainment<br />Hub
          </h2>
          <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto mb-12">
            Supporting small businesses and community entertainment in Seguin, TX
          </p>
          <a
            href="#available"
            className="inline-block bg-white text-black px-8 py-4 text-lg font-medium hover:bg-gray-100 transition-colors"
          >
            Join Our Community
          </a>
        </div>
      </section>

      {/* Current Tenants Section */}
      <section id="tenants" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 mb-20">
          <h3 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">Our Community</h3>
          <p className="text-xl text-gray-600 max-w-2xl">
            Local small businesses bringing entertainment and joy to Seguin families
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {tenants.map((tenant, index) => {
            const isActive = hoveredIndex !== null ? hoveredIndex === index : activeIndex === index;

            return (
              <div
                key={index}
                ref={(el) => {
                  tenantRefs.current[index] = el;
                }}
                className="group relative overflow-hidden aspect-square cursor-pointer"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Carousel */}
                <div className="absolute inset-0">
                  <Carousel
                    showThumbs={false}
                    showStatus={false}
                    showIndicators={tenant.images.length > 1}
                    infiniteLoop={true}
                    autoPlay={tenant.images.length > 1}
                    interval={3000}
                    swipeable={true}
                    emulateTouch={true}
                    showArrows={false}
                    className="h-full tenant-carousel"
                  >
                    {tenant.images.map((img, imgIndex) => (
                      <div key={imgIndex} className="relative h-full">
                        <Image
                          src={img}
                          alt={`${tenant.name} - Image ${imgIndex + 1}`}
                          fill
                          className={`object-cover transition-all duration-500 ${
                            isActive ? 'grayscale-0' : 'grayscale'
                          }`}
                        />
                      </div>
                    ))}
                  </Carousel>
                </div>

                {/* Overlay with tenant info */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-100 group-hover:from-black/90 transition-opacity duration-500 z-10 pointer-events-none" />

                <div className="absolute inset-0 p-6 z-20 flex flex-col justify-end">
                  {/* Logo and category - always visible */}
                  <div className="space-y-3">
                    {tenant.logo ? (
                      <div className="relative h-16 w-40 mb-2 bg-white/90 p-2 rounded">
                        <Image
                          src={tenant.logo}
                          alt={`${tenant.name} logo`}
                          fill
                          className="object-contain object-left"
                        />
                      </div>
                    ) : (
                      <h4 className="text-2xl font-bold text-white mb-2 tracking-tight">{tenant.name}</h4>
                    )}
                    <p className="text-xs uppercase tracking-wider text-gray-300">{tenant.category}</p>

                    {/* Description and website - visible on hover */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 space-y-3 mt-4">
                      <p className="text-sm text-white leading-relaxed">
                        {tenant.description}
                      </p>
                      <p className="text-xs text-gray-400">
                        {tenant.address}
                      </p>
                      {tenant.website && (
                        <a
                          href={`https://${tenant.website}`}
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
          })}
        </div>
      </section>

      {/* Available Spaces Section */}
      <section id="available" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-20">
            <h3 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">Space for Your Dream</h3>
            <p className="text-xl text-gray-600 max-w-2xl">
              Affordable spaces for local entrepreneurs and family entertainment businesses
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {availableSpaces.map((space, spaceIndex) => {
              const currentImageIndex = spaceImageIndices[spaceIndex] || 0;
              const currentImage = space.images[currentImageIndex];

              return (
                <div key={spaceIndex} className="group border border-gray-200 bg-white hover:shadow-2xl transition-shadow duration-300">
                  {/* Main Image */}
                  <div className="relative h-[400px] overflow-hidden bg-gray-100">
                    <Image
                      src={currentImage.src}
                      alt={`${space.title} - ${currentImage.label}`}
                      fill
                      className="object-cover transition-opacity duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-black/80 text-white px-4 py-2 text-sm font-medium uppercase tracking-wider">
                      Available Now
                    </div>
                    {currentImage.label.includes("Concept") && (
                      <div className="absolute top-4 right-4 bg-blue-600/90 text-white px-3 py-1 text-xs font-medium uppercase tracking-wider">
                        Concept
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

                    {/* Image Thumbnails - All images including concepts */}
                    <div className="border-t border-gray-200 pt-6">
                      <div className="grid grid-cols-4 gap-2">
                        {space.images.map((img, imgIndex) => (
                          <div
                            key={imgIndex}
                            onClick={() => setSpaceImageIndices(prev => ({ ...prev, [spaceIndex]: imgIndex }))}
                            className={`relative h-20 overflow-hidden bg-gray-100 cursor-pointer border-2 transition-all duration-200 ${
                              currentImageIndex === imgIndex ? 'border-black' : 'border-transparent hover:border-gray-300'
                            }`}
                          >
                            <Image
                              src={img.src}
                              alt={img.label}
                              fill
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
                      <p className="text-xs text-gray-500 mt-2 text-center">{currentImage.label}</p>
                    </div>

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
            })}
          </div>
        </div>
      </section>

      {/* Rides Section */}
      <section id="rides" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-20">
            <h3 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">Former Attractions</h3>
            <p className="text-xl text-gray-600 max-w-2xl">
              Classic rides finding new homes across the country
            </p>
          </div>

          {/* For Sale */}
          <div className="mb-24">
            <h4 className="text-3xl font-bold mb-10 tracking-tight">Available for Purchase</h4>
            <div className="grid md:grid-cols-1 gap-8 max-w-3xl">
              <div className="group flex flex-col md:flex-row gap-8">
                <div className="relative w-full md:w-1/2 h-80 overflow-hidden bg-gray-100">
                  <Image
                    src="/images/rides/switchback.jpg"
                    alt="Switchback Roller Coaster"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-center">
                  <p className="text-sm uppercase tracking-wider text-gray-500 mb-3">For Sale</p>
                  <h5 className="text-4xl font-bold mb-4 tracking-tight">Switchback</h5>
                  <p className="text-lg text-gray-600 mb-6">
                    World-class wooden roller coaster. ZDT's flagship attraction featuring a unique reverse-launch system and thrilling vertical spike. A proven crowd favorite.
                  </p>
                  <a href="#contact" className="self-start text-sm uppercase tracking-wider border-b-2 border-black pb-1 hover:text-gray-600 hover:border-gray-600 transition-colors">
                    Inquire Now
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Sold Rides */}
          <div>
            <h4 className="text-3xl font-bold mb-10 tracking-tight">Previously Sold</h4>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { name: "Max Flight", image: "/images/rides/max-flight.jpg", status: "Relocation details coming soon" },
                { name: "Parachute Drop", image: "/images/rides/parachute.jpg", status: "Relocation details coming soon" },
                { name: "Dizzy Toucan", image: "/images/rides/dizzy-toucan.jpg", status: "Relocation details coming soon" },
                { name: "Bungee Trampoline", image: "/images/rides/bungee.jpg", status: "Relocation details coming soon" },
                { name: "Rock Wall", image: "/images/rides/rock-wall.jpg", status: "Relocation details coming soon" },
              ].map((ride, index) => (
                <div key={index} className="group">
                  <div className="relative h-64 mb-6 overflow-hidden bg-gray-100">
                    <Image
                      src={ride.image}
                      alt={ride.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500 grayscale opacity-60"
                    />
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm uppercase tracking-wider text-gray-500">Sold</p>
                    <h5 className="text-2xl font-bold tracking-tight">{ride.name}</h5>
                    <p className="text-gray-600 italic">{ride.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 bg-black text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-5xl md:text-6xl font-bold mb-8 tracking-tight">Start Your Journey</h3>
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
            Ready to join our community of local entertainment businesses? Let's make it happen together.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href="mailto:leasing@zdtsadventureplaza.com"
              className="bg-white text-black px-8 py-4 text-lg font-medium hover:bg-gray-100 transition-colors"
            >
              Email Us
            </a>
            <a
              href="tel:+15555555555"
              className="border border-white text-white px-8 py-4 text-lg font-medium hover:bg-white hover:text-black transition-colors"
            >
              Call Today
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-sm text-gray-600">
              © 2025 ZDT&apos;s Adventure Plaza. All rights reserved.
            </p>
            <div className="flex gap-8 text-sm text-gray-600">
              <a href="#" className="hover:text-black transition-colors">Privacy</a>
              <a href="#" className="hover:text-black transition-colors">Terms</a>
              <a href="#" className="hover:text-black transition-colors">Accessibility</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
