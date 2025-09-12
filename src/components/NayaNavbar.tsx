import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { EditableText } from "@/components/cms/EditableText";

const NayaNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Products", path: "/products" },
    { name: "Partners", path: "/partners" },
    { name: "Contact", path: "/contact" }
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-lg border-b-2 border-vibrant-purple' : 'bg-white/95 backdrop-blur-sm'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
         <Link to="/" className="flex items-center space-x-2">
                <img 
                  src="${process.env.PUBLIC_URL}/nayacode.svg"
                  alt="Company Logo" 
                  className="h-10 w-auto" 
                />
            </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`text-sm font-medium transition-colors hover:text-naya-blue ${
                  location.pathname === item.path 
                    ? 'text-vibrant-purple border-b-2 border-vibrant-purple pb-1' 
                    : 'text-gray-700'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="tel:+97714548052"
              className="flex items-center text-sm text-gray-600 hover:text-vibrant-purple transition-colors"
            >
              <Phone className="w-4 h-4 mr-1" />
              +977 14548052
            </a>
            <Link to="/contact">
              <Button className="bg-gradient-to-r from-vibrant-pink to-vibrant-rose hover:from-vibrant-rose hover:to-vibrant-red text-white shadow-lg">
                Get a Quote
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="h-6 w-6 text-gray-700" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            className="md:hidden bg-white border-t border-gray-200"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`block px-3 py-2 text-base font-medium transition-colors ${
                    location.pathname === item.path
                      ? 'text-vibrant-purple bg-purple-50'
                      : 'text-gray-700 hover:text-vibrant-purple hover:bg-purple-50'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <div className="px-3 py-2">
                <a
                  href="tel:+97714548052"
                  className="flex items-center text-sm text-gray-600 hover:text-vibrant-purple transition-colors mb-3"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  +977 14548052
                </a>
                <Link to="/contact">
                  <Button className="w-full bg-gradient-to-r from-vibrant-pink to-vibrant-rose hover:from-vibrant-rose hover:to-vibrant-red text-white">
                    Get a Quote
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default NayaNavbar;