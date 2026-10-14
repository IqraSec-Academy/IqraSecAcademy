'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Youtube, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { siteConfig } from '@/lib/site-config';

const channels = [
  {
    title: 'Email',
    value: siteConfig.contact.email,
    description: 'For general inquiries, internship questions, and support.',
    icon: Mail,
    buttonText: 'Send Email',
    href: `mailto:${siteConfig.contact.email}`,
    isExternal: false,
    accent: 'text-blue-600 bg-blue-50 border-blue-200 hover:border-blue-400',
  },
  {
    title: 'LinkedIn',
    value: 'IqraSec Academy',
    description: 'Follow IqraSec Academy and connect with our official organization page.',
    icon: Linkedin,
    buttonText: 'Visit LinkedIn',
    href: siteConfig.contact.linkedin,
    isExternal: true,
    accent: 'text-cyan-600 bg-cyan-50 border-cyan-200 hover:border-cyan-400',
  },
  {
    title: 'YouTube',
    value: 'IqraSec Academy',
    description: 'Explore cybersecurity learning content and updates.',
    icon: Youtube,
    buttonText: 'Visit YouTube',
    href: siteConfig.contact.youtube,
    isExternal: true,
    accent: 'text-red-600 bg-red-50 border-red-200 hover:border-red-400',
  },
];

export const ContactChannels: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-white border-b border-slate-200/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16 space-y-4">
          <div className="inline-flex justify-center">
            <Badge variant="blue" className="px-3.5 py-1 text-xs uppercase tracking-widest font-bold">
              OFFICIAL CHANNELS
            </Badge>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Connect With Us <span className="tech-gradient-text">Directly</span>
          </h2>

          <p className="font-body text-base sm:text-lg text-slate-600 leading-relaxed">
            Choose the channel that works best for your inquiry.
          </p>
        </div>

        {/* 3 Channels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {channels.map((channel, idx) => {
            const IconComp = channel.icon;
            return (
              <motion.div
                key={channel.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                whileHover={{ y: -6 }}
              >
                <Card className={`p-8 bg-white border-slate-200/90 shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col justify-between text-left relative overflow-hidden group border ${channel.accent}`}>
                  <div className="space-y-4">
                    <div className={`h-12 w-12 rounded-2xl border ${channel.accent} flex items-center justify-center shrink-0`}>
                      <IconComp className="h-6 w-6" />
                    </div>

                    <div>
                      <h3 className="font-heading text-xl font-bold text-slate-900">
                        {channel.title}
                      </h3>
                      <p className="font-mono text-xs font-semibold text-blue-600 mt-1 truncate">
                        {channel.value}
                      </p>
                    </div>

                    <p className="font-body text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {channel.description}
                    </p>
                  </div>

                  <div className="pt-6">
                    <Button
                      href={channel.href}
                      variant="outline"
                      size="md"
                      target={channel.isExternal ? '_blank' : undefined}
                      rel={channel.isExternal ? 'noopener noreferrer' : undefined}
                      className="w-full justify-center gap-2 text-xs font-semibold border-slate-300 hover:border-blue-500"
                    >
                      <span>{channel.buttonText}</span>
                      {channel.isExternal ? (
                        <ExternalLink className="h-3.5 w-3.5 text-slate-400" />
                      ) : (
                        <Mail className="h-3.5 w-3.5 text-blue-600" />
                      )}
                    </Button>
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
