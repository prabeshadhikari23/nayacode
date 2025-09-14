import React from 'react';
import { RegisterForm } from '@/components/auth/RegisterForm';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import SEO from '@/components/SEO';

const RegisterPage: React.FC = () => {
  return (
    <ProtectedRoute requiredRole="admin">
      <SEO 
        title="Register User - Naya Code CMS"
        description="Create a new user account for the CMS"
      />
      <RegisterForm />
    </ProtectedRoute>
  );
};

export default RegisterPage;