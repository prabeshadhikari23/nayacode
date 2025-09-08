
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import FireCatProject from "./pages/FireCatProject";
import SportRetailProject from "./pages/SportRetailProject";
import WorkwearProject from "./pages/WorkwearProject";
import HockeyProject from "./pages/HockeyProject";
import PetProject from "./pages/PetProject";
import TechDetails from "./pages/TechDetails";
import DevelopmentProcess from "./pages/DevelopmentProcess";
import About from "./pages/About";
import Careers from "./pages/Careers";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Blog from "./pages/Blog";
import BlogPostDetail from "./pages/BlogPostDetail";
import NayaHomepage from "./pages/NayaHomepage";
import Services from "./pages/Services";
import Products from "./pages/Products";
import Partners from "./pages/Partners";
import Contact from "./pages/Contact";
import { CMSProvider } from "./components/cms/CMSProvider";
import { CMSEditButton } from "./components/cms/CMSEditButton";
import CMSAdminPage from "./pages/CMSAdminPage";

const App = () => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <CMSProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Naya Code Routes */}
              <Route path="/" element={<NayaHomepage />} />
              <Route path="/services" element={<Services />} />
              <Route path="/products" element={<Products />} />
              <Route path="/partners" element={<Partners />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/admin/cms" element={<CMSAdminPage />} />
              
              {/* Legacy Routes */}
              <Route path="/wrlds" element={<Index />} />
              <Route path="/projects/firecat" element={<FireCatProject />} />
              <Route path="/projects/sport-retail" element={<SportRetailProject />} />
              <Route path="/projects/workwear" element={<WorkwearProject />} />
              <Route path="/projects/hockey" element={<HockeyProject />} />
              <Route path="/projects/pet-tracker" element={<PetProject />} />
              <Route path="/tech-details" element={<TechDetails />} />
              <Route path="/development-process" element={<DevelopmentProcess />} />
              <Route path="/about" element={<About />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPostDetail />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <CMSEditButton />
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </CMSProvider>
  );
};

export default App;
