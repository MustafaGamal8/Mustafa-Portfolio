import React from 'react';
import { Button } from '@/components/ui/button';
import { Share2, Copy, ExternalLink } from 'lucide-react';
import { useLanguageUrl } from '@/hooks/useLanguageUrl';
import { useToast } from '@/hooks/use-toast';

/**
 * Component that demonstrates language-aware URL sharing
 * Can be added to any section where users might want to share specific language versions
 */
export const LanguageShareButton: React.FC = () => {
  const { createShareableUrl, getCurrentLanguageUrl } = useLanguageUrl();
  const { toast } = useToast();

  const handleShare = async (lang: 'en' | 'ar') => {
    const shareUrl = createShareableUrl(lang);
    const langName = lang === 'en' ? 'English' : 'Arabic';

    try {
      if (navigator.share) {
        // Use native sharing if available (mobile devices)
        await navigator.share({
          title: `Portfolio - ${langName}`,
          text: `Check out my portfolio in ${langName}`,
          url: shareUrl,
        });
      } else {
        // Fallback to clipboard
        await navigator.clipboard.writeText(shareUrl);
        toast({
          title: "Link Copied!",
          description: `${langName} portfolio link copied to clipboard`,
        });
      }
    } catch (error) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = shareUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);

      toast({
        title: "Link Copied!",
        description: `${langName} portfolio link copied to clipboard`,
      });
    }
  };

  const handleCurrentUrlShare = async () => {
    const currentUrl = getCurrentLanguageUrl();

    try {
      await navigator.clipboard.writeText(currentUrl);
      toast({
        title: "Current Link Copied!",
        description: "Current page link with language copied to clipboard",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to copy link",
      });
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-2 items-center">
      <span className="text-sm text-muted-foreground mr-2">Share:</span>

      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleShare('en')}
          className="flex items-center gap-2"
        >
          <Share2 className="h-4 w-4" />
          English
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => handleShare('ar')}
          className="flex items-center gap-2"
        >
          <Share2 className="h-4 w-4" />
          العربية
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={handleCurrentUrlShare}
          className="flex items-center gap-2"
          title="Copy current page link"
        >
          <Copy className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

/**
 * Simple URL display component for debugging/testing
 */
export const LanguageUrlDisplay: React.FC = () => {
  const { createShareableUrl, getCurrentLanguageUrl, language } = useLanguageUrl();

  if (process.env.NODE_ENV !== 'development') {
    return null; // Only show in development
  }

  return (
    <div className="fixed bottom-4 right-4 bg-background border border-border rounded-lg p-3 text-xs max-w-sm shadow-lg">
      <div className="font-semibold mb-2">Language URLs (Dev Only)</div>
      <div className="space-y-1">
        <div>
          <strong>Current:</strong> {language}
        </div>
        <div className="break-all">
          <strong>URL:</strong> {getCurrentLanguageUrl()}
        </div>
        <div className="break-all">
          <strong>EN:</strong> {createShareableUrl('en')}
        </div>
        <div className="break-all">
          <strong>AR:</strong> {createShareableUrl('ar')}
        </div>
      </div>
    </div>
  );
};
