import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import { EditableText } from "@/components/cms/EditableText";

const NayaFooter = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Products", path: "/products" },
    { name: "Partners", path: "/partners" },
    { name: "Contact", path: "/contact" }
  ];

  const services = [
    { name: "Software Development", path: "/services#software" },
    { name: "IT Security", path: "/services#security" },
    { name: "Digital Marketing", path: "/services#marketing" },
    { name: "UI/UX Design", path: "/services#design" }
  ];

  const socialLinks = [
    { icon: Facebook, href: "https://facebook.com/nayacode", label: "Facebook" },
    { icon: Twitter, href: "https://twitter.com/nayacode", label: "Twitter" },
    { icon: Linkedin, href: "https://linkedin.com/company/nayacode", label: "LinkedIn" },
    { icon: Instagram, href: "https://instagram.com/nayacode", label: "Instagram" }
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
                <img 
                  src={`${import.meta.env.BASE_URL}logo-grayscale-inverted.svg`}
                  alt="Company Logo" 
                  className="h-10 w-auto" 
                />
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed">
              <EditableText 
                contentKey="footer.description"
                defaultValue="Transforming challenges into digital opportunities. We are your trusted partner for innovative, scalable, and secure IT solutions in Nepal and beyond."
                as="span"
                className="text-gray-300"
                multiline
              />
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-gray-400 hover:text-white transition-colors p-2 rounded-full ${
                    index === 0 ? 'hover:bg-vibrant-purple' :
                    index === 1 ? 'hover:bg-vibrant-cyan' :
                    index === 2 ? 'hover:bg-vibrant-pink' :
                    'hover:bg-vibrant-orange'
                  }`}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              {services.map((service, index) => (
                <li key={index}>
                  <Link
                    to={service.path}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-gray-300">
                  <p>Dillibazar-30</p>
                  <p>Kathmandu, Nepal</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-gray-400 flex-shrink-0" />
                <div className="text-sm text-gray-300">
                  <a href="tel:+97714548052" className="hover:text-white transition-colors block">
                    +977 14548052
                  </a>
                  <a href="tel:+977970511455" className="hover:text-white transition-colors block">
                    +977 970511455
                  </a>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gray-400 flex-shrink-0" />
                <a
                  href="mailto:info@nayacode.com.np"
                  className="text-sm text-gray-300 hover:text-white transition-colors"
                >
                  info@nayacode.com.np
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-400">
              © {currentYear} Naya Code Pvt. Ltd. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm text-gray-400">
              <Link to="/privacy-policy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default NayaFooter;