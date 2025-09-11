import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Database {
  public: {
    Tables: {
      cms_content: {
        Row: {
          id: string;
          type: string;
          key: string;
          value: any;
          last_modified: string;
          modified_by: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          type?: string;
          key: string;
          value: any;
          last_modified?: string;
          modified_by?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          type?: string;
          key?: string;
          value?: any;
          last_modified?: string;
          modified_by?: string;
          created_at?: string;
        };
      };
      services: {
        Row: {
          id: string;
          icon: string;
          title: string;
          description: string;
          features: string[];
          category: string;
          order_index: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          icon?: string;
          title: string;
          description: string;
          features?: string[];
          category?: string;
          order_index?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          icon?: string;
          title?: string;
          description?: string;
          features?: string[];
          category?: string;
          order_index?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      portfolio: {
        Row: {
          id: string;
          title: string;
          category: string;
          description: string;
          image_url: string;
          tags: string[];
          link: string | null;
          featured: boolean;
          order_index: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          category: string;
          description: string;
          image_url: string;
          tags?: string[];
          link?: string;
          featured?: boolean;
          order_index?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          category?: string;
          description?: string;
          image_url?: string;
          tags?: string[];
          link?: string;
          featured?: boolean;
          order_index?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      partners: {
        Row: {
          id: string;
          name: string;
          logo: string;
          description: string;
          website: string | null;
          category: string;
          order_index: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          logo: string;
          description: string;
          website?: string;
          category: string;
          order_index?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          logo?: string;
          description?: string;
          website?: string;
          category?: string;
          order_index?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      contact_info: {
        Row: {
          id: string;
          address: string;
          phone: string[];
          email: string[];
          business_hours: string[];
          social_links: Record<string, string>;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          address: string;
          phone?: string[];
          email?: string[];
          business_hours?: string[];
          social_links?: Record<string, string>;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          address?: string;
          phone?: string[];
          email?: string[];
          business_hours?: string[];
          social_links?: Record<string, string>;
          created_at?: string;
          updated_at?: string;
        };
      };
      form_submissions: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string | null;
          subject: string | null;
          message: string;
          status: 'new' | 'read' | 'replied' | 'archived';
          notes: string | null;
          submitted_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          phone?: string;
          subject?: string;
          message: string;
          status?: 'new' | 'read' | 'replied' | 'archived';
          notes?: string;
          submitted_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          phone?: string;
          subject?: string;
          message?: string;
          status?: 'new' | 'read' | 'replied' | 'archived';
          notes?: string;
          submitted_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}