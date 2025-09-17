'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTheme } from 'next-themes';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Mail, Phone, Globe, ArrowUpRight, Sparkles } from 'lucide-react';
import { useIconLogoDark, useIconLogoLight } from '@/hooks/useLogo';

interface PersonalInfo {
  id: string;
  lang: string;
  firstName: string;
  lastName: string;
  title: string;
  description: string;
  bio?: string;
  image?: {
    id: string;
    name: string;
    url: string;
    type: string;
  };
}

// Fallback data in case API fails
const fallbackPersonalInfo = {
  id: 'fallback',
  lang: 'AR',
  firstName: 'مصطفى',
  lastName: 'جمال',
  title: 'مطور برمجيات',
  description: 'مطور ويب متخصص في React و Next.js مع خبرة في تطوير التطبيقات الحديثة',
  bio: 'شغوف بالتكنولوجيا وتطوير الحلول المبتكرة'
};

const fallbackPersonalInfoEN = {
  id: 'fallback',
  lang: 'EN',
  firstName: 'Mostafa',
  lastName: 'Gamal',
  title: 'Software Developer',
  description: 'Full-stack web developer specialized in React and Next.js with experience in modern application development',
  bio: 'Passionate about technology and developing innovative solutions'
};

export default function EmbedPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-black flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-0">
          <CardContent className="p-8">
            <div className="animate-pulse space-y-4">
              <div className="h-20 w-20 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mx-auto"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mx-auto"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    }>
      <EmbedContent />
    </Suspense>
  );
}

