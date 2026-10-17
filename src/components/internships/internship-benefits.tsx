'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Award, Gift, DollarSign, BookOpen, Users, FolderCheck, CheckCircle2 } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

export const internshipBenefitsList = [
  {
    icon: ShieldCheck,
    title: 'Hands-On Cybersecurity Learning',
    description: 'Learn practical real-world cybersecurity concepts through guided exercises and structured methodology.',
    highlight: false,
  },
  {
    icon: FolderCheck,
    title: 'Practical Tasks & Projects',
    description: 'Work on actual security assessments and scripting workflows to sharpen your technical capabilities.',
    highlight: false,
  },
  {
    icon: Users,
    title: 'Mentorship & Guidance',
    description: 'Receive structured feedback, continuous assistance, and direction throughout the internship duration.',
    highlight: false,
  },
  {
    icon: BookOpen,
    title: 'Portfolio-Building Opportunities',
    description: 'Demonstrate your skills with practical security reports and code repositories to boost your career portfolio.',
    highlight: false,
  },
  {
    icon: Gift,
    title: 'Premium Learning Resources',
    description: 'Exclusive access to advanced cybersecurity resources and materials for eligible top performers.',
    highlight: true,
    badgeText: 'Top Performers',
  },
  {
    icon: Award,
    title: 'Free Verifiable Certificate',
    description: 'Eligible top performers who complete the program receive an official certificate of completion with unique QR verification.',
    highlight: true,
    badgeText: 'Top Performers',
  },
  {
    icon: DollarSign,
    title: 'Stipend Opportunities',
    description: 'Stipends are awarded separately to selected top performers based on performance and program criteria.',
    highlight: true,
    badgeText: 'Selected Top Performers',
  },
];

export const InternshipBenefits: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-white relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16 space-y-3">
          <div className="inline-flex justify-center">
            <Badge variant="blue" className="px-3.5 py-1 text-xs uppercase tracking-widest font-bold">
              PROGRAM ADVANTAGES
            </Badge>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Why Join The <span className="tech-gradient-text">IqraSec Internship</span>?
          </h2>
          <p className="font-body text-base sm:text-lg text-slate-600 leading-relaxed">
            Designed to bridge the gap between theoretical knowledge and practical cybersecurity execution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {internshipBenefitsList.map((benefit, idx) => {
            const IconComponent = benefit.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
              >
                <Card
                  className={`p-6 h-full transition-all duration-300 flex flex-col justify-between ${
                    benefit.highlight
                      ? 'border-blue-300 bg-linear-to-b from-blue-50/50 to-white shadow-md hover:shadow-lg hover:border-blue-400'
                      : 'border-slate-200/80 hover:border-blue-300 hover:shadow-md'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <div className={`h-11 w-11 rounded-xl flex items-center justify-center ${
                        benefit.highlight
                          ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                          : 'bg-blue-50 text-blue-600 border border-blue-100'
                      }`}>
                        <IconComponent className="h-5 w-5" />
                      </div>
                      {benefit.highlight && benefit.badgeText && (
                        <Badge variant="blue" className="px-2.5 py-0.5 text-[11px] font-bold bg-blue-100 text-blue-800 border-blue-200">
                          {benefit.badgeText}
                        </Badge>
                      )}
                    </div>
                    <h3 className="font-heading text-lg font-bold text-slate-900 mb-2">
                      {benefit.title}
                    </h3>
                    <p className="font-body text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs font-semibold text-blue-600">
                    <CheckCircle2 className="h-3.5 w-3.5 text-blue-600" />
                    <span>Included in Internship</span>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
