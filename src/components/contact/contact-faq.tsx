'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, ExternalLink, ShieldCheck } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { routes } from '@/config/routes';
import { siteConfig } from '@/lib/site-config';

interface ContactFaqItem {
  id: string;
  question: string;
  answerContent: React.ReactNode;
}

const faqItems: ContactFaqItem[] = [
  {
    id: 'faq-1',
    question: 'What internship domains are available?',
    answerContent: (
      <span>
        We offer focused internships in two core cybersecurity domains:{' '}
        <strong className="text-slate-900">Web Application Penetration Testing (WAPT)</strong> and{' '}
        <strong className="text-slate-900">Cybersecurity Scripting & Automation</strong>. You can explore full details on our{' '}
        <Link href={routes.internships.root} className="text-blue-600 font-semibold hover:underline">
          Internships Overview
        </Link>{' '}
        page.
      </span>
    ),
  },
  {
    id: 'faq-2',
    question: 'How can I apply?',
    answerContent: (
      <span>
        Applications are submitted through the official application process for your chosen internship program. Navigate to the program detail page (such as WAPT or Scripting) and click the application button to complete your entry.
      </span>
    ),
  },
  {
    id: 'faq-3',
    question: 'How can I verify a certificate?',
    answerContent: (
      <span>
        Enter the official Certificate ID (e.g., <code className="bg-slate-100 px-1.5 py-0.5 rounded text-blue-700 font-mono text-xs">IQS/WAPT/26C2/001</code>) and the recipient&apos;s registered email address on our official{' '}
        <Link href={routes.verify} className="text-blue-600 font-semibold hover:underline inline-flex items-center gap-1">
          <ShieldCheck className="h-3.5 w-3.5" /> Verification Page
        </Link>.
      </span>
    ),
  },
  {
    id: 'faq-4',
    question: 'Where can I find official updates?',
    answerContent: (
      <span>
        Follow our official organization pages on{' '}
        <a href={siteConfig.contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 font-semibold hover:underline inline-flex items-center gap-1">
          LinkedIn <ExternalLink className="h-3 w-3" />
        </a>{' '}
        and{' '}
        <a href={siteConfig.contact.youtube} target="_blank" rel="noopener noreferrer" className="text-red-600 font-semibold hover:underline inline-flex items-center gap-1">
          YouTube <ExternalLink className="h-3 w-3" />
        </a>{' '}
        for announcements and cybersecurity content.
      </span>
    ),
  },
];

export const ContactFaq: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleIndex = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-slate-200/60">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14 space-y-4">
          <div className="inline-flex justify-center">
            <Badge variant="blue" className="px-3.5 py-1 text-xs uppercase tracking-widest font-bold gap-1.5">
              <HelpCircle className="h-3.5 w-3.5 text-blue-600" />
              QUICK ANSWERS
            </Badge>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Frequently Asked <span className="tech-gradient-text">Questions</span>
          </h2>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={item.id}
                className={`rounded-2xl border transition-all duration-200 bg-white overflow-hidden ${
                  isOpen ? 'border-blue-300 shadow-md ring-2 ring-blue-500/10' : 'border-slate-200/90 hover:border-slate-300'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleIndex(index)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                  aria-expanded={isOpen}
                >
                  <span className="font-heading text-base font-bold text-slate-900">
                    {item.question}
                  </span>

                  <div
                    className={`h-8 w-8 rounded-full border flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen ? 'bg-blue-50 border-blue-200 text-blue-600 rotate-180' : 'bg-slate-50 border-slate-200 text-slate-400'
                    }`}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="px-6 pb-6 pt-1 border-t border-slate-100 font-body text-sm text-slate-600 leading-relaxed">
                        {item.answerContent}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
