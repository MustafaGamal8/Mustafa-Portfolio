'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  heroContentService,
  aboutCardService,
  skillService,
  skillCategoryService,
  projectService,
  achievementService,
  personalInfoService,
  contactInfoService,
  socialLinkService
} from '@/lib/frontend/services';
import { ContentSection, ContentData, ContentManagerState, ContentManagerActions } from './types';
import { findPairedItem } from './bilingualContent';
import {
  User,
  Award,
  Settings,
  Users,
  Link,
  Phone,
  Briefcase
} from 'lucide-react';

interface ContentManagerContextType extends ContentManagerState, ContentManagerActions {
  sections: ContentSection[];
  getCurrentSection: () => ContentSection | undefined;
  getSectionItems: (sectionType: string, language?: 'EN' | 'AR') => any[];
  loadContentItems: () => Promise<void>;
  loadCurrentSectionItems: () => Promise<void>;
  refetchCurrentSection: () => Promise<void>;
  handleSave: (item: any) => Promise<void>;
  handleDelete: (id: string) => Promise<void>;
  moveItemUp: (id: string) => Promise<void>;
  moveItemDown: (id: string) => Promise<void>;
  showToast: (toast: { title: string; description: string; variant?: 'default' | 'destructive' }) => void;
}

const ContentManagerContext = createContext<ContentManagerContextType | undefined>(undefined);

export const useContentManager = () => {
  const context = useContext(ContentManagerContext);
  if (!context) {
    throw new Error('useContentManager must be used within a ContentManagerProvider');
  }
  return context;
};

