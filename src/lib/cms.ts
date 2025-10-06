import { CMSContent, ServiceItem, PortfolioItem, PartnerItem, ContactInfo, FormSubmission } from '@/types/cms';

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
  const content = localStorage.getItem(CMS_STORAGE_KEY);
  return content ? JSON.parse(content) : getDefaultContent();
};

export const updateCMSContent = async (key: string, value: any): Promise<void> => {
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
};

export const getCMSContentByKey = async (key: string): Promise<string> => {
  const content = await getCMSContent();
  const item = content.find(item => item.key === key);
  return item?.value || '';
};

// Services management
export const getServices = async (): Promise<ServiceItem[]> => {
  const services = localStorage.getItem(CMS_SERVICES_KEY);
  return services ? JSON.parse(services) : getDefaultServices();
};

export const updateServices = async (services: ServiceItem[]): Promise<void> => {
  localStorage.setItem(CMS_SERVICES_KEY, JSON.stringify(services));
};

// Portfolio management
export const getPortfolio = async (): Promise<PortfolioItem[]> => {
  const portfolio = localStorage.getItem(CMS_PORTFOLIO_KEY);
  return portfolio ? JSON.parse(portfolio) : getDefaultPortfolio();
};

export const updatePortfolio = async (portfolio: PortfolioItem[]): Promise<void> => {
  localStorage.setItem(CMS_PORTFOLIO_KEY, JSON.stringify(portfolio));
};

// Partners management
export const getPartners = async (): Promise<PartnerItem[]> => {
  const partners = localStorage.getItem(CMS_PARTNERS_KEY);
  return partners ? JSON.parse(partners) : getDefaultPartners();
};

export const updatePartners = async (partners: PartnerItem[]): Promise<void> => {
  localStorage.setItem(CMS_PARTNERS_KEY, JSON.stringify(partners));
};

// Contact management
export const getContactInfo = async (): Promise<ContactInfo> => {
  const contact = localStorage.getItem(CMS_CONTACT_KEY);
  return contact ? JSON.parse(contact) : getDefaultContact();
};

export const updateContactInfo = async (contact: ContactInfo): Promise<void> => {
  localStorage.setItem(CMS_CONTACT_KEY, JSON.stringify(contact));
};

// Form submissions management
export const getFormSubmissions = async (): Promise<FormSubmission[]> => {
  const forms = localStorage.getItem(CMS_FORMS_KEY);
  return forms ? JSON.parse(forms) : [];
};

export const addFormSubmission = async (submission: Omit<FormSubmission, 'id' | 'submittedAt' | 'status'>): Promise<void> => {
  const submissions = await getFormSubmissions();
  const newSubmission: FormSubmission = {
    ...submission,
    id: Date.now().toString(),
    submittedAt: new Date().toISOString(),
    status: 'new'
  };
  submissions.unshift(newSubmission);
  localStorage.setItem(CMS_FORMS_KEY, JSON.stringify(submissions));
};

export const updateFormSubmission = async (id: string, updates: Partial<FormSubmission>): Promise<void> => {
  const submissions = await getFormSubmissions();
  const index = submissions.findIndex(sub => sub.id === id);
  if (index >= 0) {
    submissions[index] = { ...submissions[index], ...updates };
    localStorage.setItem(CMS_FORMS_KEY, JSON.stringify(submissions));
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