'use client';

import { useState, useEffect } from 'react';
import { portfolioService } from '@/lib/frontend/services/portfolio.service';
import { useLanguage } from '@/components/portfolio/LanguageProvider';

type LanguageCode = 'EN' | 'AR';

const sectionCache = new Map<string, any>();
const sectionErrorCache = new Map<string, string>();
const pendingResolvers = new Map<string, Array<{ resolve: (value: any) => void; reject: (error: Error) => void }>>();
let queueByLanguage: Record<LanguageCode, Set<string>> = { EN: new Set(), AR: new Set() };
let flushTimer: ReturnType<typeof setTimeout> | null = null;

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

const getCacheKey = (lang: LanguageCode, sectionName: string) => `${lang}:${sectionName}`;

const getSectionKey = (sectionName: string): string => {
  const sectionMap: Record<string, string> = {
    hero: 'hero',
    about: 'about',
    skills: 'skills',
    skillcategories: 'skillCategories',
    projects: 'projects',
    achievements: 'achievements',
    contact: 'contact',
    social: 'contact',
    personal: 'personal',
    services: 'services',
    quicklinks: 'contact',
    footer: 'footer',
  };

  return sectionMap[sectionName.toLowerCase()] || sectionName;
};

const flushQueue = async () => {
  const currentQueue = queueByLanguage;
  queueByLanguage = { EN: new Set(), AR: new Set() };
  flushTimer = null;

  await Promise.all(
    (Object.entries(currentQueue) as Array<[LanguageCode, Set<string>]>).map(async ([lang, sections]) => {
      if (sections.size === 0) return;

      const sectionList = Array.from(sections);

      try {
        const response = await portfolioService.getPortfolioSections({
          lang,
          sections: sectionList,
        });

        if (!response.success || !response.data) {
          throw new Error(response.message || 'Failed to fetch section data');
        }

        sectionList.forEach((sectionName) => {
          const sectionKey = getSectionKey(sectionName);
          const data = (response.data as any)?.[sectionKey] ?? null;
          const cacheKey = getCacheKey(lang, sectionName);
          sectionCache.set(cacheKey, data);
          sectionErrorCache.delete(cacheKey);

          const resolvers = pendingResolvers.get(cacheKey) || [];
          resolvers.forEach(({ resolve }) => resolve(data));
          pendingResolvers.delete(cacheKey);
        });
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to fetch section data';

        sectionList.forEach((sectionName) => {
          const cacheKey = getCacheKey(lang, sectionName);
          sectionErrorCache.set(cacheKey, message);

          const resolvers = pendingResolvers.get(cacheKey) || [];
          resolvers.forEach(({ reject }) => reject(new Error(message)));
          pendingResolvers.delete(cacheKey);
        });
      }
    })
  );
};

const enqueueSectionFetch = (lang: LanguageCode, sectionName: string): Promise<any> => {
  const cacheKey = getCacheKey(lang, sectionName);
  const cachedValue = sectionCache.get(cacheKey);
  if (cachedValue !== undefined) {
    return Promise.resolve(cachedValue);
  }

  return new Promise((resolve, reject) => {
    const existing = pendingResolvers.get(cacheKey) || [];
    existing.push({ resolve, reject });
    pendingResolvers.set(cacheKey, existing);
    queueByLanguage[lang].add(sectionName);

    if (!flushTimer) {
      flushTimer = setTimeout(() => {
        void flushQueue();
      }, 0);
    }
  });
};

const clearSectionCache = (lang: LanguageCode, sectionName: string) => {
  const cacheKey = getCacheKey(lang, sectionName);
  sectionCache.delete(cacheKey);
  sectionErrorCache.delete(cacheKey);
};

export function usePortfolioSection<T = any>({
  sectionName,
  enabled = true
}: UsePortfolioSectionProps): UsePortfolioSectionReturn<T> {
  const { language } = useLanguage();
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isStaticData, setIsStaticData] = useState(true);

  const fetchData = async (force = false) => {
    if (!enabled) return;

    const lang = language.toLocaleUpperCase() as LanguageCode;

    if (force) {
      clearSectionCache(lang, sectionName);
    }

    setLoading(true);
    setError(null);

    try {
      const sectionData = await enqueueSectionFetch(lang, sectionName);
      setData(sectionData);
      setIsStaticData(false);
    } catch (err) {
      const cacheKey = getCacheKey(lang, sectionName);
      const message = sectionErrorCache.get(cacheKey) || (err instanceof Error ? err.message : 'Failed to fetch data');
      setError(message);
      console.error(`Error fetching ${sectionName}:`, err);
      setIsStaticData(true);
    } finally {
      setLoading(false);
    }
  };

  const refetch = () => {
    fetchData(true);
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

