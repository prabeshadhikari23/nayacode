import { ArrowRight, CheckCircle, Users, Code, Shield, Lightbulb, Target, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import NayaPageLayout from "@/components/NayaPageLayout";
import SEO from "@/components/SEO";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const NayaHomepage = () => {
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

  const services = [
    { icon: Code, title: "Software Development", href: "/services#software" },
    { icon: Shield, title: "IT Security", href: "/services#security" },
    { icon: Target, title: "Digital Marketing", href: "/services#marketing" },
    { icon: Users, title: "UI/UX Design", href: "/services#design" },
    { icon: Lightbulb, title: "Business Process Reengineering", href: "/services#bpr" },
    { icon: Award, title: "Data Analysis", href: "/services#data" },
    { icon: CheckCircle, title: "Corporate Training", href: "/services#training" },
    { icon: Code, title: "Consultation", href: "/services#consultation" }
  ];

  const processSteps = [
    { title: "Consultation", description: "Understanding your requirements" },
    { title: "Planning", description: "Strategic roadmap development" },
    { title: "Development", description: "Building your solution" },
    { title: "Implementation", description: "Deploying to production" },
    { title: "Support", description: "Ongoing maintenance & support" }
  ];

  const coreValues = [
    { icon: Lightbulb, title: "Innovation", description: "Cutting-edge solutions" },
    { icon: CheckCircle, title: "Integrity", description: "Honest and transparent" },
    { icon: Users, title: "Partnership", description: "Collaborative approach" },
    { icon: Award, title: "Excellence", description: "Quality in everything" }
  ];

  return (
    <NayaPageLayout>
      <SEO 
        title="Naya Code Pvt. Ltd. - IT Solutions Company in Nepal"
        description="Transforming challenges into digital opportunities. Your partner for innovative, scalable, and secure IT solutions in Nepal and beyond."
        keywords={["IT solutions Nepal", "software development Kathmandu", "digital transformation Nepal"]}
      />
      
      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-naya-blue via-blue-600 to-blue-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 container mx-auto px-4 py-20 flex items-center min-h-screen">
          <motion.div 
            className="max-w-4xl"
            initial="initial"
            animate="animate"
            variants={stagger}
          >
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
              variants={fadeInUp}
            >
              Transforming Challenges into{" "}
              <span className="text-yellow-300">Digital Opportunities</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl"
              variants={fadeInUp}
            >
              Your partner for innovative, scalable, and secure IT solutions in Nepal and beyond.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              variants={fadeInUp}
            >
              <Link to="/contact">
                <Button size="lg" className="bg-naya-red hover:bg-red-600 text-white px-8 py-4 text-lg">
                  Start Your Project
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/services">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-naya-blue px-8 py-4 text-lg">
                  Explore Services
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial="initial"
            whileInView="animate"
            variants={fadeInUp}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-naya-blue mb-4">Our Core Philosophy</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We believe in creating digital solutions that not only solve problems but also drive innovation and growth.
            </p>
          </motion.div>
          
          <motion.div 
            className="grid md:grid-cols-4 gap-8"
            initial="initial"
            whileInView="animate"
            variants={stagger}
            viewport={{ once: true }}
          >
            {coreValues.map((value, index) => (
              <motion.div 
                key={index}
                className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
                variants={fadeInUp}
              >
                <value.icon className="w-12 h-12 text-naya-blue mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial="initial"
            whileInView="animate"
            variants={fadeInUp}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-naya-blue mb-4">Our Services</h2>
            <p className="text-xl text-gray-600">Comprehensive IT solutions tailored to your business needs</p>
          </motion.div>
          
          <motion.div 
            className="grid md:grid-cols-4 gap-6"
            initial="initial"
            whileInView="animate"
            variants={stagger}
            viewport={{ once: true }}
          >
            {services.map((service, index) => (
              <motion.div 
                key={index}
                variants={fadeInUp}
              >
                <Link 
                  to={service.href}
                  className="block p-6 bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-all hover:border-naya-blue group"
                >
                  <service.icon className="w-10 h-10 text-naya-blue mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold text-gray-800 group-hover:text-naya-blue transition-colors">
                    {service.title}
                  </h3>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Our Approach Timeline */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial="initial"
            whileInView="animate"
            variants={fadeInUp}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-naya-blue mb-4">Our Approach</h2>
            <p className="text-xl text-gray-600">A proven methodology for successful project delivery</p>
          </motion.div>
          
          <motion.div 
            className="relative"
            initial="initial"
            whileInView="animate"
            variants={stagger}
            viewport={{ once: true }}
          >
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-naya-blue transform -translate-y-1/2"></div>
            
            <div className="grid md:grid-cols-5 gap-8 relative">
              {processSteps.map((step, index) => (
                <motion.div 
                  key={index}
                  className="text-center relative"
                  variants={fadeInUp}
                >
                  <div className="w-16 h-16 bg-naya-blue text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold relative z-10">
                    {index + 1}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial="initial"
            whileInView="animate"
            variants={fadeInUp}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-naya-blue mb-8">Trusted By</h2>
            <div className="flex justify-center items-center space-x-12 opacity-60">
              <div className="w-32 h-16 bg-gray-200 rounded flex items-center justify-center">
                <span className="text-gray-500 font-medium">Partner 1</span>
              </div>
              <div className="w-32 h-16 bg-gray-200 rounded flex items-center justify-center">
                <span className="text-gray-500 font-medium">Your Logo Here</span>
              </div>
              <div className="w-32 h-16 bg-gray-200 rounded flex items-center justify-center">
                <span className="text-gray-500 font-medium">Partner 3</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-naya-blue text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial="initial"
            whileInView="animate"
            variants={fadeInUp}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4">Ready to discuss your project?</h2>
            <p className="text-xl mb-8 text-blue-100">
              Let's transform your ideas into powerful digital solutions.
            </p>
            <Link to="/contact">
              <Button size="lg" className="bg-naya-red hover:bg-red-600 text-white px-8 py-4 text-lg">
                Contact Us Today
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </NayaPageLayout>
  );
};

export default NayaHomepage;