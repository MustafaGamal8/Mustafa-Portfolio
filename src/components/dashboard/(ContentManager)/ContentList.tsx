'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRightLeft, Edit3, Languages, Plus, Trash2, ArrowUp, ArrowDown } from 'lucide-react';
import { useContentManager } from './ContentManagerContext';
import { ContentItemCard } from './ContentItemCard';
import { getBilingualPairs } from './bilingualContent';
import renderLucideIcon from '@/lib/frontend/utils/renderLucideIcon';

export const ContentList: React.FC = () => {
  const {
    activeSection,
    editLanguage,
    sections,
    getSectionItems,
    setEditingItem,
    setIsModalOpen,
    getCurrentSection,
    showBothLanguages,
    handleDelete,
    moveItemUp,
    moveItemDown,
  } = useContentManager();

  const items = showBothLanguages
    ? getBilingualPairs(activeSection, {
      EN: getSectionItems(activeSection, 'EN'),
      AR: getSectionItems(activeSection, 'AR')
    })
    : getSectionItems(activeSection, editLanguage);

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

  const getItemTitle = (item: any) => item?.title || item?.name || item?.firstName || 'Untitled item';

  const getItemDescription = (item: any) => {
    if (!item?.description) return null;
    return item.description.length > 110 ? `${item.description.slice(0, 110)}...` : item.description;
  };

  const renderPairCard = (pair: any) => {
    const renderPanel = (language: 'EN' | 'AR', item: any) => (
      <div className={`rounded-2xl border p-4 ${language === 'AR' ? 'bg-slate-50/70' : 'bg-white'}`} dir={language === 'AR' ? 'rtl' : 'ltr'}>
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-sm font-medium">
              <Languages className="h-4 w-4 text-muted-foreground" />
              {language === 'EN' ? 'English' : 'Arabic'}
            </div>
            <h4 className="mt-1 text-base font-semibold">
              {item ? getItemTitle(item) : `Missing ${language === 'EN' ? 'English' : 'Arabic'} translation`}
            </h4>
            {item && getItemDescription(item) && (
              <p className="mt-2 text-sm text-muted-foreground">{getItemDescription(item)}</p>
            )}
          </div>

          <Badge variant={item?.isActive !== false ? 'default' : 'secondary'}>
            {item?.isActive !== false ? 'Active' : 'Inactive'}
          </Badge>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {item?.icon && (
            <Badge variant="outline" className="gap-1">
              {renderLucideIcon(item.icon)}
              {item.icon}
            </Badge>
          )}
          {item?.category && <Badge variant="outline">Category: {item.category}</Badge>}
          {item?.level && <Badge variant="outline">Level: {item.level}</Badge>}
          {item?.status && <Badge variant="outline">Status: {item.status}</Badge>}
          {item?.value && <Badge variant="outline">Value: {item.value}</Badge>}
          {item?.isFeatured && <Badge variant="outline" className="bg-yellow-50 text-yellow-700">Featured</Badge>}
          {item?.isPrimary && <Badge variant="outline" className="bg-blue-50 text-blue-700">Primary</Badge>}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <Button
            size="sm"
            variant="outline"
            disabled={!item}
            onClick={() => {
              setEditingItem(item);
              setIsModalOpen(true);
            }}
          >
            <Edit3 className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="text-destructive hover:text-destructive"
            disabled={!item}
            onClick={() => item && handleDelete(item.id)}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>
    );

    return (
      <Card key={pair.key} className="overflow-hidden border-slate-200 shadow-sm transition-all duration-200 hover:shadow-md">
        <CardContent className="space-y-4 p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <ArrowRightLeft className="h-4 w-4" />
                Paired bilingual item
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="ghost" onClick={() => pair.EN?.id && moveItemUp(pair.EN.id)}>
                  <ArrowUp className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="ghost" onClick={() => pair.EN?.id && moveItemDown(pair.EN.id)}>
                  <ArrowDown className="h-4 w-4" />
                </Button>
              </div>
              <h3 className="text-lg font-semibold">
                {pair.EN?.title || pair.AR?.title || pair.EN?.name || pair.AR?.name || 'Bilingual entry'}
              </h3>
            </div>
            <Badge variant="outline">Order {pair.order ?? 0}</Badge>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            {renderPanel('EN', pair.EN)}
            {renderPanel('AR', pair.AR)}
          </div>
        </CardContent>
      </Card>
    );
  };

  if (items.length === 0) {
    return (
      <div className="p-4">
        <div className="text-center py-8">
          <p className="text-muted-foreground mb-4">
            No {showBothLanguages ? 'bilingual' : editLanguage === 'EN' ? 'English' : 'Arabic'} content found for{' '}
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
      {showBothLanguages ? (
        <div className="space-y-4">
          {items.map(renderPairCard)}
        </div>
      ) : (
        <div className="grid gap-3">
          {items.map((item: any) => (
            <ContentItemCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};
