import { useLanguage } from '@/components/portfolio/LanguageProvider';

/**
 * Hook for creating language-aware URLs and handling URL language parameters
 */
export const useLanguageUrl = () => {
  const { language, setLanguage } = useLanguage();

  /**
   * Generate a URL with the current language parameter
   * @param path - The path to append the language to (optional, defaults to current path)
   * @returns URL with language parameter
   */
  const createLanguageUrl = (path?: string) => {
    if (typeof window === 'undefined') return '';

    const url = new URL(window.location.href);
    if (path) {
      url.pathname = path;
    }
    url.searchParams.set('lang', language);
    return url.toString();
  };

  /**
   * Generate a shareable URL with specified language
   * @param lang - Language to include in URL ('en' or 'ar')
   * @param path - The path to share (optional, defaults to current path)
   * @returns Shareable URL with language parameter
   */
  const createShareableUrl = (lang: 'en' | 'ar', path?: string) => {
    if (typeof window === 'undefined') return '';

    const url = new URL(window.location.href);
    if (path) {
      url.pathname = path;
    }
    url.searchParams.set('lang', lang);
    return url.toString();
  };

  /**
   * Get the current URL with language parameter
   * @returns Current URL with language parameter
   */
  const getCurrentLanguageUrl = () => {
    return createLanguageUrl();
  };

  /**
   * Navigate to a path with language parameter
   * @param path - The path to navigate to
   */
  const navigateWithLanguage = (path: string) => {
    if (typeof window === 'undefined') return;

    const url = new URL(window.location.origin + path);
    url.searchParams.set('lang', language);
    window.history.pushState({}, '', url.toString());
  };

  /**
   * Update the current URL to include language parameter without navigation
   */
  const updateUrlWithLanguage = () => {
    if (typeof window === 'undefined') return;

    const url = new URL(window.location.href);
    url.searchParams.set('lang', language);
    window.history.replaceState({}, '', url.toString());
  };

  return {
    language,
    setLanguage,
    createLanguageUrl,
    createShareableUrl,
    getCurrentLanguageUrl,
    navigateWithLanguage,
    updateUrlWithLanguage
  };
};

/**
 * Utility function to extract language from URL (can be used outside of React components)
 * @param url - URL string or URL object
 * @returns Language code ('en', 'ar') or null if not found
 */
export const extractLanguageFromUrl = (url: string | URL): 'en' | 'ar' | null => {
  try {
    const urlObj = typeof url === 'string' ? new URL(url) : url;
    const lang = urlObj.searchParams.get('lang');

    if (lang === 'en' || lang === 'ar') {
      return lang;
    }

    return null;
  } catch {
    return null;
  }
};

/**
 * Utility function to add language parameter to any URL
 * @param url - URL to modify
 * @param lang - Language to add
 * @returns Modified URL with language parameter
 */
export const addLanguageToUrl = (url: string, lang: 'en' | 'ar'): string => {
  try {
    const urlObj = new URL(url);
    urlObj.searchParams.set('lang', lang);
    return urlObj.toString();
  } catch {
    // If URL is invalid, return original
    return url;
  }
};
