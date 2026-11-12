export * from './data';

export interface PropertyListing {
  id: string;
  title: string;
  address: string;
  price: number;
  formattedPrice: string;
  community: string;
  bedrooms: string;
  bathrooms: string;
  sqft: string;
  description: string;
  imageUrl: string;
  badgeText?: string;
  brokerageLogoUrl?: string;
}

export interface ClientTestimonial {
  id: string;
  author: string;
  location?: string;
  rating: number;
  quote: string;
  role?: string;
  initials?: string;
}

export interface RealEstateService {
  index: string; // "01", "02", etc.
  title: string;
  subtitle?: string;
  description: string;
  categoryTag?: string;
  iconName?: string;
}

export interface InquiryPayload {
  name: string;
  email: string;
  intent?: 'selling' | 'buying' | 'both';
  message: string;
}

export interface ReviewPayload {
  rating: number;
  title: string;
  content: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  caption?: string;
}

export interface ServicePillar {
  id: string;
  title: string;
  description: string;
}

export interface FeaturedListingInfo {
  address: string;
  city: string;
  postalCode: string;
  price: number;
  formattedPrice: string;
  specs: {
    beds: string;
    baths: number;
    sqft: number;
  };
  imageUrl: string;
}
