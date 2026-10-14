'use client';

import React from 'react';
import {
  Globe,
  Search,
  Wrench,
  Shield,
  FileText,
  Terminal,
  Code2,
  Cpu,
  Database,
  Folder,
} from 'lucide-react';
import { WhatYouLearnItem } from '@/lib/internships';
import { Badge } from '@/components/ui/Badge';
import { FeatureCard } from '@/components/ui/feature-card';

interface WhatYoullLearnProps {
  items: WhatYouLearnItem[];
}

const iconMap: Record<string, React.ElementType> = {
  globe: Globe,
  search: Search,
  wrench: Wrench,
  shield: Shield,
  file: FileText,
  terminal: Terminal,
  code: Code2,
  cpu: Cpu,
  database: Database,
  folder: Folder,
};

export const WhatYoullLearn: React.FC<WhatYoullLearnProps> = ({ items }) => {
  return (
    <section className="py-16 sm:py-24 bg-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex justify-center mb-3">
            <Badge variant="blue" className="px-3.5 py-1 text-xs uppercase tracking-widest font-bold">
              CURRICULUM FOCUS
            </Badge>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            What You&apos;ll <span className="tech-gradient-text">Learn</span>
          </h2>

          <p className="font-body text-base sm:text-lg text-slate-600 leading-relaxed">
            Gain practical understanding through key topics, tools, methodologies, and security exercises.
          </p>
        </div>

        {/* 6 Grid Items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {items.map((item, index) => {
            const IconComponent = iconMap[item.iconName] || Shield;
            return (
              <FeatureCard
                key={item.id}
                title={item.title}
                description={item.description}
                icon={IconComponent}
                index={index}
              />
            );
          })}
        </div>

      </div>
    </section>
  );
};
