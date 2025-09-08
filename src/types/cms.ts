export interface CMSContent {
  id: string;
  type: 'text' | 'image' | 'service' | 'portfolio' | 'partner' | 'contact' | 'form-submission';
  key: string;
  value: any;
  lastModified: string;
  modifiedBy?: string;
}

export interface ServiceItem {
  id: string;
  icon: string;
  title: string;
  description: string;
  features: string[];
  category: string;
  order: number;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  tags: string[];
  link?: string;
  featured: boolean;
  order: number;
}

export interface PartnerItem {
  id: string;
  name: string;
  logo: string;
  description: string;
  website?: string;
  category: string;
  order: number;
}

export interface ContactInfo {
  id: string;
  address: string;
  phone: string[];
  email: string[];
  businessHours: string[];
  socialLinks: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
}

export interface FormSubmission {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  submittedAt: string;
  status: 'new' | 'read' | 'replied' | 'archived';
  notes?: string;
}

export interface CMSUser {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'editor';
  lastLogin?: string;
}