import { supabase } from './supabase';
import { CMSContent, ServiceItem, PortfolioItem, PartnerItem, ContactInfo, FormSubmission } from '@/types/cms';

// Fallback to localStorage if Supabase is not available
const isSupabaseAvailable = () => {
  return !!(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY);
};

// Local storage keys (fallback)
const CMS_STORAGE_KEY = 'naya-cms-content';
const CMS_SERVICES_KEY = 'naya-cms-services';
const CMS_PORTFOLIO_KEY = 'naya-cms-portfolio';
const CMS_PARTNERS_KEY = 'naya-cms-partners';
const CMS_CONTACT_KEY = 'naya-cms-contact';
const CMS_FORMS_KEY = 'naya-cms-forms';

// Default data
const getDefaultContent = (): CMSContent[] => [
  {
    id: '1',
    type: 'text',
    key: 'hero.title',
    value: 'Transforming Challenges into Digital Opportunities',
    lastModified: new Date().toISOString()
  },
  {
    id: '2',
    type: 'text',
    key: 'hero.subtitle',
    value: 'Your partner for innovative, scalable, and secure IT solutions in Nepal and beyond.',
    lastModified: new Date().toISOString()
  },
  {
    id: '3',
    type: 'text',
    key: 'about.title',
    value: 'Our Core Philosophy',
    lastModified: new Date().toISOString()
  },
  {
    id: '4',
    type: 'text',
    key: 'about.description',
    value: 'We believe in creating digital solutions that not only solve problems but also drive innovation and growth.',
    lastModified: new Date().toISOString()
  }
];

const getDefaultServices = (): ServiceItem[] => [
  {
    id: '1',
    icon: 'Code',
    title: 'Software Development',
    description: 'Custom web and mobile applications built with modern technologies',
    features: ['Web Applications', 'Mobile Apps', 'API Development', 'Cloud Solutions'],
    category: 'Development',
    order: 1
  },
  {
    id: '2',
    icon: 'Shield',
    title: 'IT Security',
    description: 'Comprehensive cybersecurity solutions to protect your business',
    features: ['Security Audits', 'Threat Assessment', 'Implementation', 'Monitoring'],
    category: 'Security',
    order: 2
  },
  {
    id: '3',
    icon: 'Target',
    title: 'Digital Marketing',
    description: 'Strategic digital marketing to grow your online presence',
    features: ['SEO Optimization', 'Social Media', 'Content Strategy', 'Lead Generation'],
    category: 'Marketing',
    order: 3
  },
  {
    id: '4',
    icon: 'Users',
    title: 'UI/UX Design',
    description: 'Beautiful and intuitive user experiences that engage customers',
    features: ['User Research', 'Interface Design', 'Brand Identity', 'Prototyping'],
    category: 'Design',
    order: 4
  }
];

const getDefaultPortfolio = (): PortfolioItem[] => [
  {
    id: '1',
    title: 'E-commerce Platform',
    category: 'Web Development',
    description: 'Modern e-commerce solution with payment integration',
    imageUrl: '/api/placeholder/400/300',
    tags: ['React', 'Node.js', 'MongoDB'],
    featured: true,
    order: 1
  },
  {
    id: '2',
    title: 'Mobile Banking App',
    category: 'Mobile Development',
    description: 'Secure mobile banking application with biometric authentication',
    imageUrl: '/api/placeholder/400/300',
    tags: ['React Native', 'Security', 'Fintech'],
    featured: false,
    order: 2
  }
];

const getDefaultPartners = (): PartnerItem[] => [
  {
    id: '1',
    name: 'Microsoft Nepal',
    logo: '/lovable-uploads/39671993-1bb4-4bb6-8819-3ca5c07c0042.png',
    description: 'Strategic technology partnership for cloud solutions and enterprise software development',
    website: 'https://microsoft.com',
    category: 'Technology',
    order: 1
  },
  {
    id: '2',
    name: 'Google Cloud Partner',
    logo: '/lovable-uploads/39671993-1bb4-4bb6-8819-3ca5c07c0042.png',
    description: 'Certified Google Cloud partner providing scalable cloud infrastructure solutions',
    website: 'https://cloud.google.com',
    category: 'Cloud Services',
    order: 2
  },
  {
    id: '3',
    name: 'AWS Solutions Partner',
    logo: '/lovable-uploads/39671993-1bb4-4bb6-8819-3ca5c07c0042.png',
    description: 'Amazon Web Services partner specializing in cloud migration and DevOps solutions',
    website: 'https://aws.amazon.com',
    category: 'Cloud Infrastructure',
    order: 3
  }
];

