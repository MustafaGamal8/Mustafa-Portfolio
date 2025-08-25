'use client';
import { useState } from 'react';

const SkillsSection = () => {
  const [activeSkill, setActiveSkill] = useState<number | null>(null);

  const skills = [
    { name: 'React & Next.js', description: 'تطوير واجهات مستخدم تفاعلية وحديثة', icon: '⚛️' },
    { name: 'Laravel & PHP', description: 'بناء أنظمة خلفية قوية وآمنة', icon: '🐘' },
    { name: 'Flutter & Dart', description: 'تطبيقات موبايل متعددة المنصات', icon: '📱' },
    { name: 'DevOps & AWS', description: 'إدارة الخوادم ونشر التطبيقات', icon: '☁️' },
    { name: 'AI & ML', description: 'تطوير حلول ذكية ومعالجة البيانات', icon: '🤖' },
    { name: 'Automation', description: 'أتمتة العمليات وزيادة الكفاءة', icon: '⚙️' },
    { name: 'Drone Tech', description: 'تقنيات الطائرات المسيرة والتصوير', icon: '🚁' },
    { name: 'Database Design', description: 'تصميم قواعد البيانات المحسنة', icon: '🗄️' }
  ];

  const radius = 200;
  const centerX = 250;
  const centerY = 250;

  return (
    <section id="skills" className="py-20 px-4 bg-card-hover">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            مهاراتي التقنية
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            مرر على أي مهارة لتعرف المزيد عنها
          </p>
        </div>

        <div className="flex justify-center">
          <div className="relative w-[500px] h-[500px]">
            {/* Center Circle */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-br from-primary to-primary-light rounded-full flex items-center justify-center shadow-[var(--shadow-hover)] transition-all duration-300">
              <div className="text-center text-primary-foreground">
                {activeSkill !== null ? (
                  <div className="animate-fade-in-up">
                    <div className="text-2xl mb-1">{skills[activeSkill].icon}</div>
                    <div className="text-xs font-medium">{skills[activeSkill].description}</div>
                  </div>
                ) : (
                  <div>
                    <div className="text-2xl mb-1">🚀</div>
                    <div className="text-xs font-medium">اختر مهارة</div>
                  </div>
                )}
              </div>
            </div>

            {/* Skills in Circle */}
            {skills.map((skill, index) => {
              const angle = (index * 360) / skills.length;
              const x = centerX + radius * Math.cos((angle - 90) * Math.PI / 180);
              const y = centerY + radius * Math.sin((angle - 90) * Math.PI / 180);

              return (
                <div
                  key={index}
                  className={`absolute w-20 h-20 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 transform hover:scale-110 ${activeSkill === index
                      ? 'bg-gradient-to-br from-primary to-primary-light text-primary-foreground shadow-[var(--shadow-hover)]'
                      : 'bg-card text-card-foreground shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-soft)]'
                    }`}
                  style={{
                    left: `${x - 40}px`,
                    top: `${y - 40}px`,
                    animationDelay: `${index * 0.1}s`
                  }}
                  onMouseEnter={() => setActiveSkill(index)}
                  onMouseLeave={() => setActiveSkill(null)}
                >
                  <div className="text-center">
                    <div className="text-lg mb-1">{skill.icon}</div>
                    <div className="text-xs font-medium text-center leading-tight">
                      {skill.name}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;