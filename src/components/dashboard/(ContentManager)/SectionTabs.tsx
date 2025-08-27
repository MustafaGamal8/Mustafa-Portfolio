'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useContentManager } from './ContentManagerContext';

export const SectionTabs: React.FC = () => {
  const { sections, activeSection, setActiveSection, getSectionItems } = useContentManager();

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {sections.map(section => (
        <Button
          key={section.type}
          variant={activeSection === section.type ? 'default' : 'outline'}
          size="sm"
          onClick={() => setActiveSection(section.type)}
          className="flex items-center gap-2"
        >
          {section.icon}
          {section.label}
          <Badge variant="secondary" className="ml-1">
            {getSectionItems(section.type, 'EN').length + getSectionItems(section.type, 'AR').length}
          </Badge>
        </Button>
      ))}
    </div>
  );
};
