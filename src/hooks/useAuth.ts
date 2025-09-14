import { useState, useEffect, createContext, useContext } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { authService, AuthUser, AuthState } from '@/lib/auth';

interface AuthContextType extends AuthState {
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, userData?: any) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updatePassword: (newPassword: string) => Promise<void>;
  hasRole: (role: 'admin' | 'editor' | 'user') => boolean;
  isAdmin: boolean;
  isEditor: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const useAuthState = (): AuthState => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      
      if (session?.user) {
        const authUser = await authService.getCurrentUser();
        setUser(authUser);
      }
      
      setLoading(false);
    };

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        
        if (session?.user) {
          const authUser = await authService.getCurrentUser();
          setUser(authUser);
        } else {
          setUser(null);
        }
        
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  return { user, session, loading };
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, session, loading } = useAuthState();

  const signIn = async (email: string, password: string) => {
    await authService.signIn(email, password);
  };

  const signUp = async (email: string, password: string, userData?: any) => {
    await authService.signUp(email, password, userData);
  };

  const signOut = async () => {
    await authService.signOut();
  };

  const resetPassword = async (email: string) => {
    await authService.resetPassword(email);
  };

  const updatePassword = async (newPassword: string) => {
    await authService.updatePassword(newPassword);
  };

  const hasRole = (role: 'admin' | 'editor' | 'user') => {
    if (!user) return false;
    
    switch (role) {
      case 'admin':
        return user.role === 'admin';
      case 'editor':
        return user.role === 'admin' || user.role === 'editor';
      case 'user':
        return true; // All authenticated users have user role
      default:
        return false;
    }
  };

  const isAdmin = hasRole('admin');
  const isEditor = hasRole('editor');

  const value: AuthContextType = {
    user,
    session,
    loading,
    signIn,
    signUp,
    signOut,
    resetPassword,
    updatePassword,
    hasRole,
    isAdmin,
    isEditor
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};