import Image from "next/image";
import Button from "../ui/Button";

export default function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center bg-black text-white">
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40 z-10" />
      <Image
        src="/images/tenants/Jungle-Jam-Xtreme/MainBldg2.jpg"
        alt="ZDT's Adventure Plaza"
        fill
        sizes="100vw"
        className="object-cover"
        priority
      />
      <div className="relative z-20 max-w-5xl mx-auto px-6 text-center">
        <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight">
          A New Chapter in<br />Local Entertainment
        </h2>
        <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto mb-12">
          Transforming a beloved amusement park into a vibrant hub for entertainment and tourism businesses
        </p>
        <Button href="#available">
          Explore Available Spaces
        </Button>
      </div>
    </section>
  );
}
