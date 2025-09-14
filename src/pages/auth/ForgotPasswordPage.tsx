import React from 'react';
import { ForgotPasswordForm } from '@/components/auth/ForgotPasswordForm';
import SEO from '@/components/SEO';

const ForgotPasswordPage: React.FC = () => {
  return (
    <>
      <SEO 
        title="Forgot Password - Naya Code CMS"
        description="Reset your password for the Naya Code CMS"
      />
      <ForgotPasswordForm />
    </>
  );
};

export default ForgotPasswordPage;