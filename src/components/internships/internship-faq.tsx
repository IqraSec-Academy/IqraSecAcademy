'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

export interface FaqItem {
  question: string;
  answer: string;
}

export const internshipFaqs: FaqItem[] = [
  {
    question: 'Which domains are available?',
    answer: 'Web Application Penetration Testing (WAPT) and Scripting & Automation.',
  },
  {
    question: 'Is the internship virtual?',
    answer: 'Yes, the internship is conducted virtually.',
  },
  {
    question: 'Who can apply?',
    answer: 'Beginners and intermediate learners interested in cybersecurity.',
  },
  {
    question: 'Are there opportunities for top performers?',
    answer: 'Eligible top performers who complete the program receive a free, verifiable certificate. Stipends are separate and awarded only to selected top performers based on performance and program criteria. Premium learning resources are also available to eligible top performers.',
  },
];

export const InternshipFaq: React.FC = () => {
  const [openIndices, setOpenIndices] = useState<number[]>([0, 1]);

  const toggleFaq = (index: number) => {
    setOpenIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <section className="py-16 sm:py-24 bg-white border-t border-slate-200/60 relative">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex justify-center">
            <Badge variant="blue" className="px-3.5 py-1 text-xs uppercase tracking-widest font-bold gap-1.5">
              <HelpCircle className="h-3.5 w-3.5 text-blue-600" />
              FREQUENTLY ASKED QUESTIONS
            </Badge>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Internship <span className="tech-gradient-text">FAQ</span>
          </h2>
          <p className="font-body text-base text-slate-600">
            Have questions about the application or program details? Find quick answers below.
          </p>
        </div>

        <div className="space-y-4">
          {internshipFaqs.map((faq, index) => {
            const isOpen = openIndices.includes(index);
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="rounded-xl border border-slate-200 bg-white overflow-hidden transition-colors shadow-xs hover:border-blue-300"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-4 text-left font-heading text-base sm:text-lg font-bold text-slate-900 flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                  aria-expanded={isOpen}
                >
                  <span className="flex items-center gap-3">
                    <span className="text-xs font-bold font-body text-blue-600 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-md">
                      Q{index + 1}
                    </span>
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 text-slate-500 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-blue-600' : ''
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="px-6 pb-5 pt-1 text-sm sm:text-base text-slate-600 font-body leading-relaxed border-t border-slate-100 bg-slate-50/50">
                        {faq.answer}
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