const getDefaultContact = (): ContactInfo => ({
  id: '1',
  address: 'Dillibazar-30, Kathmandu, Nepal',
  phone: ['+977 14548052', '+977 970511455'],
  email: ['info@nayacode.com.np'],
  businessHours: ['Monday - Friday: 9:00 AM - 6:00 PM', 'Saturday: 10:00 AM - 4:00 PM'],
  socialLinks: {
    facebook: 'https://facebook.com/nayacode',
    twitter: 'https://twitter.com/nayacode',
    linkedin: 'https://linkedin.com/company/nayacode',
    instagram: 'https://instagram.com/nayacode'
  }
});

// Content management functions
export const getCMSContent = async (): Promise<CMSContent[]> => {
  if (!isSupabaseAvailable()) {
    // Fallback to localStorage
    const content = localStorage.getItem(CMS_STORAGE_KEY);
    return content ? JSON.parse(content) : getDefaultContent();
  }

  try {
    const { data, error } = await supabase
      .from('cms_content')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) throw error;

    return data.map(item => ({
      id: item.id,
      type: item.type,
      key: item.key,
      value: item.value,
      lastModified: item.last_modified,
      modifiedBy: item.modified_by
    }));
  } catch (error) {
    console.error('Error fetching CMS content:', error);
    // Fallback to localStorage
    const content = localStorage.getItem(CMS_STORAGE_KEY);
    return content ? JSON.parse(content) : getDefaultContent();
  }
};

export const updateCMSContent = async (key: string, value: any): Promise<void> => {
  if (!isSupabaseAvailable()) {
    // Fallback to localStorage
    const content = await getCMSContent();
    const existingIndex = content.findIndex(item => item.key === key);
    
    if (existingIndex >= 0) {
      content[existingIndex] = {
        ...content[existingIndex],
        value,
        lastModified: new Date().toISOString()
      };
    } else {
      content.push({
        id: Date.now().toString(),
        type: 'text',
        key,
        value,
        lastModified: new Date().toISOString()
      });
    }
    
    localStorage.setItem(CMS_STORAGE_KEY, JSON.stringify(content));
    return;
  }

  try {
    const { error } = await supabase
      .from('cms_content')
      .upsert({
        key,
        value,
        last_modified: new Date().toISOString()
      }, {
        onConflict: 'key'
      });

    if (error) throw error;
  } catch (error) {
    console.error('Error updating CMS content:', error);
    // Fallback to localStorage
    const content = await getCMSContent();
    const existingIndex = content.findIndex(item => item.key === key);
    
    if (existingIndex >= 0) {
      content[existingIndex] = {
        ...content[existingIndex],
        value,
        lastModified: new Date().toISOString()
      };
    } else {
      content.push({
        id: Date.now().toString(),
        type: 'text',
        key,
        value,
        lastModified: new Date().toISOString()
      });
    }
    
    localStorage.setItem(CMS_STORAGE_KEY, JSON.stringify(content));
  }
};

export const getCMSContentByKey = async (key: string): Promise<string> => {
  const content = await getCMSContent();
  const item = content.find(item => item.key === key);
  return item?.value || '';
};

// Services management
export const getServices = async (): Promise<ServiceItem[]> => {
  if (!isSupabaseAvailable()) {
    const services = localStorage.getItem(CMS_SERVICES_KEY);
    return services ? JSON.parse(services) : getDefaultServices();
  }

  try {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('order_index', { ascending: true });

    if (error) throw error;

    return data.map(item => ({
      id: item.id,
      icon: item.icon,
      title: item.title,
      description: item.description,
      features: item.features,
      category: item.category,
      order: item.order_index
    }));
  } catch (error) {
    console.error('Error fetching services:', error);
    const services = localStorage.getItem(CMS_SERVICES_KEY);
    return services ? JSON.parse(services) : getDefaultServices();
  }
};

export const updateServices = async (services: ServiceItem[]): Promise<void> => {
  if (!isSupabaseAvailable()) {
    localStorage.setItem(CMS_SERVICES_KEY, JSON.stringify(services));
    return;
  }

  try {
    // Delete all existing services
    await supabase.from('services').delete().neq('id', '00000000-0000-0000-0000-000000000000');

    // Insert new services
    const { error } = await supabase
      .from('services')
      .insert(services.map(service => ({
        id: service.id,
        icon: service.icon,
        title: service.title,
        description: service.description,
        features: service.features,
        category: service.category,
        order_index: service.order,
        updated_at: new Date().toISOString()
      })));

    if (error) throw error;
  } catch (error) {
    console.error('Error updating services:', error);
    localStorage.setItem(CMS_SERVICES_KEY, JSON.stringify(services));
  }
};

