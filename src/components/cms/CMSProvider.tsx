import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCMSContent, getServices, getPortfolio, getPartners, getContactInfo, getFormSubmissions } from '@/lib/cms';
import { CMSContent, ServiceItem, PortfolioItem, PartnerItem, ContactInfo, FormSubmission } from '@/types/cms';

interface CMSContextType {
  content: CMSContent[];
  services: ServiceItem[];
  portfolio: PortfolioItem[];
  partners: PartnerItem[];
  contact: ContactInfo;
  formSubmissions: FormSubmission[];
  isEditMode: boolean;
  setEditMode: (mode: boolean) => void;
  refreshData: () => void;
}

const CMSContext = createContext<CMSContextType | null>(null);

export const useCMS = () => {
  const context = useContext(CMSContext);
  if (!context) {
    throw new Error('useCMS must be used within CMSProvider');
  }
  return context;
};

export const CMSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<CMSContent[]>([]);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [partners, setPartners] = useState<PartnerItem[]>([]);
  const [contact, setContact] = useState<ContactInfo>({} as ContactInfo);
  const [formSubmissions, setFormSubmissions] = useState<FormSubmission[]>([]);
  const [isEditMode, setEditMode] = useState(false);

  const refreshData = () => {
    setContent(getCMSContent());
    setServices(getServices());
    setPortfolio(getPortfolio());
    setPartners(getPartners());
    setContact(getContactInfo());
    setFormSubmissions(getFormSubmissions());
  };

  useEffect(() => {
    refreshData();
  }, []);

  return (
    <CMSContext.Provider value={{
      content,
      services,
      portfolio,
      partners,
      contact,
      formSubmissions,
      isEditMode,
      setEditMode,
      refreshData
    }}>
      {children}
    </CMSContext.Provider>
  );
};