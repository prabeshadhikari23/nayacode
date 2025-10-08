import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  titleKey: string;
  subtitleKey?: string;
  className?: string;
  centered?: boolean;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  titleKey,
  subtitleKey,
  className = '',
  centered = true
}) => {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <motion.div
      className={`mb-16 ${centered ? 'text-center' : ''} ${className}`}
      initial="initial"
      whileInView="animate"
      variants={fadeInUp}
      viewport={{ once: true }}
    >
      <h2 className="text-4xl font-bold bg-gradient-to-r from-vibrant-purple to-vibrant-pink bg-clip-text text-transparent mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};