import { ExternalLink, Users, Handshake, Award, Target, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import NayaPageLayout from "@/components/NayaPageLayout";
import SEO from "@/components/SEO";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { EditableText } from "@/components/cms/EditableText";
import { useCMS } from "@/components/cms/CMSProvider";

const Partners = () => {
  const { partners: cmsPartners } = useCMS();
  
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

  const partners = [
    {
      name: "TechCorp International",
      category: "Technology Partner",
      description: "Leading provider of enterprise software solutions and cloud infrastructure services.",
      website: "https://techcorp.com",
      logo: "/api/placeholder/200/100",
      partnership: "Strategic Technology Alliance"
    },
    {
      name: "Digital Solutions Nepal",
      category: "Local Partner",
      description: "Premier digital marketing and e-commerce platform provider in Nepal.",
      website: "https://digitalsolutions.com.np",
      logo: "/api/placeholder/200/100",
      partnership: "Regional Collaboration"
    },
    {
      name: "SecureNet Systems",
      category: "Security Partner",
      description: "Cybersecurity specialists providing advanced threat protection and compliance solutions.",
      website: "https://securenet.com",
      logo: "/api/placeholder/200/100",
      partnership: "Security Solutions Alliance"
    },
    {
      name: "CloudFirst Technologies",
      category: "Cloud Partner",
      description: "Cloud infrastructure and DevOps specialists with expertise in scalable architectures.",
      website: "https://cloudfirst.com",
      logo: "/api/placeholder/200/100",
      partnership: "Cloud Services Partnership"
    },
    {
      name: "Innovation Hub Kathmandu",
      category: "Innovation Partner",
      description: "Technology incubator and startup accelerator fostering innovation in Nepal.",
      website: "https://innovationhub.com.np",
      logo: "/api/placeholder/200/100",
      partnership: "Innovation Ecosystem"
    },
    {
      name: "Global Software Alliance",
      category: "Development Partner",
      description: "International network of software development companies and technical experts.",
      website: "https://globalsoftware.com",
      logo: "/api/placeholder/200/100",
      partnership: "Development Alliance"
    }
  ];

  const partnershipBenefits = [
    {
      icon: Handshake,
      title: "Collaborative Growth",
      description: "Working together to create innovative solutions and expand market reach."
    },
    {
      icon: Award,
      title: "Excellence Standards",
      description: "Maintaining high-quality standards through shared expertise and best practices."
    },
    {
      icon: Target,
      title: "Strategic Alignment",
      description: "Aligning goals and resources to deliver maximum value to our clients."
    },
    {
      icon: Users,
      title: "Shared Expertise",
      description: "Combining diverse skills and knowledge to solve complex challenges."
    }
  ];

  return (
    <NayaPageLayout>
      <SEO 
        title="Partners - Naya Code Pvt. Ltd."
        description="Strategic partnerships and collaborations that help us deliver exceptional IT solutions. Meet our trusted partners and alliance network."
        keywords={["IT partnerships Nepal", "technology alliances", "strategic partners", "collaboration"]}
      />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-vibrant-cyan via-vibrant-indigo to-vibrant-purple text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial="initial"
            animate="animate"
            variants={fadeInUp}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Partners</h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              <EditableText 
                contentKey="partners.hero.subtitle"
                defaultValue="Strategic alliances that enable us to deliver comprehensive solutions and drive innovation together."
                as="span"
                className="text-blue-100"
              />
            </p>
          </motion.div>
        </div>
      </section>

      {/* Partnership Benefits */}
      <section className="py-20 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial="initial"
            whileInView="animate"
            variants={fadeInUp}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold bg-gradient-to-r from-vibrant-purple to-vibrant-orange bg-clip-text text-transparent mb-4">Partnership Philosophy</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              <EditableText 
                contentKey="partners.philosophy.description"
                defaultValue="We believe in the power of collaboration. Our partnerships enable us to provide comprehensive solutions and access to cutting-edge technologies."
                as="span"
                className="text-gray-600"
                multiline
              />
            </p>
          </motion.div>
          
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="initial"
            whileInView="animate"
            variants={stagger}
            viewport={{ once: true }}
          >
            {partnershipBenefits.map((benefit, index) => (
              <motion.div
                key={index}
                className={`text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all hover:scale-105 border-l-4 ${
                  index === 0 ? 'border-vibrant-purple' :
                  index === 1 ? 'border-vibrant-cyan' :
                  index === 2 ? 'border-vibrant-orange' :
                  'border-vibrant-emerald'
                }`}
                variants={fadeInUp}
              >
                <benefit.icon className={`w-12 h-12 mx-auto mb-4 ${
                  index === 0 ? 'text-vibrant-purple' :
                  index === 1 ? 'text-vibrant-cyan' :
                  index === 2 ? 'text-vibrant-orange' :
                  'text-vibrant-emerald'
                }`} />
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Partners Grid */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 via-cyan-50 to-blue-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial="initial"
            whileInView="animate"
            variants={fadeInUp}
            viewport={{ once: true }}
          >
           <h2 className="text-4xl font-bold bg-gradient-to-r from-vibrant-emerald to-vibrant-cyan bg-clip-text text-transparent mb-4">Meet Our Partners</h2>
            <p className="text-xl text-gray-600">
             <EditableText 
               contentKey="partners.grid.subtitle"
               defaultValue="Trusted organizations that help us deliver exceptional value to our clients."
               as="span"
               className="text-gray-600"
             />
            </p>
          </motion.div>
          
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="initial"
            whileInView="animate"
            variants={stagger}
            viewport={{ once: true }}
          >
            {(cmsPartners.length > 0 ? cmsPartners : partners).map((partner, index) => (
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
                <div className={`h-32 flex items-center justify-center ${
                  index % 4 === 0 ? 'bg-gradient-to-br from-purple-100 to-purple-200' :
                  index % 4 === 1 ? 'bg-gradient-to-br from-cyan-100 to-cyan-200' :
                  index % 4 === 2 ? 'bg-gradient-to-br from-orange-100 to-orange-200' :
                  'bg-gradient-to-br from-emerald-100 to-emerald-200'
                }`}>
                  <div className="w-40 h-20 bg-gray-200 rounded flex items-center justify-center">
                    <span className="text-gray-500 font-medium">{partner.name}</span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 bg-naya-blue/10 text-naya-blue rounded-full text-sm font-medium">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      index % 4 === 0 ? 'bg-purple-100 text-vibrant-purple' :
                      index % 4 === 1 ? 'bg-cyan-100 text-vibrant-cyan' :
                      index % 4 === 2 ? 'bg-orange-100 text-vibrant-orange' :
                      'bg-emerald-100 text-vibrant-emerald'
                    }`}>
                      {partner.category}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{partner.name}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{partner.description}</p>
                  
                  <div className="border-t pt-4">
                    <p className="text-sm text-naya-blue font-medium mb-3">{partner.partnership}</p>
                    <a
                      href={partner.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center text-sm text-gray-600 transition-colors ${
                        index % 4 === 0 ? 'hover:text-vibrant-purple' :
                        index % 4 === 1 ? 'hover:text-vibrant-cyan' :
                        index % 4 === 2 ? 'hover:text-vibrant-orange' :
                        'hover:text-vibrant-emerald'
                      }`}
                    >
                      Visit Website
                      <ExternalLink className="w-4 h-4 ml-1" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Partnership Opportunities */}
      <section className="py-20 bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial="initial"
            whileInView="animate"
            variants={fadeInUp}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-naya-blue mb-6">
              <EditableText 
                contentKey="partners.cta.title"
                defaultValue="Become Our Partner"
                as="span"
                className="bg-gradient-to-r from-vibrant-rose to-vibrant-purple bg-clip-text text-transparent"
              />
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              <EditableText 
                contentKey="partners.cta.subtitle"
                defaultValue="Are you interested in partnering with us? We're always looking for strategic alliances that can bring mutual value and innovation to the market."
                as="span"
                className="text-gray-600"
                multiline
              />
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="p-6 bg-white rounded-lg shadow-md border-l-4 border-vibrant-purple">
                <h3 className="font-semibold text-gray-800 mb-2">Technology Partners</h3>
                <p className="text-sm text-gray-600">Collaborate on innovative solutions and product development</p>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-md border-l-4 border-vibrant-cyan">
                <h3 className="font-semibold text-gray-800 mb-2">Channel Partners</h3>
                <p className="text-sm text-gray-600">Expand market reach and customer base together</p>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-md border-l-4 border-vibrant-orange">
                <h3 className="font-semibold text-gray-800 mb-2">Strategic Alliances</h3>
                <p className="text-sm text-gray-600">Long-term partnerships for mutual growth and success</p>
              </div>
            </div>
            
            <Link to="/contact">
              <Button size="lg" className="bg-gradient-to-r from-vibrant-pink to-vibrant-rose hover:from-vibrant-rose hover:to-vibrant-red text-white px-8 py-4 text-lg shadow-lg">
                Partner With Us
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </NayaPageLayout>
  );
};

export default Partners;