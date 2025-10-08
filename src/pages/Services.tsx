import { Code, Shield, Target, Users, Lightbulb, Award, BookOpen, MessageCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import NayaPageLayout from "@/components/NayaPageLayout";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Services = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const services = [
    {
      id: "bpr",
      icon: Lightbulb,
      title: "Business Process Reengineering",
      description: "We analyze and redesign your workflows to eliminate inefficiencies and boost productivity. Our systematic approach helps organizations streamline operations, reduce costs, and improve overall performance.",
      features: ["Process Analysis", "Workflow Optimization", "Efficiency Enhancement", "Cost Reduction"]
    },
    {
      id: "data",
      icon: Award,
      title: "Data Analysis",
      description: "Turn your raw data into actionable insights and powerful visualizations for smarter decision-making. We help you unlock the value hidden in your data through advanced analytics and reporting.",
      features: ["Data Visualization", "Business Intelligence", "Predictive Analytics", "Custom Reports"]
    },
    {
      id: "security",
      icon: Shield,
      title: "IT Security",
      description: "Protect your critical assets with comprehensive security audits, strategy, and implementation. Our security experts ensure your systems are resilient against modern cyber threats.",
      features: ["Security Audits", "Threat Assessment", "Implementation", "Monitoring & Response"]
    },
    {
      id: "design",
      icon: Users,
      title: "UI/UX Design and Branding",
      description: "Create intuitive and beautiful user experiences that strengthen your brand and engage your customers. Our design team crafts compelling digital experiences that drive user satisfaction.",
      features: ["User Research", "Interface Design", "Brand Identity", "Prototyping"]
    },
    {
      id: "marketing",
      icon: Target,
      title: "Digital Marketing",
      description: "Increase your online visibility and generate leads with targeted SEO, SEM, and social media strategies. Our marketing experts help you reach your audience effectively.",
      features: ["SEO Optimization", "Social Media Marketing", "Content Strategy", "Lead Generation"]
    },
    {
      id: "software",
      icon: Code,
      title: "Software Development",
      description: "Custom web and mobile applications built with robust architectures and scalable technologies. We deliver high-quality software solutions tailored to your specific business needs.",
      features: ["Web Applications", "Mobile Apps", "API Development", "Cloud Solutions"]
    },
    {
      id: "training",
      icon: BookOpen,
      title: "Corporate Training",
      description: "Upskill your team with tailored training programs on the latest technologies and methodologies. Our expert trainers provide hands-on learning experiences.",
      features: ["Technology Training", "Skill Development", "Custom Curricula", "Certification Programs"]
    },
    {
      id: "consultation",
      icon: MessageCircle,
      title: "IT Consultation",
      description: "Strategic IT guidance to help you make informed technology decisions. Our consultants provide expert advice on digital transformation and technology adoption.",
      features: ["Strategic Planning", "Technology Assessment", "Digital Transformation", "IT Roadmaps"]
    }
  ];

  return (
    <NayaPageLayout>
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-vibrant-purple via-vibrant-pink to-vibrant-orange text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial="initial"
            animate="animate"
            variants={fadeInUp}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Services</h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              Comprehensive IT solutions designed to drive your business forward with innovation and expertise.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-12">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                id={service.id}
                className={`grid md:grid-cols-2 gap-8 items-center ${
                  index % 2 === 1 ? 'md:flex-row-reverse' : ''
                }`}
                initial="initial"
                whileInView="animate"
                variants={fadeInUp}
                viewport={{ once: true }}
              >
                <div className={`${index % 2 === 1 ? 'md:order-2' : ''}`}>
                  <div className={`bg-white p-8 rounded-lg shadow-lg border-l-4 ${
                    index % 4 === 0 ? 'border-vibrant-purple' :
                    index % 4 === 1 ? 'border-vibrant-cyan' :
                    index % 4 === 2 ? 'border-vibrant-orange' :
                    'border-vibrant-emerald'
                  }`}>
                    <div className={`w-16 h-16 mb-6 rounded-lg flex items-center justify-center ${
                      index % 4 === 0 ? 'bg-gradient-to-br from-purple-100 to-purple-200 text-vibrant-purple' :
                      index % 4 === 1 ? 'bg-gradient-to-br from-cyan-100 to-cyan-200 text-vibrant-cyan' :
                      index % 4 === 2 ? 'bg-gradient-to-br from-orange-100 to-orange-200 text-vibrant-orange' :
                      'bg-gradient-to-br from-emerald-100 to-emerald-200 text-vibrant-emerald'
                    }`}>
                      {/* Icon would be rendered here based on service.icon */}
                      <Code className="w-8 h-8" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">{service.title}</h2>
                    <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                    
                    <div className="grid grid-cols-2 gap-3">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center">
                          <div className={`w-2 h-2 rounded-full mr-3 ${
                            index % 4 === 0 ? 'bg-vibrant-purple' :
                            index % 4 === 1 ? 'bg-vibrant-cyan' :
                            index % 4 === 2 ? 'bg-vibrant-orange' :
                            'bg-vibrant-emerald'
                          }`}></div>
                          <span className="text-sm text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className={`${index % 2 === 1 ? 'md:order-1' : ''}`}>
                  <div className={`h-64 rounded-lg flex items-center justify-center ${
                    index % 4 === 0 ? 'bg-gradient-to-br from-purple-100 via-purple-200 to-pink-200' :
                    index % 4 === 1 ? 'bg-gradient-to-br from-cyan-100 via-cyan-200 to-blue-200' :
                    index % 4 === 2 ? 'bg-gradient-to-br from-orange-100 via-orange-200 to-yellow-200' :
                    'bg-gradient-to-br from-emerald-100 via-emerald-200 to-green-200'
                  }`}>
                    <Code className={`w-24 h-24 ${
                      index % 4 === 0 ? 'text-vibrant-purple' :
                      index % 4 === 1 ? 'text-vibrant-cyan' :
                      index % 4 === 2 ? 'text-vibrant-orange' :
                      'text-vibrant-emerald'
                    }`} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial="initial"
            whileInView="animate"
            variants={fadeInUp}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-naya-blue mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Let's discuss how our services can help transform your business and achieve your goals.
            </p>
            <Link to="/contact">
              <Button size="lg" className="bg-gradient-to-r from-vibrant-pink to-vibrant-rose hover:from-vibrant-rose hover:to-vibrant-red text-white px-8 py-4 text-lg shadow-lg">
                Discuss Your Needs
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </NayaPageLayout>
  );
};

export default Services;