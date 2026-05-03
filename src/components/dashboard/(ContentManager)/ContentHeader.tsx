'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Plus, Languages, LayoutGrid, Type, RefreshCw } from 'lucide-react';
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
    getCurrentSection,
    showBothLanguages,
    setShowBothLanguages,
    isLoading,
    refetchCurrentSection,
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
    <Card className="overflow-hidden border-slate-200 bg-gradient-to-br from-background via-background to-muted/20 shadow-sm">
      <div className="flex flex-col gap-4 border-b px-5 py-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Languages className="h-4 w-4" />
            Content manager
          </div>
          <h3 className="text-xl font-semibold tracking-tight">
            {sections.find(s => s.type === activeSection)?.label || activeSection} Content
          </h3>
          <p className="text-sm text-muted-foreground">
            Switch between one language or a paired bilingual view.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="inline-flex rounded-xl border bg-background p-1 shadow-sm">
            <Button
              variant={!showBothLanguages && editLanguage === 'EN' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => {
                setShowBothLanguages(false);
                setEditLanguage('EN');
              }}
              className="gap-2 rounded-lg"
            >
              <Type className="h-4 w-4" />
              English
              <Badge variant="secondary" className="ml-1">
                {getSectionItems(activeSection, 'EN').length}
              </Badge>
            </Button>
            <Button
              variant={!showBothLanguages && editLanguage === 'AR' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => {
                setShowBothLanguages(false);
                setEditLanguage('AR');
              }}
              className="gap-2 rounded-lg"
            >
              <Type className="h-4 w-4" />
              Arabic
              <Badge variant="secondary" className="ml-1">
                {getSectionItems(activeSection, 'AR').length}
              </Badge>
            </Button>
            <Button
              variant={showBothLanguages ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setShowBothLanguages((current) => !current)}
              className="gap-2 rounded-lg"
            >
              <LayoutGrid className="h-4 w-4" />
              Bilingual view
            </Button>
          </div>

          <Button onClick={handleAddNew} className="gap-2">
            <Plus className="h-4 w-4" />
            Add New
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={refetchCurrentSection}
            disabled={isLoading}
            className="gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            Refetch
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 px-5 py-3 text-xs text-muted-foreground">
        <Badge variant="outline" className="gap-1">
          <Languages className="h-3 w-3" />
          {showBothLanguages ? 'Paired cards' : `${editLanguage} list`}
        </Badge>
        <span>Use bilingual view to inspect both translations together.</span>
      </div>
    </Card>
  );
};
