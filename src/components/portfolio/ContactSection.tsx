'use client';
import { Mail, Phone, MessageCircle, Linkedin, Github, MapPin } from 'lucide-react';
import { usePortfolioSection } from '@/hooks/usePortfolioSection';
import { useLanguage } from './LanguageProvider';

const ContactSection = () => {
  const { language } = useLanguage();
  const { data: contactData, loading, isStaticData } = usePortfolioSection({ sectionName: 'contact' });

  // Static fallback data with multi-language support
  const staticContactMethods = [
    {
      icon: <Mail size={24} />,
      label: language === 'ar' ? 'البريد الإلكتروني' : 'Email',
      value: 'mostafa@webnest.com',
      link: 'mailto:mostafa@webnest.com'
    },
    {
      icon: <Phone size={24} />,
      label: language === 'ar' ? 'رقم الهاتف' : 'Phone',
      value: '+20 100 123 4567',
      link: 'tel:+201001234567'
    },
    {
      icon: <MessageCircle size={24} />,
      label: language === 'ar' ? 'واتساب' : 'WhatsApp',
      value: language === 'ar' ? 'تواصل مباشر' : 'Direct Contact',
      link: 'https://wa.me/201001234567'
    },
    {
      icon: <Linkedin size={24} />,
      label: 'LinkedIn',
      value: 'mostafa-gamal',
      link: 'https://linkedin.com/in/mostafa-gamal'
    },
    {
      icon: <Github size={24} />,
      label: 'GitHub',
      value: 'mostafa-codes',
      link: 'https://github.com/mostafa-codes'
    },
    {
      icon: <MapPin size={24} />,
      label: language === 'ar' ? 'الموقع' : 'Location',
      value: language === 'ar' ? 'القاهرة، مصر' : 'Cairo, Egypt',
      link: '#'
    }
  ];

  // Icon mapping function for API data
  const getIconByType = (type: string) => {
    const iconMap: any = {
      'email': <Mail size={24} />,
      'phone': <Phone size={24} />,
      'whatsapp': <MessageCircle size={24} />,
      'linkedin': <Linkedin size={24} />,
      'github': <Github size={24} />,
      'location': <MapPin size={24} />
    };
    return iconMap[type] || <Mail size={24} />;
  };

  // Use API data if available, otherwise use static data
  const contactMethods = contactData?.contactMethods?.map((method: any) => ({
    ...method,
    icon: getIconByType(method.type)
  })) || staticContactMethods;

  return (
    <section id="contact" className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            {language === 'ar' ? 'تواصل معي' : 'Contact Me'}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {language === 'ar'
              ? 'جاهز لتحويل فكرتك إلى واقع؟ دعنا نتحدث عن مشروعك القادم'
              : 'Ready to turn your idea into reality? Let\'s discuss your next project'
            }
          </p>

          {/* Data Source Indicator */}
          {(loading || !isStaticData) && (
            <div className="mt-4 flex items-center justify-center gap-2">
              {loading && (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
              )}
              <span className="text-xs text-muted-foreground">
                {loading ? 'Loading from API...' : isStaticData ? 'Static Data' : 'Live Data ✓'}
              </span>
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="grid gap-4">
              {contactMethods.map((method: any, index: number) => (
                <a
                  key={index}
                  href={method.link}
                  className="flex items-center gap-4 p-4 bg-card rounded-lg shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-soft)] transition-all duration-300 hover:scale-105 group"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    {method.icon}
                  </div>

                  <div className="flex-1">
                    <div className="font-medium text-card-foreground">
                      {method.label}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {method.value}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* CTA Card */}
          <div className="contact-card">
            <div className="text-center">
              <div className="text-6xl mb-6">🚀</div>

              <h3 className="text-2xl font-bold mb-4">
                {language === 'ar' ? 'لنبدأ مشروعك معاً' : 'Let\'s Start Your Project Together'}
              </h3>

              <p className="text-sm opacity-90 mb-8 leading-relaxed">
                {language === 'ar'
                  ? 'أحول أفكارك إلى حلول تقنية متطورة تساعد عملك على النمو والازدهار. خبرة + إبداع + جودة = نجاح مشروعك'
                  : 'I transform your ideas into advanced technical solutions that help your business grow and thrive. Experience + Creativity + Quality = Your Project Success'
                }
              </p>

              <div className="space-y-4">
                <a
                  href={`https://wa.me/201001234567?text=${language === 'ar' ? 'مرحباً، أود مناقشة مشروع جديد' : 'Hello, I would like to discuss a new project'}`}
                  className="inline-flex items-center justify-center gap-3 w-full px-8 py-4 bg-white text-primary font-medium rounded-lg hover:bg-gray-50 transition-all duration-300 hover:scale-105"
                >
                  <MessageCircle size={20} />
                  {language === 'ar' ? 'ابدأ مشروعك معي الآن 🚀' : 'Start Your Project Now 🚀'}
                </a>

                <div className="mt-6">
                  <p className="text-xs opacity-75 mb-3">
                    {language === 'ar' ? 'أو امسح الكود للتواصل السريع' : 'Or scan the code for quick contact'}
                  </p>
                  <div className="bg-white p-4 rounded-lg mx-auto w-32 h-32 flex items-center justify-center">
                    <div className="text-xs text-gray-500 text-center">
                      QR Code<br />
                      WhatsApp<br />
                      Contact
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;