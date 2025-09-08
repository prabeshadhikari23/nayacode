import { Laptop, Smartphone, Cloud, Database, Globe, Shield, ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import NayaPageLayout from "@/components/NayaPageLayout";
import SEO from "@/components/SEO";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { EditableText } from "@/components/cms/EditableText";

const Products = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const products = [
    {
      icon: Globe,
      title: "NayaCRM",
      category: "Customer Relationship Management",
      description: "A comprehensive CRM solution designed for Nepali businesses with local language support and customizable workflows.",
      features: ["Lead Management", "Sales Pipeline", "Customer Analytics", "Nepali Language Support"],
      status: "Available",
      demo: true
    },
    {
      icon: Database,
      title: "DataSync Pro",
      category: "Data Management",
      description: "Advanced data synchronization and backup solution for businesses with multiple locations and remote teams.",
      features: ["Real-time Sync", "Cloud Backup", "Multi-location Support", "Security Encryption"],
      status: "Available",
      demo: true
    },
    {
      icon: Smartphone,
      title: "MobileFirst Framework",
      category: "Mobile Development",
      description: "A rapid mobile app development framework optimized for South Asian markets with offline-first capabilities.",
      features: ["Cross-platform", "Offline Support", "Local Payment Integration", "Regional Compliance"],
      status: "Coming Soon",
      demo: false
    },
    {
      icon: Shield,
      title: "SecureNet Suite",
      category: "Cybersecurity",
      description: "An integrated cybersecurity platform providing comprehensive protection for small to medium enterprises.",
      features: ["Threat Detection", "Network Monitoring", "Incident Response", "Compliance Reporting"],
      status: "Available",
      demo: true
    },
    {
      icon: Cloud,
      title: "CloudBridge",
      category: "Cloud Migration",
      description: "Simplified cloud migration and management platform designed for businesses transitioning to digital infrastructure.",
      features: ["Migration Planning", "Cost Optimization", "Performance Monitoring", "24/7 Support"],
      status: "Beta",
      demo: false
    },
    {
      icon: Laptop,
      title: "WorkFlow Automation",
      category: "Business Process",
      description: "Intelligent workflow automation platform that streamlines business processes and improves operational efficiency.",
      features: ["Process Designer", "Task Automation", "Integration APIs", "Analytics Dashboard"],
      status: "Available",
      demo: true
    }
  ];

  return (
    <NayaPageLayout>
      <SEO 
        title="Software Products - Naya Code Pvt. Ltd."
        description="Innovative software products and solutions developed by Naya Code. From CRM systems to cybersecurity suites, discover our technology offerings."
        keywords={["software products Nepal", "CRM software", "cybersecurity solutions", "business automation"]}
      />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-vibrant-indigo via-vibrant-purple to-vibrant-pink text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial="initial"
            animate="animate"
            variants={fadeInUp}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Products</h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              <EditableText 
                contentKey="products.hero.subtitle"
                defaultValue="Innovative software solutions designed to solve real business challenges and drive digital transformation."
                as="span"
                className="text-blue-100"
              />
            </p>
          </motion.div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="initial"
            whileInView="animate"
            variants={stagger}
            viewport={{ once: true }}
          >
            {products.map((product, index) => (
              <motion.div
                key={index}
                className={`bg-white rounded-lg shadow-lg border-l-4 overflow-hidden hover:shadow-xl transition-all hover:scale-105 ${
                  index % 4 === 0 ? 'border-vibrant-purple' :
                  index % 4 === 1 ? 'border-vibrant-cyan' :
                  index % 4 === 2 ? 'border-vibrant-orange' :
                  'border-vibrant-emerald'
                }`}
                variants={fadeInUp}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <product.icon className={`w-12 h-12 ${
                      index % 4 === 0 ? 'text-vibrant-purple' :
                      index % 4 === 1 ? 'text-vibrant-cyan' :
                      index % 4 === 2 ? 'text-vibrant-orange' :
                      'text-vibrant-emerald'
                    }`} />
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      product.status === 'Available' ? 'bg-green-100 text-green-800' :
                      product.status === 'Beta' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {product.status}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{product.title}</h3>
                  <p className="text-sm text-naya-blue font-medium mb-3">{product.category}</p>
                  <p className="text-gray-600 mb-4 leading-relaxed">{product.description}</p>
                  
                  <div className="space-y-2 mb-6">
                    {product.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center">
                        <div className="w-2 h-2 bg-naya-red rounded-full mr-3"></div>
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex gap-3">
                    {product.demo && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className={`flex-1 ${
                          index % 4 === 0 ? 'border-vibrant-purple text-vibrant-purple hover:bg-vibrant-purple' :
                          index % 4 === 1 ? 'border-vibrant-cyan text-vibrant-cyan hover:bg-vibrant-cyan' :
                          index % 4 === 2 ? 'border-vibrant-orange text-vibrant-orange hover:bg-vibrant-orange' :
                          'border-vibrant-emerald text-vibrant-emerald hover:bg-vibrant-emerald'
                        } hover:text-white`}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Demo
                      </Button>
                    )}
                    <Button 
                      size="sm" 
                      className="flex-1 bg-gradient-to-r from-vibrant-pink to-vibrant-rose hover:from-vibrant-rose hover:to-vibrant-red text-white"
                    >
                      Learn More
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Custom Development CTA */}
      <section className="py-20 bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial="initial"
            whileInView="animate"
            variants={fadeInUp}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-naya-blue mb-6">
              <EditableText 
                contentKey="products.custom.title"
                defaultValue="Need Something Custom?"
                as="span"
                className="bg-gradient-to-r from-vibrant-orange to-vibrant-red bg-clip-text text-transparent"
              />
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              <EditableText 
                contentKey="products.custom.subtitle"
                defaultValue="We specialize in developing custom software solutions tailored to your specific business requirements. From enterprise applications to specialized tools, we can build exactly what you need."
                as="span"
                className="text-gray-600"
                multiline
              />
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-vibrant-purple to-vibrant-pink text-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">1</span>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Consultation</h3>
                <p className="text-sm text-gray-600">We understand your requirements and challenges</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-vibrant-cyan to-vibrant-blue text-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">2</span>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Development</h3>
                <p className="text-sm text-gray-600">We build your custom solution with modern technologies</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-vibrant-orange to-vibrant-red text-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">3</span>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Support</h3>
                <p className="text-sm text-gray-600">Ongoing maintenance and feature enhancements</p>
              </div>
            </div>
            
            <Link to="/contact">
              <Button size="lg" className="bg-gradient-to-r from-vibrant-pink to-vibrant-rose hover:from-vibrant-rose hover:to-vibrant-red text-white px-8 py-4 text-lg shadow-lg">
                Start Your Custom Project
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </NayaPageLayout>
  );
};

export default Products;