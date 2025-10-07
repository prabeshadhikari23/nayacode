import { supabase } from '@/integrations/supabase/client';
import {
  CMSContent,
  ServiceItem,
  PortfolioItem,
  PartnerItem,
  ContactInfo,
  FormSubmission
} from '@/types/cms';

export const getCMSContent = async (): Promise<CMSContent[]> => {
  const { data, error } = await supabase
    .from('cms_content')
    .select('*')
    .order('key');
  
  if (error) throw error;
  return data || [];
};

export const getCMSContentByKey = async (key: string): Promise<string> => {
  const { data, error } = await supabase
    .from('cms_content')
    .select('value')
    .eq('key', key)
    .maybeSingle();

  if (error) return '';
  return data?.value || '';
};

export const updateCMSContent = async (key: string, value: string): Promise<void> => {
  const { error } = await supabase
    .from('cms_content')
    .upsert({ key, value, type: 'text' }, { onConflict: 'key' });
  
  if (error) throw error;
};

// Services management
export const getServices = async (): Promise<ServiceItem[]> => {
  const { data, error } = await supabase
    .from('cms_services')
    .select('*')
    .order('display_order');
  
  if (error) throw error;
  return data || [];
};

export const updateServices = async (services: ServiceItem[]): Promise<void> => {
  const { error } = await supabase
    .from('cms_services')
    .upsert(services);
  
  if (error) throw error;
};

export const deleteService = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('cms_services')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
};

// Portfolio management
export const getPortfolio = async (): Promise<PortfolioItem[]> => {
  const { data, error } = await supabase
    .from('cms_portfolio')
    .select('*')
    .order('display_order');
  
  if (error) throw error;
  return data || [];
};

export const updatePortfolio = async (items: PortfolioItem[]): Promise<void> => {
  const { error } = await supabase
    .from('cms_portfolio')
    .upsert(items);
  
  if (error) throw error;
};

export const deletePortfolio = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('cms_portfolio')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
};

// Partners management
export const getPartners = async (): Promise<PartnerItem[]> => {
  const { data, error } = await supabase
    .from('cms_partners')
    .select('*')
    .order('display_order');
  
  if (error) throw error;
  return data || [];
};

export const updatePartners = async (partners: PartnerItem[]): Promise<void> => {
  const { error } = await supabase
    .from('cms_partners')
    .upsert(partners);
  
  if (error) throw error;
};

export const deletePartner = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('cms_partners')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
};

// Contact management
export const getContactInfo = async (): Promise<ContactInfo | null> => {
  const { data, error } = await supabase
    .from('cms_contact')
    .select('*')
    .limit(1)
    .maybeSingle();

  if (error) return null;
  return data;
};

export const updateContactInfo = async (contact: Partial<ContactInfo>): Promise<void> => {
  const existing = await getContactInfo();
  
  if (existing) {
    const { error } = await supabase
      .from('cms_contact')
      .update(contact)
      .eq('id', existing.id);
    
    if (error) throw error;
  } else {
    const { error } = await supabase
      .from('cms_contact')
      .insert(contact);
    
    if (error) throw error;
  }
};

// Form submissions
export const getFormSubmissions = async (): Promise<FormSubmission[]> => {
  const { data, error } = await supabase
    .from('form_submissions')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data || [];
};

export const addFormSubmission = async (
  submission: Omit<FormSubmission, 'id' | 'created_at' | 'updated_at' | 'status' | 'notes'>
): Promise<void> => {
  const { error } = await supabase
    .from('form_submissions')
    .insert({ ...submission, status: 'new' });
  
  if (error) throw error;
};

export const updateFormSubmission = async (id: string, updates: Partial<FormSubmission>): Promise<void> => {
  const { error } = await supabase
    .from('form_submissions')
    .update(updates)
    .eq('id', id);
  
  if (error) throw error;
};