// Portfolio management
export const getPortfolio = async (): Promise<PortfolioItem[]> => {
  if (!isSupabaseAvailable()) {
    const portfolio = localStorage.getItem(CMS_PORTFOLIO_KEY);
    return portfolio ? JSON.parse(portfolio) : getDefaultPortfolio();
  }

  try {
    const { data, error } = await supabase
      .from('portfolio')
      .select('*')
      .order('order_index', { ascending: true });

    if (error) throw error;

    return data.map(item => ({
      id: item.id,
      title: item.title,
      category: item.category,
      description: item.description,
      imageUrl: item.image_url,
      tags: item.tags,
      link: item.link,
      featured: item.featured,
      order: item.order_index
    }));
  } catch (error) {
    console.error('Error fetching portfolio:', error);
    const portfolio = localStorage.getItem(CMS_PORTFOLIO_KEY);
    return portfolio ? JSON.parse(portfolio) : getDefaultPortfolio();
  }
};

export const updatePortfolio = async (portfolio: PortfolioItem[]): Promise<void> => {
  if (!isSupabaseAvailable()) {
    localStorage.setItem(CMS_PORTFOLIO_KEY, JSON.stringify(portfolio));
    return;
  }

  try {
    // Delete all existing portfolio items
    await supabase.from('portfolio').delete().neq('id', '00000000-0000-0000-0000-000000000000');

    // Insert new portfolio items
    const { error } = await supabase
      .from('portfolio')
      .insert(portfolio.map(item => ({
        id: item.id,
        title: item.title,
        category: item.category,
        description: item.description,
        image_url: item.imageUrl,
        tags: item.tags,
        link: item.link,
        featured: item.featured,
        order_index: item.order,
        updated_at: new Date().toISOString()
      })));

    if (error) throw error;
  } catch (error) {
    console.error('Error updating portfolio:', error);
    localStorage.setItem(CMS_PORTFOLIO_KEY, JSON.stringify(portfolio));
  }
};

// Partners management
export const getPartners = async (): Promise<PartnerItem[]> => {
  if (!isSupabaseAvailable()) {
    const partners = localStorage.getItem(CMS_PARTNERS_KEY);
    return partners ? JSON.parse(partners) : getDefaultPartners();
  }

  try {
    const { data, error } = await supabase
      .from('partners')
      .select('*')
      .order('order_index', { ascending: true });

    if (error) throw error;

    return data.map(item => ({
      id: item.id,
      name: item.name,
      logo: item.logo,
      description: item.description,
      website: item.website,
      category: item.category,
      order: item.order_index
    }));
  } catch (error) {
    console.error('Error fetching partners:', error);
    const partners = localStorage.getItem(CMS_PARTNERS_KEY);
    return partners ? JSON.parse(partners) : getDefaultPartners();
  }
};

export const updatePartners = async (partners: PartnerItem[]): Promise<void> => {
  if (!isSupabaseAvailable()) {
    localStorage.setItem(CMS_PARTNERS_KEY, JSON.stringify(partners));
    return;
  }

  try {
    // Delete all existing partners
    await supabase.from('partners').delete().neq('id', '00000000-0000-0000-0000-000000000000');

    // Insert new partners
    const { error } = await supabase
      .from('partners')
      .insert(partners.map(partner => ({
        id: partner.id,
        name: partner.name,
        logo: partner.logo,
        description: partner.description,
        website: partner.website,
        category: partner.category,
        order_index: partner.order,
        updated_at: new Date().toISOString()
      })));

    if (error) throw error;
  } catch (error) {
    console.error('Error updating partners:', error);
    localStorage.setItem(CMS_PARTNERS_KEY, JSON.stringify(partners));
  }
};

// Contact management
export const getContactInfo = async (): Promise<ContactInfo> => {
  if (!isSupabaseAvailable()) {
    const contact = localStorage.getItem(CMS_CONTACT_KEY);
    return contact ? JSON.parse(contact) : getDefaultContact();
  }

  try {
    const { data, error } = await supabase
      .from('contact_info')
      .select('*')
      .limit(1)
      .single();

    if (error && error.code !== 'PGRST116') throw error;

    if (!data) {
      return getDefaultContact();
    }

    return {
      id: data.id,
      address: data.address,
      phone: data.phone,
      email: data.email,
      businessHours: data.business_hours,
      socialLinks: data.social_links
    };
  } catch (error) {
    console.error('Error fetching contact info:', error);
    const contact = localStorage.getItem(CMS_CONTACT_KEY);
    return contact ? JSON.parse(contact) : getDefaultContact();
  }
};

export const updateContactInfo = async (contact: ContactInfo): Promise<void> => {
  if (!isSupabaseAvailable()) {
    localStorage.setItem(CMS_CONTACT_KEY, JSON.stringify(contact));
    return;
  }

  try {
    const { error } = await supabase
      .from('contact_info')
      .upsert({
        id: contact.id,
        address: contact.address,
        phone: contact.phone,
        email: contact.email,
        business_hours: contact.businessHours,
        social_links: contact.socialLinks,
        updated_at: new Date().toISOString()
      });

    if (error) throw error;
  } catch (error) {
    console.error('Error updating contact info:', error);
    localStorage.setItem(CMS_CONTACT_KEY, JSON.stringify(contact));
  }
};