export const ContentManagerProvider: React.FC<{
  children: React.ReactNode;
  showToast: (toast: { title: string; description: string; variant?: 'default' | 'destructive' }) => void;
}> = ({ children, showToast }) => {
  const [contentData, setContentData] = useState<ContentData>({});
  const [editingItem, setEditingItem] = useState<any>(null);
  const [activeSection, setActiveSection] = useState<string>('personal');
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [editLanguage, setEditLanguage] = useState<'EN' | 'AR'>('EN');
  const [showBothLanguages, setShowBothLanguages] = useState(false);
  const [loadedSectionKeys, setLoadedSectionKeys] = useState<Set<string>>(new Set());

  const sections: ContentSection[] = [
    {
      type: 'personal',
      label: 'Personal Info',
      icon: <User className="h-4 w-4" />,
      service: personalInfoService,
      dataKey: 'personalInfo'
    },
    {
      type: 'hero',
      label: 'Hero Content',
      icon: <Settings className="h-4 w-4" />,
      service: heroContentService,
      dataKey: 'heroContent'
    },
    {
      type: 'about',
      label: 'About Cards',
      icon: <Users className="h-4 w-4" />,
      service: aboutCardService,
      dataKey: 'aboutCards'
    },
    {
      type: 'skill-categories',
      label: 'Skill Categories',
      icon: <Award className="h-4 w-4" />,
      service: skillCategoryService,
      dataKey: 'skillCategories'
    },
    {
      type: 'skills',
      label: 'Skills',
      icon: <Award className="h-4 w-4" />,
      service: skillService,
      dataKey: 'skills'
    },
    {
      type: 'projects',
      label: 'Projects',
      icon: <Briefcase className="h-4 w-4" />,
      service: projectService,
      dataKey: 'projects'
    },
    {
      type: 'achievements',
      label: 'Achievements',
      icon: <Award className="h-4 w-4" />,
      service: achievementService,
      dataKey: 'achievements'
    },
    {
      type: 'contact',
      label: 'Contact Info',
      icon: <Phone className="h-4 w-4" />,
      service: contactInfoService,
      dataKey: 'contactInfo'
    },
    {
      type: 'social',
      label: 'Social Links',
      icon: <Link className="h-4 w-4" />,
      service: socialLinkService,
      dataKey: 'socialLinks'
    }
  ];

  const getCurrentSection = () => sections.find(s => s.type === activeSection);

  const getSectionItems = (sectionType: string, language: 'EN' | 'AR' = editLanguage) => {
    const section = sections.find(s => s.type === sectionType);
    if (!section) return [];
    const sectionData = contentData[section.dataKey] || { EN: [], AR: [] };
    const items = sectionData[language] || [];
    return items.sort((a: any, b: any) => (a.order || 0) - (b.order || 0));
  };

  const loadContentItems = async () => {
    try {
      setIsLoading(true);
      const newContentData: ContentData = {};

      await Promise.all(sections.map(async (section) => {
        try {
          const [enData, arData] = await Promise.all([
            section.service.getByLanguage('EN'),
            section.service.getByLanguage('AR')
          ]);

          const enItems = Array.isArray(enData) ? enData : [enData].filter(Boolean);
          const arItems = Array.isArray(arData) ? arData : [arData].filter(Boolean);

          newContentData[section.dataKey] = {
            EN: enItems,
            AR: arItems
          };
        } catch (error) {
          console.error(`Failed to load ${section.type}:`, error);
          newContentData[section.dataKey] = { EN: [], AR: [] };
        }
      }));

      setContentData(newContentData);
    } catch (error) {
      console.error('Failed to load content items:', error);
      showToast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load content items"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Optimized function to reload only the current section
  const loadCurrentSectionItems = async (targetSectionType?: string, forceReload = false) => {
    try {
      const currentSection = targetSectionType
        ? sections.find((section) => section.type === targetSectionType)
        : getCurrentSection();

      if (!currentSection) return;

      if (!forceReload && loadedSectionKeys.has(currentSection.type)) {
        return;
      }

      setIsLoading(true);

      const [enData, arData] = await Promise.all([
        currentSection.service.getByLanguage('EN'),
        currentSection.service.getByLanguage('AR')
      ]);

      const enItems = Array.isArray(enData) ? enData : [enData].filter(Boolean);
      const arItems = Array.isArray(arData) ? arData : [arData].filter(Boolean);

      setContentData(prev => ({
        ...prev,
        [currentSection.dataKey]: {
          EN: enItems,
          AR: arItems
        }
      }));

      setLoadedSectionKeys((prev) => new Set([...prev, currentSection.type]));
    } catch (error) {
      const currentSection = targetSectionType
        ? sections.find((section) => section.type === targetSectionType)
        : getCurrentSection();
      console.error(`Failed to load ${currentSection?.type || 'section'} items:`, error);
      showToast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load content items"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const refetchCurrentSection = async () => {
    await loadCurrentSectionItems(activeSection, true);
  };

  // Utility function to remove null/undefined values from an object
  const cleanFormData = (obj: any): any => {
    if (obj === null || obj === undefined) return undefined;

    if (Array.isArray(obj)) {
      return obj.map(cleanFormData).filter(item => item !== undefined);
    }

    if (typeof obj === 'object') {
      const cleaned: any = {};
      for (const [key, value] of Object.entries(obj)) {
        // Handle Date objects specially
        if (value instanceof Date) {
          cleaned[key] = value;
        }
        // Keep values that are not null, undefined, or empty string
        else if (value !== null && value !== undefined && value !== '') {
          cleaned[key] = cleanFormData(value);
        }
      }
      return Object.keys(cleaned).length > 0 ? cleaned : undefined;
    }

    return obj;
  };

  const handleSave = async (item: any) => {
    setIsLoading(true);
    try {
      const currentSection = getCurrentSection();
      if (!currentSection) throw new Error('Invalid section');

      // Clean the item data to remove null/undefined/empty values
      const cleanedItem = cleanFormData(item);
      const itemWithLang = { ...cleanedItem, lang: editLanguage };

      // Debug logging for date fields
      if (activeSection === 'projects') {
        console.log('Original item:', item);
        console.log('Cleaned item:', cleanedItem);
        console.log('Item with lang:', itemWithLang);
      }

      if (item.id) {
        await currentSection.service.update(itemWithLang);
        showToast({
          title: "Success",
          description: "Content updated successfully!"
        });
      } else {
        await currentSection.service.create(itemWithLang);
        showToast({
          title: "Success",
          description: "Content added successfully!"
        });
      }

      await loadCurrentSectionItems(undefined, true);
      setEditingItem(null);
      setIsModalOpen(false);
      setSelectedImage(null);
    } catch (error) {
      console.error('Save error:', error);
      showToast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save content. Please try again."
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this item?')) {
      try {
        const currentSection = getCurrentSection();
        if (!currentSection) throw new Error('Invalid section');

        const currentSectionData = contentData[currentSection.dataKey] || { EN: [], AR: [] };
        const existingItem = [...(currentSectionData.EN || []), ...(currentSectionData.AR || [])].find((item: any) => item.id === id);
        const pairedItem = existingItem ? findPairedItem(currentSection.type, existingItem, currentSectionData) : undefined;
        const idsToDelete = Array.from(new Set([id, pairedItem?.id].filter(Boolean) as string[]));

        await Promise.all(idsToDelete.map(itemId => currentSection.service.delete(itemId)));
        setContentData((prev) => ({
          ...prev,
          [currentSection.dataKey]: {
            EN: prev[currentSection.dataKey]?.EN?.filter((item: any) => !idsToDelete.includes(item.id)) || [],
            AR: prev[currentSection.dataKey]?.AR?.filter((item: any) => !idsToDelete.includes(item.id)) || []
          }
        }));
        showToast({
          title: "Success",
          description: "Content deleted successfully!"
        });
      } catch (error) {
        console.error('Delete error:', error);
        showToast({
          variant: "destructive",
          title: "Error",
          description: "Failed to delete content. Please try again."
        });
      }
    }
  };

  const swapOrders = async (sectionType: string, lang: 'EN' | 'AR', idA: string, idB: string) => {
    const section = sections.find(s => s.type === sectionType);
    if (!section) return;

    const sectionData = contentData[section.dataKey] || { EN: [], AR: [] };
    // Stable sort by order then id to ensure consistent positions
    const items = (sectionData[lang] || []).slice().sort((a: any, b: any) => {
      const oa = a.order ?? 0;
      const ob = b.order ?? 0;
      if (oa !== ob) return oa - ob;
      return (a.id || '').localeCompare(b.id || '');
    });

    const idxA = items.findIndex((it: any) => it.id === idA);
    const idxB = items.findIndex((it: any) => it.id === idB);
    if (idxA === -1 || idxB === -1) return;

    // Reindex all items to sequential 1..N to eliminate duplicates
    const reindexed = items.map((it: any, idx: number) => ({ ...it, order: idx + 1 }));

    // Swap positions
    const newReindexed = reindexed.slice();
    newReindexed[idxA] = { ...reindexed[idxA], order: idxB + 1 };
    newReindexed[idxB] = { ...reindexed[idxB], order: idxA + 1 };

    // Persist updates for the two swapped items and their paired counterparts in the other language
    const toUpdate = [newReindexed[idxA], newReindexed[idxB]];

    const updates: Promise<any>[] = [];
    for (const upd of toUpdate) {
      updates.push(section.service.update({ id: upd.id, order: upd.order, lang }));

      // sync to paired item in the other language
      const otherLang: 'EN' | 'AR' = lang === 'EN' ? 'AR' : 'EN';
      const otherItems = sectionData[otherLang] || [];
      const paired = findPairedItem(section.type, upd, { [lang]: items, [otherLang]: otherItems });
      if (paired?.id) {
        updates.push(section.service.update({ id: paired.id, order: upd.order, lang: otherLang }));
      }
    }

    await Promise.all(updates);

    // Update local state with new orders
    setContentData(prev => {
      const prevSection = prev[section.dataKey] || { EN: [], AR: [] };
      const updatedLangItems = (prevSection[lang] || []).map((it: any) => {
        const found = newReindexed.find((nr: any) => nr.id === it.id);
        return found ? { ...it, order: found.order } : it;
      });

      // also update paired items in other language
      const otherLang: 'EN' | 'AR' = lang === 'EN' ? 'AR' : 'EN';
      const updatedOtherItems = (prevSection[otherLang] || []).map((it: any) => {
        const pair = toUpdate.find((t: any) => t.id === (findPairedItem(section.type, it, { [lang]: items, [otherLang]: prevSection[otherLang] })?.id));
        return pair ? { ...it, order: pair.order } : it;
      });

      return {
        ...prev,
        [section.dataKey]: {
          ...prevSection,
          [lang]: updatedLangItems,
          [otherLang]: updatedOtherItems
        }
      };
    });
  };

  const moveItemUp = async (id: string) => {
    const section = getCurrentSection();
    if (!section) return;
    const lang = editLanguage;
    const items = getSectionItems(section.type, lang);
    const idx = items.findIndex((it: any) => it.id === id);
    if (idx <= 0) return;
    const prevItem = items[idx - 1];
    await swapOrders(section.type, lang, id, prevItem.id);
  };

  const moveItemDown = async (id: string) => {
    const section = getCurrentSection();
    if (!section) return;
    const lang = editLanguage;
    const items = getSectionItems(section.type, lang);
    const idx = items.findIndex((it: any) => it.id === id);
    if (idx === -1 || idx >= items.length - 1) return;
    const nextItem = items[idx + 1];
    await swapOrders(section.type, lang, id, nextItem.id);
  };

  useEffect(() => {
    void loadCurrentSectionItems(activeSection);
  }, [activeSection]);

  return (
    <ContentManagerContext.Provider
      value={{
        contentData,
        moveItemUp,
        moveItemDown,
        editingItem,
        activeSection,
        isLoading,
        isModalOpen,
        selectedImage,
        editLanguage,
        showBothLanguages,
        setContentData,
        setEditingItem,
        setActiveSection,
        setIsLoading,
        setIsModalOpen,
        setSelectedImage,
        setEditLanguage,
        setShowBothLanguages,
        sections,
        getCurrentSection,
        getSectionItems,
        loadContentItems,
        loadCurrentSectionItems,
        refetchCurrentSection,
        handleSave,
        handleDelete,
        showToast,
      }}
    >
      {children}
    </ContentManagerContext.Provider>
  );
};
