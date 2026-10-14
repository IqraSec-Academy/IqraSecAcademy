'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const faqData: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'What is IqraSec Academy?',
    answer: 'IqraSec Academy provides structured, practical cybersecurity learning through focused internship programs, hands-on activities, and security-oriented projects.',
  },
  {
    id: 'faq-2',
    question: 'What internship domains are available?',
    answer: 'We currently offer Web Application Penetration Testing (WAPT) and Cybersecurity Scripting & Automation.',
  },
  {
    id: 'faq-3',
    question: 'Are the internships remote?',
    answer: 'Yes. The internship programs are conducted remotely.',
  },
  {
    id: 'faq-4',
    question: 'How do I apply?',
    answer: 'Choose your preferred internship domain and use the application form provided on the internship page.',
  },
  {
    id: 'faq-5',
    question: 'Can I verify an IqraSec Academy certificate?',
    answer: 'Yes. Certificates can be verified through the official Certificate Verification page using the required verification details.',
  },
  {
    id: 'faq-6',
    question: 'Can I download my certificate from the website?',
    answer: 'No. The website is intended for certificate verification only. Certificates are provided separately through the official communication process.',
  },
  {
    id: 'faq-7',
    question: 'How can I contact IqraSec Academy?',
    answer: 'You can contact IqraSec Academy through the official email and social channels listed on the Contact page.',
  },
];

export const FaqSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const toggleAccordion = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="relative py-16 sm:py-24 bg-white overflow-hidden">
      {/* Background Subtle Tech Accents */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute inset-0 tech-grid-pattern opacity-15" />
      </div>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="inline-flex justify-center mb-3"
          >
            <Badge variant="blue" className="px-3.5 py-1 text-xs uppercase tracking-widest font-bold gap-1.5">
              <HelpCircle className="h-3.5 w-3.5 text-blue-600" />
              FREQUENTLY ASKED QUESTIONS
            </Badge>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight"
          >
            Questions, <span className="tech-gradient-text">Answered.</span>
          </motion.h2>
        </div>

        {/* Accessible Accordion List */}
        <div className="space-y-4">
          {faqData.map((item, index) => {
            const isOpen = openId === item.id;
            const contentId = `faq-content-${item.id}`;
            const headerId = `faq-header-${item.id}`;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'border-blue-400/80 bg-slate-50/80 shadow-md shadow-blue-500/5'
                    : 'border-slate-200/90 bg-white hover:border-slate-300'
                }`}
              >
                <h3>
                  <button
                    id={headerId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={contentId}
                    onClick={() => toggleAccordion(item.id)}
                    className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left font-heading text-base sm:text-lg font-bold text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 rounded-2xl"
                  >
                    <span>{item.question}</span>
                    <div
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-transform duration-300 ${
                        isOpen ? 'rotate-180 bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </div>
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={contentId}
                      role="region"
                      aria-labelledby={headerId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-6 pt-0 sm:px-6 font-body text-sm text-slate-600 leading-relaxed border-t border-slate-200/40 mt-1 pt-4">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
