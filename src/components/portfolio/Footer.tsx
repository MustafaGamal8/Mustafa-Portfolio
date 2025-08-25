'use client';
import { Mail, Phone, MapPin, Heart, ExternalLink } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { name: 'LinkedIn', url: 'https://linkedin.com/in/mostafa-gamal', icon: 'LinkedIn' },
    { name: 'GitHub', url: 'https://github.com/mostafa-codes', icon: 'GitHub' },
    { name: 'Twitter', url: 'https://twitter.com/mostafa_codes', icon: 'Twitter' },
    { name: 'Instagram', url: 'https://instagram.com/mostafa.codes', icon: 'Instagram' }
  ];

  const quickLinks = [
    { name: 'الرئيسية', href: '#hero' },
    { name: 'عني', href: '#about' },
    { name: 'مهاراتي', href: '#skills' },
    { name: 'مشاريعي', href: '#projects' },
    { name: 'إنجازاتي', href: '#achievements' },
    { name: 'تواصل معي', href: '#contact' }
  ];

  const services = [
    'تطوير مواقع الويب',
    'تطبيقات الموبايل',
    'أنظمة إدارة المحتوى',
    'حلول الذكاء الاصطناعي',
    'خدمات DevOps',
    'استشارات تقنية'
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-gradient-to-br from-primary to-primary-dark text-primary-foreground relative overflow-hidden">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-16 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-2">مصطفى جمال</h3>
              <p className="text-primary-foreground/80 text-sm leading-relaxed">
                مهندس برمجيات ومؤسس Webnest، متخصص في تطوير الحلول التقنية المبتكرة 
                التي تساعد الشركات على النمو والتطور في العصر الرقمي.
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Mail size={16} className="text-primary-foreground/60" />
                <span>mostafa@webnest.com.eg</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone size={16} className="text-primary-foreground/60" />
                <span>+20 100 123 4567</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <MapPin size={16} className="text-primary-foreground/60" />
                <span>القاهرة، مصر</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">روابط سريعة</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
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
            <h4 className="text-lg font-semibold mb-4">خدماتي</h4>
            <ul className="space-y-2">
              {services.map((service, index) => (
                <li key={index} className="text-sm text-primary-foreground/80 flex items-center gap-2">
                  <div className="w-1 h-1 bg-primary-foreground/60 rounded-full flex-shrink-0"></div>
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Company & Social */}
          <div>
            <h4 className="text-lg font-semibold mb-4">تابعني</h4>
            <div className="space-y-4">
              <div>
                <a
                  href="https://webnest.com.eg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors duration-200 group"
                >
                  <span>شركة Webnest</span>
                  <ExternalLink size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
                </a>
              </div>
              
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-primary-foreground/10 rounded-lg flex items-center justify-center hover:bg-primary-foreground/20 transition-all duration-300 hover:scale-110 group"
                    aria-label={social.name}
                  >
                    <span className="text-xs font-medium group-hover:scale-110 transition-transform duration-200">
                      {social.icon.charAt(0)}
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
              <span>© {currentYear} مصطفى جمال. جميع الحقوق محفوظة.</span>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-primary-foreground/80">
              <span>صُنع بـ</span>
              <Heart size={16} className="text-red-300 animate-pulse" />
              <span>في مصر</span>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-primary-foreground/10">
            <p className="text-center text-xs text-primary-foreground/60 leading-relaxed">
              هذا الموقع تم تطويره باستخدام React, TypeScript, Tailwind CSS وأحدث تقنيات الويب. 
              للاستفسارات والمشاريع الجديدة، لا تتردد في التواصل معي.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;