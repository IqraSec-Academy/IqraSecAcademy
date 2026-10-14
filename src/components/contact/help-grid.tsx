'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Laptop, FileText, ShieldCheck, HelpCircle, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { routes } from '@/config/routes';

const helpTopics = [
  {
    title: 'Internship Information',
    description: 'Questions about available cybersecurity internship domains and programs.',
    icon: Laptop,
    action: {
      text: 'View Internships',
      href: routes.internships.root,
    },
  },
  {
    title: 'Application Questions',
    description: 'Need information about the internship application process?',
    icon: FileText,
  },
  {
    title: 'Certificate Verification',
    description: 'Need to verify an IqraSec Academy certificate?',
    icon: ShieldCheck,
    action: {
      text: 'Verify Certificate',
      href: routes.verify,
    },
  },
  {
    title: 'General Inquiries',
    description: 'Have another question about IqraSec Academy?',
    icon: HelpCircle,
  },
];

export const HelpGrid: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-slate-50/80 border-b border-slate-200/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16 space-y-4">
          <div className="inline-flex justify-center">
            <Badge variant="blue" className="px-3.5 py-1 text-xs uppercase tracking-widest font-bold">
              INQUIRY TOPICS
            </Badge>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            What Can We <span className="tech-gradient-text">Help You With?</span>
          </h2>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {helpTopics.map((topic, idx) => {
            const IconComp = topic.icon;
            return (
              <motion.div
                key={topic.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <Card className="p-6 sm:p-8 bg-white border-slate-200/90 shadow-2xs hover:shadow-md transition-all h-full flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="h-12 w-12 rounded-xl bg-blue-50 text-blue-600 border border-blue-200/80 flex items-center justify-center shrink-0">
                      <IconComp className="h-6 w-6" />
                    </div>

                    <h3 className="font-heading text-lg font-bold text-slate-900">
                      {topic.title}
                    </h3>

                    <p className="font-body text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {topic.description}
                    </p>
                  </div>

                  {topic.action && (
                    <div className="pt-6">
                      <Button
                        href={topic.action.href}
                        variant="outline"
                        size="sm"
                        className="gap-1.5 text-xs font-semibold border-slate-300 hover:border-blue-500"
                      >
                        <span>{topic.action.text}</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  )}
                </Card>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
