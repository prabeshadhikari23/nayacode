export interface CMSContent {
  id: string;
  key: string;
  value: string;
  type: string;
  created_at: string;
  updated_at: string;
}

export interface ServiceItem {
  id: string;
  icon: string;
  title: string;
  description: string;
  features: string[];
  category: string | null;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: string | null;
  description: string | null;
  image_url: string | null;
  tags: string[];
  link: string | null;
  featured: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface PartnerItem {
  id: string;
  name: string;
  logo: string | null;
  description: string | null;
  website: string | null;
  category: string | null;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface ContactInfo {
  id: string;
  address: string | null;
  phone: string[];
  email: string[];
  business_hours: string[];
  social_links: any;
  created_at: string;
  updated_at: string;
}

export interface FormSubmission {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  status: string;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface CMSUser {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'editor';
  lastLogin?: string;
}