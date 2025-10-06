import { MapPin, Phone, Mail, Clock, Send, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import NayaPageLayout from "@/components/NayaPageLayout";
import SEO from "@/components/SEO";
import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";
import { EditableText } from "@/components/cms/EditableText";
import { SectionHeader } from "@/components/common/SectionHeader";
import { GradientButton } from "@/components/common/GradientButton";
import { addFormSubmission } from "@/lib/cms";
import { useFormValidation } from "@/hooks/useFormValidation";
import { contactFormSchema, ContactFormData } from "@/utils/validation";

const Contact = () => {
  const initialFormData: ContactFormData = {
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  };

  const {
    values: formData,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit: handleFormSubmit,
    reset
  } = useFormValidation(contactFormSchema, initialFormData);

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

  const contactInfo = [
    {
      icon: MapPin,
      title: "Our Office",
      details: ["Dillibazar-30", "Kathmandu, Nepal"],
      link: "https://maps.google.com/?q=Dillibazar,Kathmandu"
    },
    {
      icon: Phone,
      title: "Phone Numbers",
      details: ["+977 14548052", "+977 970511455"],
      link: "tel:+97714548052"
    },
    {
      icon: Mail,
      title: "Email Address",
      details: ["info@nayacode.com.np"],
      link: "mailto:info@nayacode.com.np"
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: ["Monday - Friday: 9:00 AM - 6:00 PM", "Saturday: 10:00 AM - 4:00 PM"],
      link: null
    }
  ];

  const handleSubmit = async (data: ContactFormData) => {
    try {
      // Save to CMS
      await addFormSubmission({
        name: data.name,
        email: data.email,
        phone: data.phone,
        subject: data.subject,
        message: data.message
      });
      
      toast.success("Thank you for your message! We'll get back to you soon.");
      reset();
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    }
  };

  return (
    <NayaPageLayout>
      <SEO 
        title="Contact Us - Naya Code Pvt. Ltd."
        description="Get in touch with Naya Code for IT solutions and consultations. Located in Dillibazar, Kathmandu, Nepal. Call us at +977 14548052."
        keywords={["contact Naya Code", "IT company Kathmandu", "Dillibazar office", "Nepal IT services"]}
      />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-vibrant-purple via-vibrant-pink to-vibrant-orange text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial="initial"
            animate="animate"
            variants={fadeInUp}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              <EditableText 
                contentKey="contact.hero.subtitle"
                defaultValue="Ready to transform your business with innovative IT solutions? Let's start the conversation."
                as="span"
                className="text-blue-100"
              />
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="initial"
            whileInView="animate"
            variants={stagger}
            viewport={{ once: true }}
          >
            {contactInfo.map((info, index) => (
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
                <info.icon className={`w-12 h-12 mx-auto mb-4 ${
                  index === 0 ? 'text-vibrant-purple' :
                  index === 1 ? 'text-vibrant-cyan' :
                  index === 2 ? 'text-vibrant-orange' :
                  'text-vibrant-emerald'
                }`} />
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{info.title}</h3>
                <div className="space-y-1">
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-gray-600">
                      {info.link && idx === 0 ? (
                        <a href={info.link} className="hover:text-naya-blue transition-colors">
                          {detail}
                        </a>
                      ) : (
                        detail
                      )}
                    </p>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Form and Map */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial="initial"
              whileInView="animate"
              variants={fadeInUp}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-naya-blue mb-6">Send Us a Message</h2>
              <p className="text-gray-600 mb-8">
                Fill out the form below and we'll get back to you within 24 hours.
              </p>
              
              <form onSubmit={(e) => {
                e.preventDefault();
                handleFormSubmit(handleSubmit);
              }} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      required
                      className={`mt-1 ${errors.name ? 'border-red-500' : ''}`}
                      placeholder="Your full name"
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      required
                      className={`mt-1 ${errors.email ? 'border-red-500' : ''}`}
                      placeholder="your.email@example.com"
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Phone (Optional)</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone || ''}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      className={`mt-1 ${errors.phone ? 'border-red-500' : ''}`}
                      placeholder="+977 9800000000"
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                  </div>
                  <div>
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      type="text"
                      value={formData.subject}
                      onChange={(e) => handleChange('subject', e.target.value)}
                      required
                      className={`mt-1 ${errors.subject ? 'border-red-500' : ''}`}
                      placeholder="How can we help you?"
                    />
                    {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    required
                    className={`mt-1 min-h-[120px] ${errors.message ? 'border-red-500' : ''}`}
                    placeholder="Tell us about your project or requirements..."
                  />
                  {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                </div>
                
                {/* Google reCAPTCHA placeholder */}
                <div className="bg-gray-100 border border-gray-300 rounded p-4 text-center text-gray-600">
                  <p className="text-sm">reCAPTCHA verification will be implemented here</p>
                </div>
                
                <GradientButton
                  type="submit" 
                  gradient="primary"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  <Send className="w-5 h-5 mr-2" />
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </GradientButton>
              </form>
            </motion.div>

            {/* Map and Additional Info */}
            <motion.div
              initial="initial"
              whileInView="animate"
              variants={fadeInUp}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {/* Interactive Map Placeholder */}
              <div>
                <h3 className="text-2xl font-bold text-naya-blue mb-4">Find Us</h3>
                <div className="bg-gray-200 h-64 rounded-lg overflow-hidden">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d883.1014012062387!2d85.3299626!3d27.7047604!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb193ca2a435cb%3A0x57f1f628d8a5c5b!2sNaya%20Code%20Pvt.%20Ltd.!5e0!3m2!1sen!2snp!4v1757659369402!5m2!1sen!2snp" 
                    width="100%" 
                    height="100%" 
                    style={{border:0}} 
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Naya Code Location"
                  ></iframe>
                </div>
              </div>

              {/* Quick Contact */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold bg-gradient-to-r from-vibrant-purple to-vibrant-pink bg-clip-text text-transparent mb-4">Prefer to Talk?</h3>
                <p className="text-gray-600 mb-4">
                  Sometimes it's easier to discuss your project over the phone. Our team is ready to help.
                </p>
                <div className="space-y-3">
                  <a
                    href="tel:+97714548052"
                    className="flex items-center text-vibrant-purple hover:text-purple-700 transition-colors"
                  >
                    <Phone className="w-5 h-5 mr-3" />
                    +977 14548052
                  </a>
                  <a
                    href="tel:+977970511455"
                    className="flex items-center text-vibrant-cyan hover:text-cyan-700 transition-colors"
                  >
                    <Phone className="w-5 h-5 mr-3" />
                    +977 970511455
                  </a>
                  <a
                    href="mailto:info@nayacode.com.np"
                    className="flex items-center text-vibrant-orange hover:text-orange-700 transition-colors"
                  >
                    <Mail className="w-5 h-5 mr-3" />
                    info@nayacode.com.np
                  </a>
                </div>
              </div>

              {/* Response Time */}
              <div className="bg-gradient-to-br from-vibrant-indigo to-vibrant-purple text-white p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-2">Quick Response Guarantee</h3>
                <p className="text-blue-100">
                  We respond to all inquiries within 24 hours during business days. 
                  For urgent matters, please call us directly.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial="initial"
            whileInView="animate"
            variants={fadeInUp}
            viewport={{ once: true }}
          >
           <h2 className="text-4xl font-bold bg-gradient-to-r from-vibrant-purple to-vibrant-pink bg-clip-text text-transparent mb-4">
             <EditableText 
               contentKey="contact.cta.title"
               defaultValue="Ready to Start Your Project?"
               as="span"
               className="bg-gradient-to-r from-vibrant-purple to-vibrant-pink bg-clip-text text-transparent"
             />
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
             <EditableText 
               contentKey="contact.cta.subtitle"
               defaultValue="Let's discuss how we can help transform your business with innovative technology solutions."
               as="span"
               className="text-gray-600"
             />
            </p>
           <GradientButton size="lg" gradient="primary" className="px-8 py-4 text-lg">
              Schedule a Consultation
              <ArrowRight className="ml-2 w-5 h-5" />
            </GradientButton>
          </motion.div>
        </div>
      </section>
    </NayaPageLayout>
  );
};

export default Contact;