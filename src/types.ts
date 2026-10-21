export interface Product {
  id: string;
  name: string;
  origin: string;
  price: string;
  imageUrl: string;
  description: string;
  order: number;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  order: number;
}

export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  text: string;
  imageUrl: string;
  createdAt: string;
}

export interface WhyChooseUsItem {
  title: string;
  icon: 'ShieldCheck' | 'TrendingDown' | 'Truck' | 'Headset';
  description: string;
}

export interface SocialLinks {
  facebook?: string;
  whatsapp?: string;
  linkedin?: string;
  instagram?: string;
  youtube?: string;
  tiktok?: string;
}

export interface SectionVisibility {
  hero: boolean;
  owner: boolean;
  products: boolean;
  about: boolean;
  whyChoose: boolean;
  testimonials?: boolean;
  faq: boolean;
  contact: boolean;
  [key: string]: boolean | undefined;
}

export interface SiteSettings {
  id: string;
  heroHeading: string;
  heroSubheading: string;
  heroBannerUrl?: string;
  ownerBio: string;
  ownerPhotoUrl: string;
  aboutText: string;
  whyChooseUsItems: WhyChooseUsItem[];
  contactAddress: string;
  contactPhone: string;
  contactEmail: string;
  locationMapUrl?: string;
  socialLinks: SocialLinks;
  sectionVisibility: SectionVisibility;
  logoUrl?: string;
  theme?: string;
}

export interface Lead {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  productInterest: string;
  message: string;
  status: 'new' | 'contacted' | 'closed';
  createdAt: string;
}

export interface User {
  uid: string;
  fullName: string;
  email: string;
  role: 'admin' | 'user';
  status: 'active' | 'banned';
  createdAt: string;
}
