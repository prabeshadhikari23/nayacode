import React from 'react';
import SEO from '../components/SEO';
import { useCMS } from '../components/cms/CMSProvider';
import { EditableText } from '../components/cms/EditableText';

export default function Partners() {
  const { partners } = useCMS();

  return (
    <>
      <SEO 
        title="Our Partners" 
        description="Meet our trusted partners who help us deliver exceptional results"
      />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <EditableText
            id="partners-hero-title"
            defaultValue="Our Trusted Partners"
            className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent"
            tag="h1"
          />
          <EditableText
            id="partners-hero-subtitle"
            defaultValue="We collaborate with industry leaders to deliver exceptional results for our clients"
            className="text-xl md:text-2xl text-purple-100 max-w-3xl mx-auto"
            tag="p"
          />
        </div>
      </section>

      {/* Partners Grid */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <EditableText
              id="partners-section-title"
              defaultValue="Strategic Partnerships"
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
              tag="h2"
            />
            <EditableText
              id="partners-section-description"
              defaultValue="Building strong relationships with leading companies to enhance our service offerings"
              className="text-lg text-gray-600 max-w-2xl mx-auto"
              tag="p"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {partners.map((partner, index) => (
              <div
                key={partner.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border border-purple-100 hover:border-purple-300 group"
              >
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold group-hover:scale-110 transition-transform duration-300">
                    {partner.name.charAt(0)}
                  </div>
                  <EditableText
                    id={`partner-name-${partner.id}`}
                    defaultValue={partner.name}
                    className="text-xl font-bold text-gray-900 mb-3"
                    tag="h3"
                  />
                  <EditableText
                    id={`partner-description-${partner.id}`}
                    defaultValue={partner.description}
                    className="text-gray-600 leading-relaxed"
                    tag="p"
                  />
                  {partner.website && (
                    <a
                      href={partner.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-4 text-purple-600 hover:text-purple-800 font-medium transition-colors duration-200"
                    >
                      Visit Website →
                    </a>
                  )}
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