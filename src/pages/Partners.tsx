import React from 'react';
import { useCMS } from '../components/cms/CMSProvider';
import { EditableText } from '../components/cms/EditableText';
import SEO from '../components/SEO';
import { GradientButton } from '../components/common/GradientButton';
import { SectionHeader } from '../components/common/SectionHeader';

const Partners: React.FC = () => {
  const { partners } = useCMS();

  return (
    <>
      <SEO 
        title="Our Partners - Naya Digital"
        description="Discover our trusted partners and strategic alliances that help us deliver exceptional digital solutions."
      />
      
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <EditableText
            id="partners-hero-title"
            defaultValue="Our Strategic Partners"
            className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent"
            tag="h1"
          />
          <EditableText
            id="partners-hero-subtitle"
            defaultValue="Building success through powerful partnerships and collaborative innovation"
            className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed"
            tag="p"
          />
        </div>
      </section>

      {/* Partners Grid */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader
            title="Trusted Partners"
            subtitle="We collaborate with industry leaders to deliver exceptional results"
            className="mb-16"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {partners.map((partner, index) => (
              <div
                key={partner.id}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-purple-200"
              >
                <div className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl font-bold text-white">
                      {partner.name.charAt(0)}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
                    {partner.name}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {partner.description}
                  </p>
                  <div className="flex items-center text-sm text-purple-600 font-medium">
                    <span>Learn More</span>
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Benefits */}
      <section className="py-20 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <EditableText
              id="partnership-benefits-title"
              defaultValue="Why Partner With Us?"
              className="text-4xl md:text-5xl font-bold mb-6"
              tag="h2"
            />
            <EditableText
              id="partnership-benefits-subtitle"
              defaultValue="Discover the advantages of strategic collaboration"
              className="text-xl text-gray-200 max-w-3xl mx-auto"
              tag="p"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Accelerated Growth</h3>
              <p className="text-gray-200">Leverage our expertise to accelerate your digital transformation journey.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Expert Network</h3>
              <p className="text-gray-200">Access our network of industry experts and cutting-edge technologies.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Proven Success</h3>
              <p className="text-gray-200">Join our track record of successful partnerships and delivered results.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <EditableText
            id="partnership-cta-title"
            defaultValue="Ready to Partner With Us?"
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            tag="h2"
          />
          <EditableText
            id="partnership-cta-description"
            defaultValue="Let's explore how we can work together to achieve extraordinary results and drive mutual success."
            className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed"
            tag="p"
          />
          <GradientButton
            href="/contact"
            size="lg"
            className="inline-flex items-center space-x-2"
          >
            <span>Start Partnership Discussion</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </GradientButton>
        </div>
      </section>
    </>
  );
};

export default Partners;