import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Clear existing data
  console.log('🧹 Cleaning existing data...');
  await prisma.socialLink.deleteMany();
  await prisma.contactInfo.deleteMany();
  await prisma.achievement.deleteMany();
  await prisma.skill.deleteMany();
  await prisma.skillCategory.deleteMany();
  await prisma.project.deleteMany();
  await prisma.aboutCard.deleteMany();
  await prisma.heroContent.deleteMany();
  await prisma.personalInfo.deleteMany();
  await prisma.file.deleteMany();

  // Create Files for images
  console.log('📁 Creating file records...');
  const profileImageFile = await prisma.file.create({
    data: {
      name: 'profile-image.jpg',
      url: '/assets/profile-image.jpg',
      path: '/public/assets/profile-image.jpg',
      type: 'image/jpeg',
      size: 245760 // ~240KB
    }
  });

  // Create project images
  const projectImages = await Promise.all([
    prisma.file.create({
      data: {
        name: 'project-web.jpg',
        url: '/assets/project-web.jpg',
        path: '/public/assets/project-web.jpg',
        type: 'image/jpeg',
        size: 512000
      }
    }),
    prisma.file.create({
      data: {
        name: 'project-chatbot.jpg',
        url: '/assets/project-chatbot.jpg',
        path: '/public/assets/project-chatbot.jpg',
        type: 'image/jpeg',
        size: 487680
      }
    }),
    prisma.file.create({
      data: {
        name: 'project-drone.jpg',
        url: '/assets/project-drone.jpg',
        path: '/public/assets/project-drone.jpg',
        type: 'image/jpeg',
        size: 623104
      }
    }),
    prisma.file.create({
      data: {
        name: 'project-flutter.jpg',
        url: '/assets/project-flutter.jpg',
        path: '/public/assets/project-flutter.jpg',
        type: 'image/jpeg',
        size: 456789
      }
    }),
    prisma.file.create({
      data: {
        name: 'project-management.jpg',
        url: '/assets/project-management.jpg',
        path: '/public/assets/project-management.jpg',
        type: 'image/jpeg',
        size: 534567
      }
    }),
    prisma.file.create({
      data: {
        name: 'project-ecommerce.jpg',
        url: '/assets/project-ecommerce.jpg',
        path: '/public/assets/project-ecommerce.jpg',
        type: 'image/jpeg',
        size: 489123
      }
    })
  ]);

  // Create Personal Info
  console.log('👤 Creating personal info...');
  await prisma.personalInfo.createMany({
    data: [
      {
        lang: 'AR',
        firstName: 'مصطفى',
        lastName: 'جمال',
        title: 'مهندس برمجيات ومؤسس Webnest',
        description: 'مهندس برمجيات متخصص في تطوير الحلول التقنية المبتكرة، مؤسس شركة Webnest لحلول الويب والتطبيقات الذكية.',
        bio: 'أجمع بين الخبرة التقنية والفهم العميق لاحتياجات السوق المحلي والعالمي. أركز على بناء حلول تقنية مبتكرة تساعد الشركات والأفراد على تحقيق أهدافهم.',
        imageId: profileImageFile.id
      },
      {
        lang: 'EN',
        firstName: 'Mostafa',
        lastName: 'Gamal',
        title: 'Software Engineer & Webnest Founder',
        description: 'Software engineer specialized in developing innovative technical solutions, founder of Webnest company for web and smart applications solutions.',
        bio: 'I combine technical expertise with deep understanding of local and global market needs. I focus on building innovative technical solutions that help companies and individuals achieve their goals.',
        imageId: profileImageFile.id
      }
    ]
  });

  // Create Hero Content
  console.log('🦸 Creating hero content...');
  await prisma.heroContent.createMany({
    data: [
      {
        lang: 'AR',
        name: 'مصطفى جمال',
        mainTitle: 'مهندس برمجيات ومبتكر حلول',
        subTitle: 'أحول الأفكار إلى واقع رقمي',
        description: 'مرحباً بك! أنا مصطفى، مهندس برمجيات شغوف بتطوير الحلول التقنية المبتكرة. أتخصص في تطوير تطبيقات الويب والموبايل، وأعمل على مشاريع الذكاء الاصطناعي والأتمتة.',
        dynamicTexts: ['مطور ويب', 'مطور Flutter', 'خبير DevOps', 'مؤسس شركة', 'مطور AI', 'مبتكر حلول'],
        ctaText: 'تواصل معي',
        profileImageId: profileImageFile.id
      },
      {
        lang: 'EN',
        name: 'Mostafa Gamal',
        mainTitle: 'Software Engineer & Solution Innovator',
        subTitle: 'Turning ideas into digital reality',
        description: 'Welcome! I\'m Mostafa, a passionate software engineer dedicated to developing innovative technical solutions. I specialize in web and mobile app development, and work on AI and automation projects.',
        dynamicTexts: ['Web Developer', 'Flutter Expert', 'DevOps Expert', 'Company Founder', 'AI Developer', 'Solution Innovator'],
        ctaText: 'Contact Me',
        profileImageId: profileImageFile.id
      }
    ]
  });

  // Create About Cards
  console.log('📋 Creating about cards...');
  const aboutCardsAr = [
    {
      lang: 'AR' as const,
      title: 'مين أنا؟',
      question: 'مين أنا؟',
      answer: 'مهندس برمجيات متخصص في تطوير الحلول التقنية المبتكرة، مؤسس شركة Webnest لحلول الويب والتطبيقات الذكية. أجمع بين الخبرة التقنية والفهم العميق لاحتياجات السوق المحلي والعالمي.',
      gradient: 'from-blue-500 to-purple-600',
      order: 0
    },
    {
      lang: 'AR' as const,
      title: 'بدأت منين؟',
      question: 'بدأت منين؟',
      answer: 'بدأت رحلتي في WE School for Applied Technology حيث تعلمت أساسيات هندسة البرمجيات. ثم طورت مهاراتي من خلال العمل على مشاريع حقيقية ومتنوعة في مجالات مختلفة من تطوير الويب إلى الذكاء الاصطناعي.',
      gradient: 'from-green-500 to-teal-600',
      order: 1
    },
    {
      lang: 'AR' as const,
      title: 'بعمل إيه دلوقتي؟',
      question: 'بعمل إيه دلوقتي؟',
      answer: 'حالياً طالب في Delta Higher Institute وأعمل كمهندس برمجيات في مشاريع متنوعة. أركز على تطوير تطبيقات الويب بـ React، تطبيقات الموبايل بـ Flutter، وأنظمة DevOps مع خبرة في الذكاء الاصطناعي وتقنيات الطائرات المسيرة.',
      gradient: 'from-orange-500 to-red-600',
      order: 2
    },
    {
      lang: 'AR' as const,
      title: 'إيه تخصصي؟',
      question: 'إيه تخصصي؟',
      answer: 'متخصص في Full Stack Development مع خبرة عميقة في React.js, Next.js, Laravel, Flutter, وأنظمة DevOps. كما أعمل مع تقنيات الذكاء الاصطناعي، معالجة الصور، وتطوير حلول مبتكرة للشركات والمؤسسات.',
      gradient: 'from-purple-500 to-pink-600',
      order: 3
    },
    {
      lang: 'AR' as const,
      title: 'إيه هدفي؟',
      question: 'إيه هدفي؟',
      answer: 'هدفي بناء حلول تقنية مبتكرة تساعد الشركات والأفراد على تحقيق أهدافهم وتطوير أعمالهم. أسعى لتوفير تجربة مستخدم استثنائية وحلول تقنية فعالة تواكب التطور التكنولوجي السريع.',
      gradient: 'from-indigo-500 to-blue-600',
      order: 4
    },
    {
      lang: 'AR' as const,
      title: 'إيه اللي يميزني؟',
      question: 'إيه اللي يميزني؟',
      answer: 'يميزني الجمع بين الخبرة التقنية العميقة والفهم الواضح لاحتياجات السوق. أركز على كتابة كود نظيف وقابل للصيانة، مع اتباع أفضل الممارسات في التطوير والتصميم لضمان تقديم منتجات عالية الجودة.',
      gradient: 'from-yellow-500 to-orange-600',
      order: 5
    }
  ];

  const aboutCardsEn = [
    {
      lang: 'EN' as const,
      title: 'Who am I?',
      question: 'Who am I?',
      answer: 'A software engineer specialized in developing innovative technical solutions, founder of Webnest company for web and smart applications solutions. I combine technical expertise with deep understanding of local and global market needs.',
      gradient: 'from-blue-500 to-purple-600',
      order: 0
    },
    {
      lang: 'EN' as const,
      title: 'Where did I start?',
      question: 'Where did I start?',
      answer: 'I started my journey at WE School for Applied Technology where I learned the fundamentals of software engineering. Then I developed my skills by working on real and diverse projects in different fields from web development to artificial intelligence.',
      gradient: 'from-green-500 to-teal-600',
      order: 1
    },
    {
      lang: 'EN' as const,
      title: 'What do I do now?',
      question: 'What do I do now?',
      answer: 'Currently a student at Delta Higher Institute and working as a software engineer on various projects. I focus on developing web applications with React, mobile applications with Flutter, and DevOps systems with experience in AI and drone technologies.',
      gradient: 'from-orange-500 to-red-600',
      order: 2
    },
    {
      lang: 'EN' as const,
      title: 'What\'s my specialty?',
      question: 'What\'s my specialty?',
      answer: 'Specialized in Full Stack Development with deep experience in React.js, Next.js, Laravel, Flutter, and DevOps systems. I also work with AI technologies, image processing, and developing innovative solutions for companies and institutions.',
      gradient: 'from-purple-500 to-pink-600',
      order: 3
    },
    {
      lang: 'EN' as const,
      title: 'What\'s my goal?',
      question: 'What\'s my goal?',
      answer: 'My goal is to build innovative technical solutions that help companies and individuals achieve their goals and develop their businesses. I strive to provide exceptional user experience and effective technical solutions that keep up with rapid technological development.',
      gradient: 'from-indigo-500 to-blue-600',
      order: 4
    },
    {
      lang: 'EN' as const,
      title: 'What makes me unique?',
      question: 'What makes me unique?',
      answer: 'What distinguishes me is combining deep technical expertise with clear understanding of market needs. I focus on writing clean and maintainable code, following best practices in development and design to ensure delivering high-quality products.',
      gradient: 'from-yellow-500 to-orange-600',
      order: 5
    }
  ];

  await prisma.aboutCard.createMany({
    data: [...aboutCardsAr, ...aboutCardsEn]
  });

  // Create Skill Categories
  console.log('💪 Creating skill categories...');
  const skillCategoriesData = [
    // Arabic
    {
      lang: 'AR' as const,
      title: 'تطوير الويب',
      description: 'بناء مواقع وتطبيقات ويب حديثة وسريعة باستخدام أحدث التقنيات والأطر البرمجية.',
      gradient: 'from-blue-500 to-cyan-600',
      experience: '5+ سنوات خبرة',
      projectCount: 15,
      order: 0
    },
    {
      lang: 'AR' as const,
      title: 'تطوير التطبيقات',
      description: 'تطوير تطبيقات موبايل متعددة المنصات بواجهات مستخدم جميلة وأداء عالي.',
      gradient: 'from-green-500 to-emerald-600',
      experience: '3+ سنوات خبرة',
      projectCount: 8,
      order: 1
    },
    {
      lang: 'AR' as const,
      title: 'DevOps والسحابة',
      description: 'إدارة وأتمتة البنية التحتية السحابية لضمان الأداء العالي والموثوقية.',
      gradient: 'from-purple-500 to-violet-600',
      experience: '3+ سنوات خبرة',
      projectCount: 10,
      order: 2
    },
    {
      lang: 'AR' as const,
      title: 'الذكاء الاصطناعي',
      description: 'تطوير حلول ذكية باستخدام الذكاء الاصطناعي وتعلم الآلة لمعالجة البيانات.',
      gradient: 'from-orange-500 to-red-600',
      experience: '2+ سنوات خبرة',
      projectCount: 6,
      order: 3
    },
    {
      lang: 'AR' as const,
      title: 'قواعد البيانات',
      description: 'تصميم وإدارة قواعد البيانات المحسنة للأداء العالي والأمان.',
      gradient: 'from-indigo-500 to-blue-600',
      experience: '4+ سنوات خبرة',
      projectCount: 20,
      order: 4
    },
    // English
    {
      lang: 'EN' as const,
      title: 'Web Development',
      description: 'Building modern and fast websites and web applications using the latest technologies and frameworks.',
      gradient: 'from-blue-500 to-cyan-600',
      experience: '5+ years experience',
      projectCount: 15,
      order: 0
    },
    {
      lang: 'EN' as const,
      title: 'Mobile Development',
      description: 'Developing cross-platform mobile applications with beautiful user interfaces and high performance.',
      gradient: 'from-green-500 to-emerald-600',
      experience: '3+ years experience',
      projectCount: 8,
      order: 1
    },
    {
      lang: 'EN' as const,
      title: 'DevOps & Cloud',
      description: 'Managing and automating cloud infrastructure to ensure high performance and reliability.',
      gradient: 'from-purple-500 to-violet-600',
      experience: '3+ years experience',
      projectCount: 10,
      order: 2
    },
    {
      lang: 'EN' as const,
      title: 'Artificial Intelligence',
      description: 'Developing intelligent solutions using artificial intelligence and machine learning for data processing.',
      gradient: 'from-orange-500 to-red-600',
      experience: '2+ years experience',
      projectCount: 6,
      order: 3
    },
    {
      lang: 'EN' as const,
      title: 'Database',
      description: 'Designing and managing optimized databases for high performance and security.',
      gradient: 'from-indigo-500 to-blue-600',
      experience: '4+ years experience',
      projectCount: 20,
      order: 4
    }
  ];

  const skillCategories = await Promise.all(
    skillCategoriesData.map(category =>
      prisma.skillCategory.create({
        data: category
      })
    )
  );

  // Create Skills
  console.log('🛠️ Creating skills...');
  const skillsData = [
    // Web Development Skills - Arabic
    { lang: 'AR', name: 'React.js & Next.js', level: 'EXPERT', categoryIndex: 0, order: 0 },
    { lang: 'AR', name: 'Laravel & PHP', level: 'ADVANCED', categoryIndex: 0, order: 1 },
    { lang: 'AR', name: 'Node.js & Express', level: 'ADVANCED', categoryIndex: 0, order: 2 },
    { lang: 'AR', name: 'TypeScript', level: 'ADVANCED', categoryIndex: 0, order: 3 },
    { lang: 'AR', name: 'Tailwind CSS', level: 'EXPERT', categoryIndex: 0, order: 4 },
    { lang: 'AR', name: 'REST & GraphQL APIs', level: 'ADVANCED', categoryIndex: 0, order: 5 },

    // Mobile Development Skills - Arabic
    { lang: 'AR', name: 'Flutter & Dart', level: 'ADVANCED', categoryIndex: 1, order: 0 },
    { lang: 'AR', name: 'React Native', level: 'INTERMEDIATE', categoryIndex: 1, order: 1 },
    { lang: 'AR', name: 'iOS & Android Native', level: 'INTERMEDIATE', categoryIndex: 1, order: 2 },
    { lang: 'AR', name: 'Firebase Integration', level: 'ADVANCED', categoryIndex: 1, order: 3 },

    // DevOps Skills - Arabic
    { lang: 'AR', name: 'AWS & Azure', level: 'ADVANCED', categoryIndex: 2, order: 0 },
    { lang: 'AR', name: 'Docker & Kubernetes', level: 'ADVANCED', categoryIndex: 2, order: 1 },
    { lang: 'AR', name: 'CI/CD Pipelines', level: 'ADVANCED', categoryIndex: 2, order: 2 },
    { lang: 'AR', name: 'Linux Administration', level: 'ADVANCED', categoryIndex: 2, order: 3 },

    // AI Skills - Arabic
    { lang: 'AR', name: 'Python & TensorFlow', level: 'ADVANCED', categoryIndex: 3, order: 0 },
    { lang: 'AR', name: 'Natural Language Processing', level: 'INTERMEDIATE', categoryIndex: 3, order: 1 },
    { lang: 'AR', name: 'Computer Vision', level: 'INTERMEDIATE', categoryIndex: 3, order: 2 },
    { lang: 'AR', name: 'Machine Learning', level: 'ADVANCED', categoryIndex: 3, order: 3 },

    // Database Skills - Arabic
    { lang: 'AR', name: 'MySQL & PostgreSQL', level: 'EXPERT', categoryIndex: 4, order: 0 },
    { lang: 'AR', name: 'MongoDB & Redis', level: 'ADVANCED', categoryIndex: 4, order: 1 },
    { lang: 'AR', name: 'Database Design', level: 'EXPERT', categoryIndex: 4, order: 2 },
    { lang: 'AR', name: 'Query Optimization', level: 'ADVANCED', categoryIndex: 4, order: 3 },

    // Web Development Skills - English
    { lang: 'EN', name: 'React.js & Next.js', level: 'EXPERT', categoryIndex: 5, order: 0 },
    { lang: 'EN', name: 'Laravel & PHP', level: 'ADVANCED', categoryIndex: 5, order: 1 },
    { lang: 'EN', name: 'Node.js & Express', level: 'ADVANCED', categoryIndex: 5, order: 2 },
    { lang: 'EN', name: 'TypeScript', level: 'ADVANCED', categoryIndex: 5, order: 3 },
    { lang: 'EN', name: 'Tailwind CSS', level: 'EXPERT', categoryIndex: 5, order: 4 },
    { lang: 'EN', name: 'REST & GraphQL APIs', level: 'ADVANCED', categoryIndex: 5, order: 5 },

    // Mobile Development Skills - English
    { lang: 'EN', name: 'Flutter & Dart', level: 'ADVANCED', categoryIndex: 6, order: 0 },
    { lang: 'EN', name: 'React Native', level: 'INTERMEDIATE', categoryIndex: 6, order: 1 },
    { lang: 'EN', name: 'iOS & Android Native', level: 'INTERMEDIATE', categoryIndex: 6, order: 2 },
    { lang: 'EN', name: 'Firebase Integration', level: 'ADVANCED', categoryIndex: 6, order: 3 },

    // DevOps Skills - English
    { lang: 'EN', name: 'AWS & Azure', level: 'ADVANCED', categoryIndex: 7, order: 0 },
    { lang: 'EN', name: 'Docker & Kubernetes', level: 'ADVANCED', categoryIndex: 7, order: 1 },
    { lang: 'EN', name: 'CI/CD Pipelines', level: 'ADVANCED', categoryIndex: 7, order: 2 },
    { lang: 'EN', name: 'Linux Administration', level: 'ADVANCED', categoryIndex: 7, order: 3 },

    // AI Skills - English
    { lang: 'EN', name: 'Python & TensorFlow', level: 'ADVANCED', categoryIndex: 8, order: 0 },
    { lang: 'EN', name: 'Natural Language Processing', level: 'INTERMEDIATE', categoryIndex: 8, order: 1 },
    { lang: 'EN', name: 'Computer Vision', level: 'INTERMEDIATE', categoryIndex: 8, order: 2 },
    { lang: 'EN', name: 'Machine Learning', level: 'ADVANCED', categoryIndex: 8, order: 3 },

    // Database Skills - English
    { lang: 'EN', name: 'MySQL & PostgreSQL', level: 'EXPERT', categoryIndex: 9, order: 0 },
    { lang: 'EN', name: 'MongoDB & Redis', level: 'ADVANCED', categoryIndex: 9, order: 1 },
    { lang: 'EN', name: 'Database Design', level: 'EXPERT', categoryIndex: 9, order: 2 },
    { lang: 'EN', name: 'Query Optimization', level: 'ADVANCED', categoryIndex: 9, order: 3 }
  ];

  await Promise.all(
    skillsData.map(skill =>
      prisma.skill.create({
        data: {
          lang: skill.lang as 'AR' | 'EN',
          name: skill.name,
          level: skill.level as any,
          order: skill.order,
          skillCategoryId: skillCategories[skill.categoryIndex].id
        }
      })
    )
  );

  // Create Projects
  console.log('🚀 Creating projects...');
  const projectsData = [
    // Arabic Projects
    {
      lang: 'AR' as const,
      title: 'منصة Webnest الشاملة',
      description: 'موقع شركة متقدم يقدم خدمات تطوير الويب والتطبيقات مع نظام إدارة محتوى متطور ولوحة تحكم شاملة للعملاء والمشاريع.',
      longDescription: 'منصة شاملة تضم موقع الشركة، نظام CRM متطور، لوحة تحكم للمشاريع، وسائل الدفع المتعددة، وتقارير تفصيلية. المنصة تدعم عدة لغات ومحسنة للسيو.',
      imageId: projectImages[0].id,
      status: 'COMPLETED' as const,
      category: 'web',
      projectUrl: 'https://webnest.com.eg',
      githubUrl: 'https://github.com/mostafa/webnest',
      duration: '4 أشهر',
      teamSize: '3 مطورين',
      technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind', 'Laravel API'],
      features: ['نظام إدارة محتوى', 'متعدد اللغات', 'محسن للسيو', 'لوحة تحكم شاملة'],
      order: 0,
      isFeatured: true
    },
    {
      lang: 'AR' as const,
      title: 'نظام ChatBot AI المتطور',
      description: 'chatbot ذكي للشركات مع معالجة اللغة الطبيعية، تعلم آلي، ودمج مع أنظمة CRM لخدمة عملاء متفوقة على مدار الساعة.',
      longDescription: 'نظام ذكاء اصطناعي متقدم يدعم المحادثات باللغة العربية والإنجليزية، مع قدرات تعلم مستمر وتحليل للمشاعر، ودمج مع أنظمة الشركة المختلفة.',
      imageId: projectImages[1].id,
      status: 'COMPLETED' as const,
      category: 'ai',
      projectUrl: 'https://demo.chatbot-ai.com',
      githubUrl: 'https://github.com/mostafa/ai-chatbot',
      duration: '6 أشهر',
      teamSize: '2 مطورين',
      technologies: ['Python', 'TensorFlow', 'NLP', 'FastAPI', 'Redis'],
      features: ['معالجة اللغة الطبيعية', 'تعلم آلي', 'دعم متعدد اللغات', 'تحليل المشاعر'],
      order: 1,
      isFeatured: true
    },
    {
      lang: 'AR' as const,
      title: 'منصة الزراعة الذكية',
      description: 'نظام متكامل لمراقبة المحاصيل باستخدام طائرة DJI Mavic 3M مع معالجة الصور بالذكاء الاصطناعي وتحليل البيانات الزراعية.',
      longDescription: 'منصة شاملة تجمع بين تقنيات الطائرات المسيرة والذكاء الاصطناعي لمراقبة المحاصيل، تحليل التربة، كشف الآفات، وتوفير توصيات زراعية مخصصة للمزارعين.',
      imageId: projectImages[2].id,
      status: 'COMPLETED' as const,
      category: 'iot',
      projectUrl: 'https://smart-agriculture.com',
      githubUrl: 'https://github.com/mostafa/smart-agriculture',
      duration: '8 أشهر',
      teamSize: '4 مطورين',
      technologies: ['Python', 'OpenCV', 'Machine Learning', 'IoT', 'React Dashboard'],
      features: ['تحليل الصور الجوية', 'كشف الآفات', 'تحليل التربة', 'تقارير مفصلة'],
      order: 2,
      isFeatured: false
    },
    {
      lang: 'AR' as const,
      title: 'تطبيق EcoLife Mobile',
      description: 'تطبيق Flutter متعدد المنصات للحياة الصحية والبيئية مع تتبع الأنشطة، نصائح بيئية، ونظام مكافآت تفاعلي.',
      longDescription: 'تطبيق شامل يساعد المستخدمين على تبني نمط حياة صحي وصديق للبيئة، مع ميزات تتبع الأنشطة، حساب البصمة الكربونية، ومجتمع تفاعلي للمستخدمين.',
      imageId: projectImages[3].id,
      status: 'COMPLETED' as const,
      category: 'mobile',
      projectUrl: 'https://apps.apple.com/ecolife',
      githubUrl: 'https://github.com/mostafa/ecolife-app',
      duration: '5 أشهر',
      teamSize: '2 مطورين',
      technologies: ['Flutter', 'Dart', 'Firebase', 'Google Maps API', 'Push Notifications'],
      features: ['تتبع الأنشطة', 'حساب البصمة الكربونية', 'نظام مكافآت', 'مجتمع تفاعلي'],
      order: 3,
      isFeatured: true
    },

    // English Projects
    {
      lang: 'EN' as const,
      title: 'Webnest Comprehensive Platform',
      description: 'Advanced company website providing web and application development services with sophisticated content management system and comprehensive dashboard for clients and projects.',
      longDescription: 'Comprehensive platform including company website, advanced CRM system, project control dashboard, multiple payment methods, and detailed reports. The platform supports multiple languages and is SEO optimized.',
      imageId: projectImages[0].id,
      status: 'COMPLETED' as const,
      category: 'web',
      projectUrl: 'https://webnest.com.eg',
      githubUrl: 'https://github.com/mostafa/webnest',
      duration: '4 months',
      teamSize: '3 developers',
      technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind', 'Laravel API'],
      features: ['Content Management System', 'Multi-language', 'SEO Optimized', 'Comprehensive Dashboard'],
      order: 0,
      isFeatured: true
    },
    {
      lang: 'EN' as const,
      title: 'Advanced ChatBot AI System',
      description: 'Smart chatbot for businesses with natural language processing, machine learning, and CRM integration for superior 24/7 customer service.',
      longDescription: 'Advanced AI system supporting conversations in Arabic and English, with continuous learning capabilities and sentiment analysis, integrated with various company systems.',
      imageId: projectImages[1].id,
      status: 'COMPLETED' as const,
      category: 'ai',
      projectUrl: 'https://demo.chatbot-ai.com',
      githubUrl: 'https://github.com/mostafa/ai-chatbot',
      duration: '6 months',
      teamSize: '2 developers',
      technologies: ['Python', 'TensorFlow', 'NLP', 'FastAPI', 'Redis'],
      features: ['Natural Language Processing', 'Machine Learning', 'Multi-language Support', 'Sentiment Analysis'],
      order: 1,
      isFeatured: true
    },
    {
      lang: 'EN' as const,
      title: 'Smart Agriculture Platform',
      description: 'Integrated system for crop monitoring using DJI Mavic 3M drone with AI image processing and agricultural data analysis.',
      longDescription: 'Comprehensive platform combining drone technology and artificial intelligence for crop monitoring, soil analysis, pest detection, and providing customized agricultural recommendations for farmers.',
      imageId: projectImages[2].id,
      status: 'COMPLETED' as const,
      category: 'iot',
      projectUrl: 'https://smart-agriculture.com',
      githubUrl: 'https://github.com/mostafa/smart-agriculture',
      duration: '8 months',
      teamSize: '4 developers',
      technologies: ['Python', 'OpenCV', 'Machine Learning', 'IoT', 'React Dashboard'],
      features: ['Aerial Image Analysis', 'Pest Detection', 'Soil Analysis', 'Detailed Reports'],
      order: 2,
      isFeatured: false
    },
    {
      lang: 'EN' as const,
      title: 'EcoLife Mobile App',
      description: 'Cross-platform Flutter app for healthy and environmental living with activity tracking, environmental tips, and interactive rewards system.',
      longDescription: 'Comprehensive app helping users adopt a healthy and eco-friendly lifestyle, with features for activity tracking, carbon footprint calculation, and interactive user community.',
      imageId: projectImages[3].id,
      status: 'COMPLETED' as const,
      category: 'mobile',
      projectUrl: 'https://apps.apple.com/ecolife',
      githubUrl: 'https://github.com/mostafa/ecolife-app',
      duration: '5 months',
      teamSize: '2 developers',
      technologies: ['Flutter', 'Dart', 'Firebase', 'Google Maps API', 'Push Notifications'],
      features: ['Activity Tracking', 'Carbon Footprint Calculation', 'Rewards System', 'Interactive Community'],
      order: 3,
      isFeatured: true
    }
  ];

  await prisma.project.createMany({
    data: projectsData
  });

  // Create Achievements
  console.log('🏆 Creating achievements...');
  const achievementsData = [
    // Arabic
    {
      lang: 'AR' as const,
      title: '+20 مشروع',
      subtitle: 'مشروع مكتمل',
      description: 'مشاريع متنوعة من مواقع الويب إلى تطبيقات الموبايل',
      value: '+20',
      order: 0
    },
    {
      lang: 'AR' as const,
      title: '+15 عميل سعيد',
      subtitle: 'عميل راضي',
      description: 'عملاء من مختلف القطاعات حققوا أهدافهم معنا',
      value: '+15',
      order: 1
    },
    {
      lang: 'AR' as const,
      title: '+5 سنوات خبرة',
      subtitle: 'في المجال',
      description: 'خبرة متراكمة في تقنيات البرمجة الحديثة',
      value: '+5',
      order: 2
    },
    {
      lang: 'AR' as const,
      title: '3 منتجات مبتكرة',
      subtitle: 'حلول فريدة',
      description: 'أنظمة ذكية ومتطورة تلبي احتياجات السوق',
      value: '3',
      order: 3
    },
    {
      lang: 'AR' as const,
      title: '98% معدل نجاح',
      subtitle: 'في المشاريع',
      description: 'التزام بالجودة والمواعيد المحددة',
      value: '98%',
      order: 4
    },
    {
      lang: 'AR' as const,
      title: 'شركة Webnest',
      subtitle: 'مؤسس الشركة',
      description: 'شركة متخصصة في حلول الويب والتطبيقات الذكية',
      value: '2024',
      order: 5
    },

    // English
    {
      lang: 'EN' as const,
      title: '+20 Projects',
      subtitle: 'Completed projects',
      description: 'Diverse projects from websites to mobile applications',
      value: '+20',
      order: 0
    },
    {
      lang: 'EN' as const,
      title: '+15 Happy Clients',
      subtitle: 'Satisfied clients',
      description: 'Clients from various sectors achieved their goals with us',
      value: '+15',
      order: 1
    },
    {
      lang: 'EN' as const,
      title: '+5 Years Experience',
      subtitle: 'In the field',
      description: 'Accumulated experience in modern programming technologies',
      value: '+5',
      order: 2
    },
    {
      lang: 'EN' as const,
      title: '3 Innovative Products',
      subtitle: 'Unique solutions',
      description: 'Smart and advanced systems meeting market needs',
      value: '3',
      order: 3
    },
    {
      lang: 'EN' as const,
      title: '98% Success Rate',
      subtitle: 'In projects',
      description: 'Commitment to quality and specified deadlines',
      value: '98%',
      order: 4
    },
    {
      lang: 'EN' as const,
      title: 'Webnest Company',
      subtitle: 'Company founder',
      description: 'Company specialized in web solutions and smart applications',
      value: '2024',
      order: 5
    }
  ];

  await prisma.achievement.createMany({
    data: achievementsData
  });

  // Create Contact Info
  console.log('📞 Creating contact info...');
  const contactInfoData = [
    // Arabic
    {
      lang: 'AR' as const,
      type: 'email',
      label: 'البريد الإلكتروني',
      value: 'mostafa@webnest.com',
      link: 'mailto:mostafa@webnest.com',
      icon: 'Mail',
      order: 0,
      isPrimary: true
    },
    {
      lang: 'AR' as const,
      type: 'phone',
      label: 'رقم الهاتف',
      value: '+20 100 123 4567',
      link: 'tel:+201001234567',
      icon: 'Phone',
      order: 1,
      isPrimary: true
    },
    {
      lang: 'AR' as const,
      type: 'whatsapp',
      label: 'واتساب',
      value: 'تواصل مباشر',
      link: 'https://wa.me/201001234567',
      icon: 'MessageCircle',
      order: 2,
      isPrimary: false
    },
    {
      lang: 'AR' as const,
      type: 'location',
      label: 'الموقع',
      value: 'القاهرة، مصر',
      link: '#',
      icon: 'MapPin',
      order: 3,
      isPrimary: false
    },

    // English
    {
      lang: 'EN' as const,
      type: 'email',
      label: 'Email',
      value: 'mostafa@webnest.com',
      link: 'mailto:mostafa@webnest.com',
      icon: 'Mail',
      order: 0,
      isPrimary: true
    },
    {
      lang: 'EN' as const,
      type: 'phone',
      label: 'Phone',
      value: '+20 100 123 4567',
      link: 'tel:+201001234567',
      icon: 'Phone',
      order: 1,
      isPrimary: true
    },
    {
      lang: 'EN' as const,
      type: 'whatsapp',
      label: 'WhatsApp',
      value: 'Direct contact',
      link: 'https://wa.me/201001234567',
      icon: 'MessageCircle',
      order: 2,
      isPrimary: false
    },
    {
      lang: 'EN' as const,
      type: 'location',
      label: 'Location',
      value: 'Cairo, Egypt',
      link: '#',
      icon: 'MapPin',
      order: 3,
      isPrimary: false
    }
  ];

  await prisma.contactInfo.createMany({
    data: contactInfoData
  });

  // Create Social Links
  console.log('🔗 Creating social links...');
  const socialLinksData = [
    // Arabic
    {
      lang: 'AR' as const,
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/mostafa-gamal',
      icon: 'LinkedIn',
      order: 0
    },
    {
      lang: 'AR' as const,
      name: 'GitHub',
      url: 'https://github.com/mostafa-codes',
      icon: 'GitHub',
      order: 1
    },
    {
      lang: 'AR' as const,
      name: 'Twitter',
      url: 'https://twitter.com/mostafa_codes',
      icon: 'Twitter',
      order: 2
    },
    {
      lang: 'AR' as const,
      name: 'Instagram',
      url: 'https://instagram.com/mostafa.codes',
      icon: 'Instagram',
      order: 3
    },

    // English
    {
      lang: 'EN' as const,
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/mostafa-gamal',
      icon: 'LinkedIn',
      order: 0
    },
    {
      lang: 'EN' as const,
      name: 'GitHub',
      url: 'https://github.com/mostafa-codes',
      icon: 'GitHub',
      order: 1
    },
    {
      lang: 'EN' as const,
      name: 'Twitter',
      url: 'https://twitter.com/mostafa_codes',
      icon: 'Twitter',
      order: 2
    },
    {
      lang: 'EN' as const,
      name: 'Instagram',
      url: 'https://instagram.com/mostafa.codes',
      icon: 'Instagram',
      order: 3
    }
  ];

  await prisma.socialLink.createMany({
    data: socialLinksData
  });

  // Create a demo admin user
  console.log('👤 Creating demo admin user...');
  await prisma.user.create({
    data: {
      email: 'admin@webnest.com',
      password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewkFUZbRS9/5OKj.' // "password123"
    }
  });

  console.log('✅ Database seeding completed successfully!');
  console.log('📊 Summary:');
  console.log('- Personal Info: 2 records (AR, EN)');
  console.log('- Hero Content: 2 records (AR, EN)');
  console.log('- About Cards: 12 records (6 AR, 6 EN)');
  console.log('- Skill Categories: 10 records (5 AR, 5 EN)');
  console.log('- Skills: 40+ records');
  console.log('- Projects: 8 records (4 AR, 4 EN)');
  console.log('- Achievements: 12 records (6 AR, 6 EN)');
  console.log('- Contact Info: 8 records (4 AR, 4 EN)');
  console.log('- Social Links: 8 records (4 AR, 4 EN)');
  console.log('- Files: 7 records (images)');
  console.log('- Users: 1 admin user');
  console.log('');
  console.log('🔑 Admin credentials:');
  console.log('Email: admin@webnest.com');
  console.log('Password: password123');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
