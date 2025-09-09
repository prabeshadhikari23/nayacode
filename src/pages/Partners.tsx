import React from 'react';
import SEO from '../components/SEO';
import NayaPageLayout from '@/components/NayaPageLayout';
import { SectionHeader } from '@/components/common/SectionHeader';
import { motion } from 'framer-motion';
import { useCMS } from '@/components/cms/CMSProvider';
import { EditableText } from '@/components/cms/EditableText';

export default function Partners() {
  const cmsData = useCMS();
  const partners = cmsData?.partners || [];

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
        description="Meet our trusted partners who help us deliver exceptional IT solutions and services in Nepal and beyond."
        keywords={["partners", "collaborations", "IT partnerships Nepal", "technology alliances"]}
      />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-vibrant-purple via-vibrant-pink to-vibrant-orange text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 text-center">
          <motion.div
            initial="initial"
            animate="animate"
            variants={fadeInUp}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <EditableText
                contentKey="partners.hero.title"
                defaultValue="Our Trusted Partners"
                as="span"
                className="text-white"
              />
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              <EditableText
                contentKey="partners.hero.subtitle"
                defaultValue="We collaborate with industry leaders to deliver exceptional results for our clients"
                as="span"
                className="text-blue-100"
              />
            </p>
          </motion.div>
        </div>
      </section>

      {/* Partners Grid */}
      <section className="py-20 bg-gradient-to-br from-cyan-50 via-purple-50 to-pink-50">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Strategic Partnerships"
            subtitle="Building strong relationships with leading companies to enhance our service offerings"
            titleKey="partners.section.title"
            subtitleKey="partners.section.subtitle"
          />

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="initial"
            whileInView="animate"
            variants={stagger}
            viewport={{ once: true }}
          >
            {partners.length > 0 ? (
              partners.map((partner, index) => (
                <motion.div
                  key={partner.id}
                  className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border-l-4 group hover:scale-105 ${
                    index % 4 === 0 ? 'border-vibrant-purple' :
                    index % 4 === 1 ? 'border-vibrant-cyan' :
                    index % 4 === 2 ? 'border-vibrant-orange' :
                    'border-vibrant-emerald'
                  }`}
                  variants={fadeInUp}
                >
                  <div className="text-center">
                    <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center text-white text-2xl font-bold group-hover:scale-110 transition-transform duration-300 ${
                      index % 4 === 0 ? 'bg-gradient-to-br from-vibrant-purple to-vibrant-pink' :
                      index % 4 === 1 ? 'bg-gradient-to-br from-vibrant-cyan to-vibrant-blue' :
                      index % 4 === 2 ? 'bg-gradient-to-br from-vibrant-orange to-vibrant-red' :
                      'bg-gradient-to-br from-vibrant-emerald to-vibrant-cyan'
                    }`}>
                      {partner.name.charAt(0)}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      <EditableText
                        contentKey={`partner.name.${partner.id}`}
                        defaultValue={partner.name}
                        as="span"
                        className="text-gray-900"
                      />
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      <EditableText
                        contentKey={`partner.description.${partner.id}`}
                        defaultValue={partner.description}
                        as="span"
                        className="text-gray-600"
                        multiline
                      />
                    </p>
                    {partner.website && (
                      <a
                        href={partner.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-block mt-4 font-medium transition-colors duration-200 ${
                          index % 4 === 0 ? 'text-vibrant-purple hover:text-purple-800' :
                          index % 4 === 1 ? 'text-vibrant-cyan hover:text-cyan-800' :
                          index % 4 === 2 ? 'text-vibrant-orange hover:text-orange-800' :
                          'text-vibrant-emerald hover:text-emerald-800'
                        }`}
                      >
                        Visit Website →
                      </a>
                    )}
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div 
                className="col-span-full text-center py-12"
                variants={fadeInUp}
              >
                <p className="text-gray-600 text-lg">No partners added yet. Use the CMS to add partner information.</p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Partnership Benefits */}
      <section className="py-20 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Why Partner With Us?"
            subtitle="Discover the advantages of building strategic partnerships with our team"
            titleKey="partners.benefits.title"
            subtitleKey="partners.benefits.subtitle"
          />

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="initial"
            whileInView="animate"
            variants={stagger}
            viewport={{ once: true }}
          >
            {[
              {
                title: "Mutual Growth",
                description: "Grow together through shared expertise and resources",
                icon: "📈",
                color: "vibrant-purple"
              },
              {
                title: "Innovation",
                description: "Drive innovation through collaborative solutions",
                icon: "💡",
                color: "vibrant-cyan"
              },
              {
                title: "Market Reach",
                description: "Expand market presence and customer base",
                icon: "🌍",
                color: "vibrant-orange"
              },
              {
                title: "Excellence",
                description: "Deliver exceptional value to all stakeholders",
                icon: "⭐",
                color: "vibrant-emerald"
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                className={`text-center p-6 rounded-2xl bg-white border-l-4 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 ${
                  index === 0 ? 'border-vibrant-purple' :
                  index === 1 ? 'border-vibrant-cyan' :
                  index === 2 ? 'border-vibrant-orange' :
                  'border-vibrant-emerald'
                }`}
                variants={fadeInUp}
              >
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-vibrant-orange via-vibrant-pink to-vibrant-purple text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial="initial"
            whileInView="animate"
            variants={fadeInUp}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">
              <EditableText
                contentKey="partners.cta.title"
                defaultValue="Ready to Partner With Us?"
                as="span"
                className="text-white"
              />
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              <EditableText
                contentKey="partners.cta.subtitle"
                defaultValue="Let's explore how we can work together to achieve mutual success"
                as="span"
                className="text-blue-100"
              />
            </p>
            <a
              href="/contact"
              className="inline-block bg-white text-vibrant-purple px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Get In Touch
            </a>
          </motion.div>
        </div>
      </section>
    </NayaPageLayout>
  );
}

                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Benefits */}
      <section className="py-20 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <EditableText
              id="partnership-benefits-title"
              defaultValue="Why Partner With Us?"
              className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent"
              tag="h2"
            />
            <EditableText
              id="partnership-benefits-description"
              defaultValue="Discover the advantages of building strategic partnerships with our team"
              className="text-lg text-purple-100 max-w-2xl mx-auto"
              tag="p"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Mutual Growth",
                description: "Grow together through shared expertise and resources",
                icon: "📈"
              },
              {
                title: "Innovation",
                description: "Drive innovation through collaborative solutions",
                icon: "💡"
              },
              {
                title: "Market Reach",
                description: "Expand market presence and customer base",
                icon: "🌍"
              },
              {
                title: "Excellence",
                description: "Deliver exceptional value to all stakeholders",
                icon: "⭐"
              }
            ].map((benefit, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-white">{benefit.title}</h3>
                <p className="text-purple-100">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <EditableText
            id="partnership-cta-title"
            defaultValue="Ready to Partner With Us?"
            className="text-3xl md:text-4xl font-bold text-white mb-6"
            tag="h2"
          />
          <EditableText
            id="partnership-cta-description"
            defaultValue="Let's explore how we can work together to achieve mutual success"
            className="text-lg text-white/90 mb-8 max-w-2xl mx-auto"
            tag="p"
          />
          <a
            href="/contact"
            className="inline-block bg-white text-purple-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Get In Touch
          </a>
        </div>
      </section>
    </>
  );
}