// Form submissions management
export const getFormSubmissions = async (): Promise<FormSubmission[]> => {
  if (!isSupabaseAvailable()) {
    const forms = localStorage.getItem(CMS_FORMS_KEY);
    return forms ? JSON.parse(forms) : [];
  }

  try {
    const { data, error } = await supabase
      .from('form_submissions')
      .select('*')
      .order('submitted_at', { ascending: false });

    if (error) throw error;

    return data.map(item => ({
      id: item.id,
      name: item.name,
      email: item.email,
      phone: item.phone,
      subject: item.subject,
      message: item.message,
      submittedAt: item.submitted_at,
      status: item.status,
      notes: item.notes
    }));
  } catch (error) {
    console.error('Error fetching form submissions:', error);
    const forms = localStorage.getItem(CMS_FORMS_KEY);
    return forms ? JSON.parse(forms) : [];
  }
};

export const addFormSubmission = async (submission: Omit<FormSubmission, 'id' | 'submittedAt' | 'status'>): Promise<void> => {
  if (!isSupabaseAvailable()) {
    const submissions = await getFormSubmissions();
    const newSubmission: FormSubmission = {
      ...submission,
      id: Date.now().toString(),
      submittedAt: new Date().toISOString(),
      status: 'new'
    };
    submissions.unshift(newSubmission);
    localStorage.setItem(CMS_FORMS_KEY, JSON.stringify(submissions));
    return;
  }

  try {
    const { error } = await supabase
      .from('form_submissions')
      .insert({
        name: submission.name,
        email: submission.email,
        phone: submission.phone,
        subject: submission.subject,
        message: submission.message,
        status: 'new'
      });

    if (error) throw error;
  } catch (error) {
    console.error('Error adding form submission:', error);
    // Fallback to localStorage
    const submissions = await getFormSubmissions();
    const newSubmission: FormSubmission = {
      ...submission,
      id: Date.now().toString(),
      submittedAt: new Date().toISOString(),
      status: 'new'
    };
    submissions.unshift(newSubmission);
    localStorage.setItem(CMS_FORMS_KEY, JSON.stringify(submissions));
  }
};

export const updateFormSubmission = async (id: string, updates: Partial<FormSubmission>): Promise<void> => {
  if (!isSupabaseAvailable()) {
    const submissions = await getFormSubmissions();
    const index = submissions.findIndex(sub => sub.id === id);
    if (index >= 0) {
      submissions[index] = { ...submissions[index], ...updates };
      localStorage.setItem(CMS_FORMS_KEY, JSON.stringify(submissions));
    }
    return;
  }

  try {
    const { error } = await supabase
      .from('form_submissions')
      .update({
        status: updates.status,
        notes: updates.notes,
        updated_at: new Date().toISOString()
      })
      .eq('id', id);

    if (error) throw error;
  } catch (error) {
    console.error('Error updating form submission:', error);
    // Fallback to localStorage
    const submissions = await getFormSubmissions();
    const index = submissions.findIndex(sub => sub.id === id);
    if (index >= 0) {
      submissions[index] = { ...submissions[index], ...updates };
      localStorage.setItem(CMS_FORMS_KEY, JSON.stringify(submissions));
    }
  }
};

// Initialize default content in localStorage (fallback)
const initializeLocalStorage = () => {
  if (!localStorage.getItem(CMS_STORAGE_KEY)) {
    localStorage.setItem(CMS_STORAGE_KEY, JSON.stringify(getDefaultContent()));
  }
  if (!localStorage.getItem(CMS_SERVICES_KEY)) {
    localStorage.setItem(CMS_SERVICES_KEY, JSON.stringify(getDefaultServices()));
  }
  if (!localStorage.getItem(CMS_PORTFOLIO_KEY)) {
    localStorage.setItem(CMS_PORTFOLIO_KEY, JSON.stringify(getDefaultPortfolio()));
  }
  if (!localStorage.getItem(CMS_PARTNERS_KEY)) {
    localStorage.setItem(CMS_PARTNERS_KEY, JSON.stringify(getDefaultPartners()));
  }
  if (!localStorage.getItem(CMS_CONTACT_KEY)) {
    localStorage.setItem(CMS_CONTACT_KEY, JSON.stringify(getDefaultContact()));
  }
  if (!localStorage.getItem(CMS_FORMS_KEY)) {
    localStorage.setItem(CMS_FORMS_KEY, JSON.stringify([]));
  }
};

// Initialize on module load
initializeLocalStorage();