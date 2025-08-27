'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useContentManager } from './ContentManagerContext';
import { ContentItemCard } from './ContentItemCard';

export const ContentList: React.FC = () => {
  const {
    activeSection,
    editLanguage,
    sections,
    getSectionItems,
    setEditingItem,
    setIsModalOpen,
    getCurrentSection
  } = useContentManager();

  const items = getSectionItems(activeSection, editLanguage);

  const handleAddFirst = () => {
    const currentSection = getCurrentSection();
    if (currentSection) {
      setEditingItem({
        id: '',
        lang: editLanguage,
        order: 1,
        isActive: true
      });
      setIsModalOpen(true);
    }
  };

  if (items.length === 0) {
    return (
      <div className="p-4">
        <div className="text-center py-8">
          <p className="text-muted-foreground mb-4">
            No {editLanguage === 'EN' ? 'English' : 'Arabic'} content found for{' '}
            {sections.find(s => s.type === activeSection)?.label.toLowerCase()}.
          </p>
          <Button onClick={handleAddFirst}>
            <Plus className="h-4 w-4 mr-2" />
            Add First Item
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="grid gap-3">
        {items.map((item: any) => (
          <ContentItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};
