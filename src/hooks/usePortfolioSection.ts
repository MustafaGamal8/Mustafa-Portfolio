'use client';

import { useState, useEffect } from 'react';
import { portfolioService } from '@/lib/frontend/services/portfolio.service';
import { useLanguage } from '@/components/portfolio/LanguageProvider';

interface UsePortfolioSectionProps {
  sectionName: string;
  enabled?: boolean;
}

interface UsePortfolioSectionReturn<T = any> {
  data: T | null;
  loading: boolean;
  error: string | null;
  isStaticData: boolean;
  refetch: () => void;
}

export function usePortfolioSection<T = any>({
  sectionName,
  enabled = true
}: UsePortfolioSectionProps): UsePortfolioSectionReturn<T> {
  const { language } = useLanguage();
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isStaticData, setIsStaticData] = useState(true);

  const fetchData = async () => {
    if (!enabled) return;

    setLoading(true);
    setError(null);

    try {
      const response = await portfolioService.getPortfolioSections({
        lang: language.toLocaleUpperCase() as 'EN' | 'AR',
        sections: [sectionName]
      });

      if (response.success && response.data) {
        // Get the data for this specific section
        const sectionKey = getSectionKey(sectionName);
        const sectionData = (response.data as any)[sectionKey];
        if (sectionData) {
          setData(sectionData);
          setIsStaticData(false);
        }
      } else {
        throw new Error(response.message || 'Failed to fetch data');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
      console.error(`Error fetching ${sectionName}:`, err);
      // Keep static data on error
      setIsStaticData(true);
    } finally {
      setLoading(false);
    }
  };

  const refetch = () => {
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, [language, sectionName, enabled]);

  return {
    data,
    loading,
    error,
    isStaticData,
    refetch
  };
}

// Helper function to map section names to API response keys
function getSectionKey(sectionName: string): string {
  const sectionMap: Record<string, string> = {
    'hero': 'hero',
    'about': 'about',
    'skills': 'skills',
    'skillCategories': 'skillCategories',
    'projects': 'projects',
    'achievements': 'achievements',
    'contact': 'contact',
    'social': 'contact',
    'personal': 'personal',
    'services': 'services',
    'quicklinks': 'contact'
  };

  return sectionMap[sectionName.toLowerCase()] || sectionName;
}

