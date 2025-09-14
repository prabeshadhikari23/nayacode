import { supabase } from './supabase';
import { User, Session } from '@supabase/supabase-js';

export interface AuthUser extends User {
  role?: 'admin' | 'editor' | 'user';
  profile?: {
    full_name?: string;
    avatar_url?: string;
  };
}

export interface AuthState {
  user: AuthUser | null;
  session: Session | null;
  loading: boolean;
}

// Auth service functions
export const authService = {
  // Sign up new user
  async signUp(email: string, password: string, userData?: { full_name?: string; role?: string }) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData
      }
    });
    
    if (error) throw error;
    return data;
  },

  // Sign in user
  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    
    if (error) throw error;
    return data;
  },

  // Sign out user
  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  // Get current user
  async getCurrentUser(): Promise<AuthUser | null> {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    
    if (!user) return null;

    // Get user profile with role
    const { data: profile } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    return {
      ...user,
      role: profile?.role || 'user',
      profile: profile
    };
  },

  // Update user profile
  async updateProfile(userId: string, updates: { full_name?: string; avatar_url?: string }) {
    const { data, error } = await supabase
      .from('user_profiles')
      .upsert({
        id: userId,
        ...updates,
        updated_at: new Date().toISOString()
      });
    
    if (error) throw error;
    return data;
  },

  // Check if user has admin access
  async hasAdminAccess(userId: string): Promise<boolean> {
    const { data } = await supabase
      .from('user_profiles')
      .select('role')
      .eq('id', userId)
      .single();
    
    return data?.role === 'admin';
  },

  // Reset password
  async resetPassword(email: string) {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`
    });
    
    if (error) throw error;
  },

  // Update password
  async updatePassword(newPassword: string) {
    const { error } = await supabase.auth.updateUser({
      password: newPassword
    });
    
    if (error) throw error;
  }
};