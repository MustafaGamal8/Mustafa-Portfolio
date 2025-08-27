'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useContentManager } from './ContentManagerContext';

export const ContentHeader: React.FC = () => {
  const {
    sections,
    activeSection,
    editLanguage,
    setEditLanguage,
    setEditingItem,
    setIsModalOpen,
    getSectionItems,
    getCurrentSection
  } = useContentManager();

  const handleAddNew = () => {
    const currentSection = getCurrentSection();
    if (currentSection) {
      setEditingItem({
        id: '',
        lang: editLanguage,
        order: getSectionItems(activeSection, editLanguage).length + 1,
        isActive: true
      });
      setIsModalOpen(true);
    }
  };

  return (
    <div className="bg-white rounded-lg border">
      <div className="flex items-center justify-between p-4 border-b">
        <h3 className="text-lg font-semibold">
          {sections.find(s => s.type === activeSection)?.label || activeSection} Content
        </h3>

        <div className="flex items-center gap-4">
          {/* Language Tabs */}
          <div className="flex border rounded-md">
            <Button
              variant={editLanguage === 'EN' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setEditLanguage('EN')}
              className="rounded-r-none"
            >
              English ({getSectionItems(activeSection, 'EN').length})
            </Button>
            <Button
              variant={editLanguage === 'AR' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setEditLanguage('AR')}
              className="rounded-l-none"
            >
              Arabic ({getSectionItems(activeSection, 'AR').length})
            </Button>
          </div>

          {/* Add New Button */}
          <Button onClick={handleAddNew}>
            <Plus className="h-4 w-4 mr-2" />
            Add New
          </Button>
        </div>
      </div>
    </div>
  );
};
