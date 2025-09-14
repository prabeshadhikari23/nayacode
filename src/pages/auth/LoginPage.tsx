import React from 'react';
import { LoginForm } from '@/components/auth/LoginForm';
import SEO from '@/components/SEO';

const LoginPage: React.FC = () => {
  return (
    <>
      <SEO 
        title="Login - Naya Code CMS"
        description="Sign in to access the Naya Code Content Management System"
      />
      <LoginForm />
    </>
  );
};

export default LoginPage;