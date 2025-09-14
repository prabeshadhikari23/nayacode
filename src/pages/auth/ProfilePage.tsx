import React from 'react';
import { UserProfile } from '@/components/auth/UserProfile';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import SEO from '@/components/SEO';

const ProfilePage: React.FC = () => {
  return (
    <ProtectedRoute>
      <SEO 
        title="Profile - Naya Code CMS"
        description="Manage your user profile and settings"
      />
      <UserProfile />
    </ProtectedRoute>
  );
};

export default ProfilePage;