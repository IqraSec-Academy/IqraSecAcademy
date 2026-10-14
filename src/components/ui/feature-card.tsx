'use client';

import React from 'react';
import { motion } from 'framer-motion';

export interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
  index?: number;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon: Icon,
  index = 0,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: index * 0.1, ease: 'easeOut' }}
      className="group relative flex flex-col h-full rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-blue-400/80 hover:shadow-lg hover:shadow-blue-500/5"
    >
      {/* Icon Container */}
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50/80 text-blue-600 border border-blue-200/60 transition-colors duration-300 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 shadow-xs">
        <Icon className="h-6 w-6 transition-transform duration-300 group-hover:scale-105" />
      </div>

      {/* Title */}
      <h3 className="font-heading text-lg font-bold text-slate-900 mb-2 transition-colors group-hover:text-blue-600">
        {title}
      </h3>

      {/* Description */}
      <p className="font-body text-xs sm:text-sm text-slate-600 leading-relaxed flex-1">
        {description}
      </p>
    </motion.div>
  );
};