function EmbedContent() {
  const searchParams = useSearchParams();
  const { theme } = useTheme();
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  // Logo hooks
  const { logo: darkLogo } = useIconLogoDark();
  const { logo: lightLogo } = useIconLogoLight();

  // Get URL parameters with defaults
  const lang = searchParams.get('lang') || 'AR';
  const primaryColor = searchParams.get('color') || '#3b82f6'; // Default blue color

  // Handle hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  // Select logo based on current theme
  const currentLogo = theme === 'dark' ? darkLogo : lightLogo;

  useEffect(() => {
    const fetchPersonalInfo = async () => {
      try {
        setLoading(true);
        setError(null);

        console.log(`Fetching personal info for language: ${lang}`);
        const response = await fetch(`/api/personal-info?lang=${lang}`);

        console.log(`API response status: ${response.status}`);

        if (!response.ok) {
          const errorText = await response.text();
          console.error(`API error response:`, errorText);
          throw new Error(`Failed to fetch personal info: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log(`Personal info loaded successfully:`, data);
        setPersonalInfo(data);
      } catch (err) {
        console.error('Error fetching personal info:', err);
        const errorMessage = err instanceof Error ? err.message : 'Failed to load personal info';
        setError(errorMessage);

        // Use fallback data
        const fallbackData = lang === 'EN' ? fallbackPersonalInfoEN : fallbackPersonalInfo;
        console.log('Using fallback data:', fallbackData);
        setPersonalInfo(fallbackData);
      } finally {
        setLoading(false);
      }
    };

    if (mounted) {
      fetchPersonalInfo();
    }
  }, [lang, mounted]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <div className="w-12 h-12 border-4 border-gray-200 dark:border-gray-700 rounded-full animate-spin"></div>
            <div className="w-12 h-12 border-4 border-transparent border-t-blue-500 rounded-full animate-spin absolute top-0 left-0"></div>
          </div>
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-blue-500 animate-pulse" />
            <span className="text-gray-600 dark:text-gray-300 font-medium">
              {lang === 'AR' ? 'جارٍ التحميل...' : 'Loading...'}
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (error && !personalInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <Card className="w-full max-w-md mx-4 border-red-200 dark:border-red-800">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">⚠️</span>
            </div>
            <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2 text-lg">
              {lang === 'AR' ? 'خطأ في التحميل' : 'Loading Error'}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              {error || (lang === 'AR' ? 'فشل في تحميل البيانات الشخصية' : 'Failed to load personal data')}
            </p>
            <p className="text-gray-500 dark:text-gray-500 text-xs mt-2">
              {lang === 'AR' ? 'جاري استخدام البيانات الاحتياطية...' : 'Using fallback data...'}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const isArabic = lang === 'AR';
  const direction = isArabic ? 'rtl' : 'ltr';

  if (!mounted) {
    return null; // Avoid hydration mismatch
  }

  if (!personalInfo) {
    return null; // Don't render if no data
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20 p-4 flex items-center justify-center relative overflow-hidden"
      dir={direction}
      style={{ fontFamily: isArabic ? 'Cairo, sans-serif' : 'Inter, sans-serif' }}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-200/20 dark:bg-blue-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-purple-200/20 dark:bg-purple-600/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-r from-blue-100/10 to-purple-100/10 dark:from-blue-800/5 dark:to-purple-800/5 rounded-full blur-3xl"></div>
      </div>

      <Card className="w-full max-w-sm relative shadow-2xl border-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl overflow-hidden group hover:shadow-3xl transition-all duration-500 ">
        {/* Header with gradient and logo */}
        <div
          className="relative h-32 overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${primaryColor}, ${primaryColor}cc, ${primaryColor}aa)`
          }}
        >
          {/* Pattern overlay */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '30px 30px'
            }}></div>
          </div>

          {/* Logo in top corner */}
          {currentLogo && (
            <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg p-1.5 border border-white/30">
              <img
                src={currentLogo.url}
                alt="Logo"
                className="w-full h-full object-contain opacity-90"
              />
            </div>
          )}

          {/* Animated background elements */}
          <div className="absolute top-4 left-4 w-12 h-12 border border-white/20 rounded-full animate-pulse"></div>
          <div className="absolute bottom-4 left-8 w-8 h-8 border border-white/30 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-8 right-12 w-6 h-6 bg-white/20 rounded-full animate-ping" style={{ animationDelay: '2s' }}></div>
        </div>

        <CardContent className="p-0 relative">
          {/* Profile Section */}
          <div className="relative px-6 pb-6">
            {/* Profile Image with enhanced styling */}
            <div className="flex justify-center -mt-16 mb-6">
              <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-400 to-purple-400 dark:from-blue-600 dark:to-purple-600 rounded-full blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
                {personalInfo.image?.url ? (
                  <img
                    src={personalInfo.image.url}
                    alt={`${personalInfo.firstName} ${personalInfo.lastName}`}
                    className="relative w-32 h-32 rounded-full object-cover border-4 border-white dark:border-gray-800 shadow-xl ring-4 ring-white/50 dark:ring-gray-800/50"
                  />
                ) : (
                  <div
                    className="relative w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 shadow-xl ring-4 ring-white/50 dark:ring-gray-800/50 flex items-center justify-center text-white text-3xl font-bold"
                    style={{
                      background: `linear-gradient(135deg, ${primaryColor}, ${primaryColor}dd)`
                    }}
                  >
                    {personalInfo.firstName.charAt(0)}{personalInfo.lastName.charAt(0)}
                  </div>
                )}
                {/* Enhanced online status indicator */}
                <div className="absolute bottom-2 right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white dark:border-gray-800 shadow-lg flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>

            {/* Name and Title with enhanced typography */}
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2 tracking-tight">
                {personalInfo.firstName} {personalInfo.lastName}
              </h1>
              <p
                className="text-base font-semibold mb-3 tracking-wide"
                style={{ color: primaryColor }}
              >
                {personalInfo.title}
              </p>
              <div className="flex justify-center">
                <Badge
                  variant="secondary"
                  className="text-xs font-medium px-3 py-1 rounded-full shadow-sm border"
                  style={{
                    backgroundColor: `${primaryColor}15`,
                    color: primaryColor,
                    borderColor: `${primaryColor}30`
                  }}
                >
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                  {isArabic ? 'متاح للعمل' : 'Available for Work'}
                </Badge>
              </div>
            </div>

            {/* Description with better spacing */}
            <div className="mb-6">
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed text-center px-2">
                {personalInfo.description}
              </p>
            </div>

            {/* Bio if available */}
            {personalInfo.bio && (
              <div className="mb-6 px-2">
                <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed text-center italic border-l-2 border-gray-200 dark:border-gray-700 pl-3">
                  {personalInfo.bio}
                </p>
              </div>
            )}

            {/* Enhanced Contact Actions */}
            <div className="space-y-3">
              <button
                className="w-full py-3 px-6 rounded-xl text-white text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-0.5 flex items-center justify-center gap-2 relative overflow-hidden group"
                style={{ backgroundColor: primaryColor }}
                onClick={() => window.open('https://wa.me/201093273277', '_blank')}
              >
                <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                <Mail className="w-4 h-4 relative z-10" />
                <span className="relative z-10">{isArabic ? 'تواصل معي' : 'Contact Me'}</span>
                <ArrowUpRight className="w-4 h-4 relative z-10 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
              </button>

              <button
                className="w-full py-3 px-6 rounded-xl text-gray-700 dark:text-gray-300 text-sm font-semibold border-2 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 flex items-center justify-center gap-2 group"
                onClick={() => window.open(process.env.NEXT_PUBLIC_APP_URL || '/', '_blank')}
              >
                <Globe className="w-4 h-4 group-hover:rotate-12 transition-transform duration-200" />
                <span>{isArabic ? 'زيارة الموقع' : 'Visit Website'}</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
              </button>
            </div>

            {/* Enhanced Footer */}
            <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800">
              <div className="flex items-center justify-center text-xs text-gray-400 dark:text-gray-500 gap-2">
                <Sparkles className="w-3 h-3" />
                <span>
                  {isArabic ? 'مدعوم بواسطة' : 'Powered by'}
                  <a href={process.env.NEXT_PUBLIC_APP_URL} className="font-semibold mx-1" style={{ color: primaryColor }}>
                    Portfolio
                  </a>
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}