export interface CommunityMember {
  name: string;
  category: string;
  description: string;
  address: string;
  images: string[];
  logo: string | null;
  website: string | null;
}

export interface SpaceImage {
  src: string;
  label: string;
}

export interface AvailableSpace {
  title: string;
  sqft: string;
  features: string;
  description: string;
  images: SpaceImage[];
}

export interface Ride {
  name: string;
  image: string;
  status: string;
  website?: string;
}

export interface FeaturedRide {
  name: string;
  image: string;
  description: string;
  badge: string;
}
