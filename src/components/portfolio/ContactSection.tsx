'use client';
import { Mail, Phone, MessageCircle, Linkedin, Github, MapPin } from 'lucide-react';

const ContactSection = () => {
  const contactMethods = [
    {
      icon: <Mail size={24} />,
      label: 'البريد الإلكتروني',
      value: 'mostafa@webnest.com',
      link: 'mailto:mostafa@webnest.com'
    },
    {
      icon: <Phone size={24} />,
      label: 'رقم الهاتف',
      value: '+20 100 123 4567',
      link: 'tel:+201001234567'
    },
    {
      icon: <MessageCircle size={24} />,
      label: 'واتساب',
      value: 'تواصل مباشر',
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
      label: 'الموقع',
      value: 'القاهرة، مصر',
      link: '#'
    }
  ];

  return (
    <section id="contact" className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            تواصل معي
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            جاهز لتحويل فكرتك إلى واقع؟ دعنا نتحدث عن مشروعك القادم
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="grid gap-4">
              {contactMethods.map((method, index) => (
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
                لنبدأ مشروعك معاً
              </h3>
              
              <p className="text-sm opacity-90 mb-8 leading-relaxed">
                أحول أفكارك إلى حلول تقنية متطورة تساعد عملك على النمو والازدهار. 
                خبرة + إبداع + جودة = نجاح مشروعك
              </p>
              
              <div className="space-y-4">
                <a
                  href="https://wa.me/201001234567?text=مرحباً، أود مناقشة مشروع جديد"
                  className="inline-flex items-center justify-center gap-3 w-full px-8 py-4 bg-white text-primary font-medium rounded-lg hover:bg-gray-50 transition-all duration-300 hover:scale-105"
                >
                  <MessageCircle size={20} />
                  ابدأ مشروعك معي الآن 🚀
                </a>
                
                <div className="mt-6">
                  <p className="text-xs opacity-75 mb-3">أو امسح الكود للتواصل السريع</p>
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