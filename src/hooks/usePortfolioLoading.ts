'use client';

import { useState, useEffect } from 'react';
import { usePortfolioSection } from './usePortfolioSection';

interface LoadingProgress {
  hero: boolean;
  about: boolean;
  skills: boolean;
  projects: boolean;
  achievements: boolean;
  contact: boolean;
}

interface UsePortfolioLoadingReturn {
  isLoading: boolean;
  progress: number;
  loadedSections: string[];
  totalSections: number;
}

export function usePortfolioLoading(): UsePortfolioLoadingReturn {
  const [loadingState, setLoadingState] = useState<LoadingProgress>({
    hero: true,
    about: true,
    skills: true,
    projects: true,
    achievements: true,
    contact: true,
  });

  // Track loading state for each section
  const heroState = usePortfolioSection({ sectionName: 'hero' });
  const aboutState = usePortfolioSection({ sectionName: 'about' });
  const skillsState = usePortfolioSection({ sectionName: 'skills' });
  const projectsState = usePortfolioSection({ sectionName: 'projects' });
  const achievementsState = usePortfolioSection({ sectionName: 'achievements' });
  const contactState = usePortfolioSection({ sectionName: 'contact' });

  useEffect(() => {
    setLoadingState({
      hero: heroState.loading,
      about: aboutState.loading,
      skills: skillsState.loading,
      projects: projectsState.loading,
      achievements: achievementsState.loading,
      contact: contactState.loading,
    });
  }, [
    heroState.loading,
    aboutState.loading,
    skillsState.loading,
    projectsState.loading,
    achievementsState.loading,
    contactState.loading,
  ]);

  const loadedSections = Object.keys(loadingState).filter(
    (section) => !loadingState[section as keyof LoadingProgress]
  );
  const totalSections = Object.keys(loadingState).length;
  const progress = Math.round((loadedSections.length / totalSections) * 100);
  const isLoading = Object.values(loadingState).some((loading) => loading);

  return {
    isLoading,
    progress,
    loadedSections,
    totalSections,
  };
}
