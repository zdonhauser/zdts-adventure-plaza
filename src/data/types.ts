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

// Contact Form Types
export type InquiryType = 'space' | 'general' | 'tour' | 'ride';

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  inquiryType: InquiryType;
  spaceInterest?: string; // Pre-filled when clicking from a space card
  parkName?: string; // Required for ride inquiries to filter out enthusiasts
  recaptchaToken?: string; // Added during submission
}
