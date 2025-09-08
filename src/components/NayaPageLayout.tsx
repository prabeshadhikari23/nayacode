import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NayaNavbar from '@/components/NayaNavbar';
import NayaFooter from '@/components/NayaFooter';

type NayaPageLayoutProps = {
  children: React.ReactNode;
};

const NayaPageLayout = ({ children }: NayaPageLayoutProps) => {
  const location = useLocation();

  // Effect to scroll to top when route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="min-h-screen bg-white w-full max-w-[100vw] overflow-x-hidden">
      <NayaNavbar />
      <main className="pt-16">
        {children}
      </main>
      <NayaFooter />
    </div>
  );
};

export default NayaPageLayout;