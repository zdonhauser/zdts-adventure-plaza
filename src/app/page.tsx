import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/hero/HeroSection";
import AboutSection from "@/components/about/AboutSection";
import CommunityGrid from "@/components/community/CommunityGrid";
import SpacesGrid from "@/components/spaces/SpacesGrid";
import RidesSection from "@/components/rides/RidesSection";
import ContactSection from "@/components/contact/ContactSection";
import SectionTracker from "@/components/analytics/SectionTracker";
import { communityMembers } from "@/data/communityMembers";
import { availableSpaces } from "@/data/availableSpaces";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />

      <SectionTracker sectionId="about" sectionName="About">
        <AboutSection />
      </SectionTracker>

      <SectionTracker sectionId="tenants" sectionName="Community Members">
        <CommunityGrid members={communityMembers} />
      </SectionTracker>

      <SectionTracker sectionId="available" sectionName="Available Spaces">
        <SpacesGrid spaces={availableSpaces} />
      </SectionTracker>

      <SectionTracker sectionId="rides" sectionName="Rides">
        <RidesSection />
      </SectionTracker>

      <SectionTracker sectionId="contact" sectionName="Contact">
        <ContactSection />
      </SectionTracker>

      <Footer />
    </div>
  );
}
