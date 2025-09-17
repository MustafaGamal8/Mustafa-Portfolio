'use client';

import { useState, useEffect } from 'react';
import { fileService } from '@/lib/frontend/services/file.service';
import { useToast } from '@/hooks/use-toast';

interface FileData {
  id: string;
  name: string;
  url: string;
  path: string;
  type: string;
  size: number;
  base64: string;
  createdAt: string;
  updatedAt: string;
}

interface UseLogoReturn {
  logo: FileData | null;
  loading: boolean;
  error: string | null;
  uploadLogo: (file: File) => Promise<void>;
  updateLogo: (base64Data: string) => Promise<void>;
  refreshLogo: () => void;
}

/**
 * Hook for managing logos by name
 * @param logoName - The name of the logo to manage (e.g., 'main-logo', 'dark-logo', 'light-logo')
 */
export function useLogo(logoName: string = 'main-logo'): UseLogoReturn {
  const [logo, setLogo] = useState<FileData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const loadLogo = async () => {
    setLoading(true);
    setError(null);

    try {
      const logoData = await fileService.getLogoByName(logoName);
      setLogo(logoData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load logo';
      setError(errorMessage);
      console.error(`Failed to load logo ${logoName}:`, err);
    } finally {
      setLoading(false);
    }
  };

  const uploadLogo = async (file: File) => {
    setLoading(true);
    setError(null);

    try {
      const uploadedLogo = await fileService.uploadLogo(file, logoName);
      setLogo(uploadedLogo);

      toast({
        title: "Success",
        description: `${logoName} uploaded successfully!`,
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to upload logo';
      setError(errorMessage);

      toast({
        variant: "destructive",
        title: "Error",
        description: `Failed to upload ${logoName}`,
      });

      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateLogo = async (base64Data: string) => {
    if (!logo) {
      throw new Error('No logo to update');
    }

    setLoading(true);
    setError(null);

    try {
      const updatedLogo = await fileService.updateLogoBase64(logoName, base64Data);
      setLogo(updatedLogo);

      toast({
        title: "Success",
        description: `${logoName} updated successfully!`,
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update logo';
      setError(errorMessage);

      toast({
        variant: "destructive",
        title: "Error",
        description: `Failed to update ${logoName}`,
      });

      throw err;
    } finally {
      setLoading(false);
    }
  };

  const refreshLogo = () => {
    loadLogo();
  };

  useEffect(() => {
    loadLogo();
  }, [logoName]);

  return {
    logo,
    loading,
    error,
    uploadLogo,
    updateLogo,
    refreshLogo
  };
}

// Logo types
export type LogoType = 'main' | 'word' | 'icon';
export type ThemeType = 'dark' | 'light';

/**
 * Hook for specific logo type and theme
 */
export function useTypedLogo(type: LogoType, theme: ThemeType) {
  const logoName = `${type}-${theme}`;
  return useLogo(logoName);
}

/**
 * Hook specifically for the main logo (original for backward compatibility)
 */
export function useMainLogo() {
  return useLogo('main-logo');
}

// Dark theme logos
export function useMainLogoDark() {
  return useLogo('main-dark');
}

export function useWordLogoDark() {
  return useLogo('word-dark');
}

export function useIconLogoDark() {
  return useLogo('icon-dark');
}

// Light theme logos
export function useMainLogoLight() {
  return useLogo('main-light');
}

export function useWordLogoLight() {
  return useLogo('word-light');
}

export function useIconLogoLight() {
  return useLogo('icon-light');
}

/**
 * Hook to get all logos at once
 */
export function useAllLogos() {
  const mainDark = useMainLogoDark();
  const wordDark = useWordLogoDark();
  const iconDark = useIconLogoDark();
  const mainLight = useMainLogoLight();
  const wordLight = useWordLogoLight();
  const iconLight = useIconLogoLight();

  return {
    dark: {
      main: mainDark,
      word: wordDark,
      icon: iconDark,
    },
    light: {
      main: mainLight,
      word: wordLight,
      icon: iconLight,
    },
    loading: [mainDark, wordDark, iconDark, mainLight, wordLight, iconLight].some(logo => logo.loading),
  };
}