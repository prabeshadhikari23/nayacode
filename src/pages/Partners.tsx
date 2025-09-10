import React from 'react';
import { useCMS } from '@/components/cms/CMSProvider';
import { EditableText } from '@/components/cms/EditableText';
import SEO from '../components/SEO';
import { GradientButton } from '@/components/common/GradientButton';
import { SectionHeader } from '@/components/common/SectionHeader';
import NayaPageLayout from '@/components/NayaPageLayout';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Partners: React.FC = () => {
  const { partners } = useCMS();

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

  return (
    <NayaPageLayout>
      <SEO 
        title="Our Partners - Naya Code Pvt. Ltd."
        description="Discover our trusted partners and strategic alliances that help us deliver exceptional digital solutions."
        keywords={["partners Nepal", "strategic alliances", "technology partnerships", "business collaboration"]}
      />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-vibrant-purple via-vibrant-pink to-vibrant-orange text-white py-20">
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
                defaultValue="Building success through powerful partnerships and collaborative innovation."
                as="span"
                className="text-blue-100"
              />
            </p>
          </motion.div>
        </div>
      </section>

      {/* Partners Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial="initial"
            whileInView="animate"
            variants={fadeInUp}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold bg-gradient-to-r from-vibrant-purple to-vibrant-pink bg-clip-text text-transparent mb-4">
              <EditableText 
                contentKey="partners.section.title"
                defaultValue="Trusted Partners"
                as="span"
                className="bg-gradient-to-r from-vibrant-purple to-vibrant-pink bg-clip-text text-transparent"
              />
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              <EditableText 
                contentKey="partners.section.subtitle"
                defaultValue="We collaborate with industry leaders to deliver exceptional results"
                as="span"
                className="text-gray-600"
              />
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="initial"
            whileInView="animate"
            variants={stagger}
            viewport={{ once: true }}
          >
            {partners.map((partner, index) => (
              <motion.div
                key={partner.id}
                className={`group bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border-l-4 hover:scale-105 ${
                  index % 4 === 0 ? 'border-vibrant-purple' :
                  index % 4 === 1 ? 'border-vibrant-cyan' :
                  index % 4 === 2 ? 'border-vibrant-orange' :
                  'border-vibrant-emerald'
                }`}
                variants={fadeInUp}
              >
                <div className="p-6">
                  <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 ${
                    index % 4 === 0 ? 'bg-gradient-to-br from-purple-100 to-purple-200' :
                    index % 4 === 1 ? 'bg-gradient-to-br from-cyan-100 to-cyan-200' :
                    index % 4 === 2 ? 'bg-gradient-to-br from-orange-100 to-orange-200' :
                    'bg-gradient-to-br from-emerald-100 to-emerald-200'
                  }`}>
                    <span className="text-2xl font-bold text-white">
                      {partner.name.charAt(0)}
                    </span>
                  </div>
                  <h3 className={`text-xl font-bold text-gray-900 mb-3 transition-colors ${
                    index % 4 === 0 ? 'group-hover:text-vibrant-purple' :
                    index % 4 === 1 ? 'group-hover:text-vibrant-cyan' :
                    index % 4 === 2 ? 'group-hover:text-vibrant-orange' :
                    'group-hover:text-vibrant-emerald'
                  }`}>
                    {partner.name}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {partner.description}
                  </p>
                  <div className={`flex items-center text-sm font-medium ${
                    index % 4 === 0 ? 'text-vibrant-purple' :
                    index % 4 === 1 ? 'text-vibrant-cyan' :
                    index % 4 === 2 ? 'text-vibrant-orange' :
                    'text-vibrant-emerald'
                  }`}>
                    <span>Learn More</span>
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Partnership Benefits */}
      <section className="py-20 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial="initial"
            whileInView="animate"
            variants={fadeInUp}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold bg-gradient-to-r from-vibrant-indigo to-vibrant-pink bg-clip-text text-transparent mb-4">
              <EditableText 
                contentKey="partners.benefits.title"
                defaultValue="Why Partner With Us?"
                as="span"
                className="bg-gradient-to-r from-vibrant-indigo to-vibrant-pink bg-clip-text text-transparent"
              />
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              <EditableText 
                contentKey="partners.benefits.subtitle"
                defaultValue="Discover the advantages of strategic collaboration"
                as="span"
                className="text-gray-600"
              />
            </p>
          </div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial="initial"
            whileInView="animate"
            variants={stagger}
            viewport={{ once: true }}
          >
            <motion.div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all" variants={fadeInUp}>
              <div className="w-16 h-16 bg-gradient-to-br from-vibrant-purple to-vibrant-pink rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">Accelerated Growth</h3>
              <p className="text-gray-600">Leverage our expertise to accelerate your digital transformation journey.</p>
            </motion.div>

            <motion.div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all" variants={fadeInUp}>
              <div className="w-16 h-16 bg-gradient-to-br from-vibrant-cyan to-vibrant-blue rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">Expert Network</h3>
              <p className="text-gray-600">Access our network of industry experts and cutting-edge technologies.</p>
            </motion.div>

            <motion.div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all" variants={fadeInUp}>
              <div className="w-16 h-16 bg-gradient-to-br from-vibrant-orange to-vibrant-red rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">Proven Success</h3>
              <p className="text-gray-600">Join our track record of successful partnerships and delivered results.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 via-cyan-50 to-blue-50">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial="initial"
            whileInView="animate"
            variants={fadeInUp}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold bg-gradient-to-r from-vibrant-emerald to-vibrant-cyan bg-clip-text text-transparent mb-4">
              <EditableText 
                contentKey="partners.cta.title"
                defaultValue="Ready to Partner With Us?"
                as="span"
                className="bg-gradient-to-r from-vibrant-emerald to-vibrant-cyan bg-clip-text text-transparent"
              />
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              <EditableText 
                contentKey="partners.cta.subtitle"
                defaultValue="Let's explore how we can work together to achieve extraordinary results and drive mutual success."
                as="span"
                className="text-gray-600"
              />
            </p>
            <Link to="/contact">
              <GradientButton size="lg" gradient="success" className="px-8 py-4 text-lg">
                Start Partnership Discussion
                <ArrowRight className="ml-2 w-5 h-5" />
              </GradientButton>
            </Link>
          </motion.div>
        </div>
      </section>
    </NayaPageLayout>
  );
};

export default Partners;