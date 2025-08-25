import { ExternalLink, Github } from 'lucide-react';

const ProjectsSection = () => {
  const projects = [
    {
      title: 'موقع شركة Webnest',
      description: 'موقع احترافي للشركة مع خدمات تطوير الويب والتطبيقات، مبني بأحدث التقنيات',
      image: '/placeholder.svg',
      tags: ['React', 'Next.js', 'Tailwind'],
      link: '#',
      github: '#'
    },
    {
      title: 'نظام محادثة ذكي داخلي',
      description: 'chatbot متطور للشركات مع ذكاء اصطناعي لخدمة العملاء وإدارة الاستفسارات',
      image: '/placeholder.svg', 
      tags: ['AI', 'Node.js', 'Python'],
      link: '#',
      github: '#'
    },
    {
      title: 'تقارير محاصيل زراعية',
      description: 'نظام تحليل المحاصيل باستخدام طائرة DJI Mavic 3M مع معالجة الصور بالذكاء الاصطناعي',
      image: '/placeholder.svg',
      tags: ['Drone Tech', 'AI', 'Image Processing'],
      link: '#',
      github: '#'
    },
    {
      title: 'تطبيق Flutter متقدم',
      description: 'تطبيق موبايل بواجهة حديثة ومميزات متقدمة للأندرويد والآيفون',
      image: '/placeholder.svg',
      tags: ['Flutter', 'Dart', 'Firebase'],
      link: '#',
      github: '#'
    },
    {
      title: 'نظام إدارة المشاريع',
      description: 'منصة شاملة لإدارة المشاريع والفرق مع تتبع المهام والتقارير التفصيلية',
      image: '/placeholder.svg',
      tags: ['Laravel', 'Vue.js', 'MySQL'],
      link: '#',
      github: '#'
    }
  ];

  return (
    <section id="projects" className="py-20 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            مشاريعي المتميزة
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            مجموعة من أفضل المشاريع التي عملت عليها باستخدام أحدث التقنيات
          </p>
        </div>

        <div className="overflow-x-auto pb-6">
          <div className="flex gap-6 w-max">
            {projects.map((project, index) => (
              <div
                key={index}
                className="project-card animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative overflow-hidden rounded-t-xl">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-card-foreground mb-3">
                    {project.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex gap-3">
                    <a
                      href={project.link}
                      className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary-dark transition-colors duration-200"
                    >
                      <ExternalLink size={16} />
                      عرض المشروع
                    </a>
                    
                    <a
                      href={project.github}
                      className="flex items-center gap-2 px-4 py-2 border border-border text-card-foreground text-sm font-medium rounded-lg hover:bg-card-hover transition-colors duration-200"
                    >
                      <Github size={16} />
                      الكود
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;