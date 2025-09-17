'use client';
import { Mail, Phone, MapPin, Heart, ExternalLink } from 'lucide-react';
import { useTheme } from 'next-themes';
import { usePortfolioSection } from '@/hooks/usePortfolioSection';
import { useLanguage } from './LanguageProvider';
import { useMainLogoDark, useMainLogoLight, useWordLogoDark, useWordLogoLight } from '@/hooks/useLogo';

// Type definitions for API data
interface ContactInfo {
  id: string;
  type: string;
  label: string;
  value: string;
  link?: string;
  icon?: string;
  order: number;
  isActive: boolean;
  isPrimary: boolean;
}

interface SocialLink {
  id: string;
  name: string;
  url: string;
  icon?: string;
  order: number;
  isActive: boolean;
}

interface FooterData {
  contactInfo?: ContactInfo[];
  socialLinks?: SocialLink[];
}

const Footer = () => {
  const { language } = useLanguage();
  const { theme } = useTheme();

  // Use theme-specific logos
  const { logo: darkLogo } = useWordLogoDark();
  const { logo: lightLogo } = useWordLogoLight();

  // Select logo based on current theme
  const currentLogo =darkLogo;

  const { data: footerData, loading, isStaticData } = usePortfolioSection({ sectionName: 'footer' }) as {
    data: FooterData | null;
    loading: boolean;
    isStaticData: boolean;
  };
  const currentYear = new Date().getFullYear();

  // Static fallback data with multi-language support
  const staticSocialLinks = [
    {
      id: 'linkedin',
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/mustafa-gamal-elsayed',
      icon: 'LinkedIn',
      order: 1,
      isActive: true
    },
    {
      id: 'github',
      name: 'GitHub',
      url: 'https://github.com/MustafaGamal8',
      icon: 'GitHub',
      order: 2,
      isActive: true
    }
  ];

  const staticQuickLinks = [
    {
      name: language === 'ar' ? 'الرئيسية' : 'Home',
      href: '#hero'
    },
    {
      name: language === 'ar' ? 'عني' : 'About',
      href: '#about'
    },
    {
      name: language === 'ar' ? 'مهاراتي' : 'Skills',
      href: '#skills'
    },
    {
      name: language === 'ar' ? 'مشاريعي' : 'Projects',
      href: '#projects'
    },
    {
      name: language === 'ar' ? 'إنجازاتي' : 'Achievements',
      href: '#achievements'
    },
    {
      name: language === 'ar' ? 'تواصل معي' : 'Contact',
      href: '#contact'
    }
  ];

  const staticServices = language === 'ar' ? [
    'تطوير مواقع الويب',
    'تطبيقات الموبايل',
    'أنظمة إدارة المحتوى',
    'حلول الذكاء الاصطناعي',
    'خدمات DevOps',
    'استشارات تقنية'
  ] : [
    'Web Development',
    'Mobile Applications',
    'Content Management Systems',
    'AI Solutions',
    'DevOps Services',
    'Technical Consulting'
  ];

  // Use API data if available, otherwise use static data
  const socialLinks = footerData?.socialLinks || staticSocialLinks;
  const contactInfo = footerData?.contactInfo || [];
  const quickLinks = staticQuickLinks;
  const services = staticServices;

  // Helper function to get contact info by type
  const getContactByType = (type: string): ContactInfo | undefined => {
    return contactInfo.find((contact: ContactInfo) => contact.type === type && contact.isActive);
  };

  // Get specific contact information
  const emailContact = getContactByType('email');
  const phoneContact = getContactByType('phone');
  const locationContact = getContactByType('location');

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-gradient-to-br from-primary to-primary text-primary-foreground relative overflow-hidden">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-16 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              {/* Logo Section */}
              <div className="mb-4">
                {currentLogo ? (
                  <img
                    className="h-[60px] w-[200px]  object-cover"
                    src={currentLogo.url}
                    alt="Logo"
                  />
                ) : (
                  <h3 className="text-2xl font-bold">
                    {language === 'ar' ? 'مصطفى جمال' : 'Mostafa Gamal'}
                  </h3>
                )}
              </div>

              <p className="text-primary-foreground/80 text-sm leading-relaxed">
                {language === 'ar'
                  ? 'مهندس برمجيات، متخصص في تطوير الحلول التقنية المبتكرة التي تساعد الشركات على النمو والتطور في العصر الرقمي.'
                  : 'Software Engineer, specialized in developing innovative technical solutions that help companies grow and evolve in the digital age.'
                }
              </p>
            </div>

            <div className="space-y-3">
              {emailContact && (
                <div className="flex items-center gap-3 text-sm">
                  <Mail size={16} className="text-primary-foreground/60" />
                  {emailContact.link ? (
                    <a href={emailContact.link} className="hover:text-primary-foreground transition-colors">
                      {emailContact.value}
                    </a>
                  ) : (
                    <span>{emailContact.value}</span>
                  )}
                  {emailContact.label && emailContact.label !== emailContact.value && (
                    <span className="text-xs text-primary-foreground/60">({emailContact.label})</span>
                  )}
                </div>
              )}
              {phoneContact && (
                <div className="flex items-center gap-3 text-sm">
                  <Phone size={16} className="text-primary-foreground/60" />
                  {phoneContact.link ? (
                    <a href={phoneContact.link} className="hover:text-primary-foreground transition-colors">
                      {phoneContact.value}
                    </a>
                  ) : (
                    <span>{phoneContact.value}</span>
                  )}
                  {phoneContact.label && phoneContact.label !== phoneContact.value && (
                    <span className="text-xs text-primary-foreground/60">({phoneContact.label})</span>
                  )}
                </div>
              )}
              {locationContact && (
                <div className="flex items-center gap-3 text-sm">
                  <MapPin size={16} className="text-primary-foreground/60" />
                  <span>{locationContact.value}</span>
                  {locationContact.label && locationContact.label !== locationContact.value && (
                    <span className="text-xs text-primary-foreground/60">({locationContact.label})</span>
                  )}
                </div>
              )}

              {/* Fallback to static data if no contact info from API */}
              {!emailContact && !phoneContact && !locationContact && (
                <>
                  <div className="flex items-center gap-3 text-sm">
                    <Mail size={16} className="text-primary-foreground/60" />
                    <span>mustafa.gamal.elsayed@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Phone size={16} className="text-primary-foreground/60" />
                    <span>+201093273277</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <MapPin size={16} className="text-primary-foreground/60" />
                    <span>{language === 'ar' ? 'المنصورة، مصر' : 'Mansoura, Egypt'}</span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">
              {language === 'ar' ? 'روابط سريعة' : 'Quick Links'}
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link: any, index: number) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors duration-200 hover:translate-x-1 transform inline-block"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">
              {language === 'ar' ? 'خدماتي' : 'My Services'}
            </h4>
            <ul className="space-y-2">
              {services.map((service: any, index: number) => (
                <li key={index} className="text-sm text-primary-foreground/80 flex items-center gap-2">
                  <div className="w-1 h-1 bg-primary-foreground/60 rounded-full flex-shrink-0"></div>
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Company & Social */}
          <div>
            <h4 className="text-lg font-semibold mb-4">
              {language === 'ar' ? 'تابعني' : 'Follow Me'}
            </h4>
            <div className="space-y-4">


              <div className="flex gap-4">
                {socialLinks
                  .filter((social: any) => social.isActive !== false) // Filter out inactive social links
                  .sort((a: any, b: any) => (a.order || 0) - (b.order || 0)) // Sort by order
                  .map((social: any, index: number) => (
                    <a
                      key={social.id || index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-primary-foreground/10 rounded-lg flex items-center justify-center hover:bg-primary-foreground/20 transition-all duration-300 hover:scale-110 group"
                      aria-label={social.name}
                      title={social.name}
                    >
                      <span className="text-xs font-medium group-hover:scale-110 transition-transform duration-200">
                        {social.icon ? social.icon.charAt(0) : social.name.charAt(0)}
                      </span>
                    </a>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-primary-foreground/80">
              <span>
                {language === 'ar'
                  ? `© ${currentYear} مصطفى جمال. جميع الحقوق محفوظة.`
                  : `© ${currentYear} Mostafa Gamal. All rights reserved.`
                }
              </span>
            </div>

            <div className="flex items-center gap-2 text-sm text-primary-foreground/80">
              <span>{language === 'ar' ? 'صُنع بـ' : 'Made with'}</span>
              <Heart size={20} className="text-red-300 animate-pulse font-bold" />
              <span>{language === 'ar' ? 'في مصر' : 'in Egypt'}</span>
            </div>
          </div>

          {/* Data Source Indicator */}
          {(loading || !isStaticData) && (
            <div className="mt-4 flex items-center justify-center gap-2">
              {loading && (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground"></div>
              )}
              <span className="text-xs text-primary-foreground/60">
                {loading ? 'Loading from API...' : isStaticData ? 'Static Data' : 'Live Data ✓'}
              </span>
            </div>
          )}

          <div className="mt-4 pt-4 border-t border-primary-foreground/10">
            <p className="text-center text-xs text-primary-foreground/60 leading-relaxed">
              {language === 'ar'
                ? 'هذا الموقع تم تطويره باستخدام React, TypeScript, Tailwind CSS وأحدث تقنيات الويب. للاستفسارات والمشاريع الجديدة، لا تتردد في التواصل معي.'
                : 'This website was developed using React, TypeScript, Tailwind CSS and the latest web technologies. For inquiries and new projects, feel free to contact me.'
              }
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;