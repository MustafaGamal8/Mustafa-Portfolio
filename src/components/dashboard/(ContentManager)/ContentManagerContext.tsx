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
  handleSave: (item: any) => Promise<void>;
  handleDelete: (id: string) => Promise<void>;
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
  const loadCurrentSectionItems = async () => {
    try {
      const currentSection = getCurrentSection();
      if (!currentSection) return;

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
    } catch (error) {
      const currentSection = getCurrentSection();
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

  // Utility function to remove null/undefined values from an object
  const cleanFormData = (obj: any): any => {
    if (obj === null || obj === undefined) return undefined;

    if (Array.isArray(obj)) {
      return obj.map(cleanFormData).filter(item => item !== undefined);
    }

    if (typeof obj === 'object') {
      const cleaned: any = {};
      for (const [key, value] of Object.entries(obj)) {
        if (value !== null && value !== undefined && value !== '') {
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

      await loadCurrentSectionItems();
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

        await currentSection.service.delete(id);
        setContentData((prev) => ({
          ...prev,
          [currentSection.dataKey]: {
            EN: prev[currentSection.dataKey]?.EN?.filter((item: any) => item.id !== id) || [],
            AR: prev[currentSection.dataKey]?.AR?.filter((item: any) => item.id !== id) || []
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

  useEffect(() => {
    loadContentItems();
  }, []);

  return (
    <ContentManagerContext.Provider
      value={{
        contentData,
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
        handleSave,
        handleDelete,
        showToast,
      }}
    >
      {children}
    </ContentManagerContext.Provider>
  );
};
