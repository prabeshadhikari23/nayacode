import React from 'react';
import { CMSAdmin } from '@/components/cms/CMSAdmin';
import SEO from '@/components/SEO';

const CMSAdminPage = () => {
  return (
    <>
      <SEO 
        title="CMS Admin - Naya Code"
        description="Content Management System for Naya Code website"
      />
      <CMSAdmin />
    </>
  );
};

export default CMSAdminPage;