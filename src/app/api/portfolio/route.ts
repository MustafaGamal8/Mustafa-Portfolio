import { NextRequest, NextResponse } from 'next/server';
import { BackendPersonalInfoService } from '@/lib/backend/services/personal-info.service';
import { BackendHeroContentService } from '@/lib/backend/services/hero-content.service';
import { BackendAboutCardService } from '@/lib/backend/services/about-card.service';
import { BackendSkillCategoryService } from '@/lib/backend/services/skill-category.service';
import { BackendProjectService } from '@/lib/backend/services/project.service';
import { BackendAchievementService } from '@/lib/backend/services/achievement.service';
import { BackendContactInfoService } from '@/lib/backend/services/contact-info.service';
import { BackendSocialLinkService } from '@/lib/backend/services/social-link.service';
import { apiHandler } from '@/lib/backend/api-handler';
import { BackendSkillService } from '@/lib/backend/services/skill.service';

const personalInfoService = new BackendPersonalInfoService();
const heroContentService = new BackendHeroContentService();
const aboutCardService = new BackendAboutCardService();
const skillCategoryService = new BackendSkillCategoryService();
const skillService = new BackendSkillService()
const projectService = new BackendProjectService();
const achievementService = new BackendAchievementService();
const contactInfoService = new BackendContactInfoService();
const socialLinkService = new BackendSocialLinkService();

export const GET = apiHandler(async (req: NextRequest) => {
  const url = new URL(req.url);
  const lang = url.searchParams.get('lang') || 'EN';
  const section = url.searchParams.get('section'); // Optional: get specific section

  try {
    const portfolioData: any = {};

    // If specific section is requested
    if (section) {
      switch (section) {
        case 'personal':
          portfolioData.personalInfo = await personalInfoService.findByLanguage(lang);
          break;
        case 'hero':
          portfolioData.heroContent = await heroContentService.findByLanguage(lang);
          break;
        case 'about':
          portfolioData.aboutCards = await aboutCardService.findByLanguage(lang);
          break;
        case 'skills':
          portfolioData.skills = await skillService.findByLanguage(lang);
          break;
        case 'skillCategories':
          portfolioData.skillCategories = await skillService.findByLanguage(lang);
          break;    
        case 'projects':
          portfolioData.projects = await projectService.findByLanguage(lang);
          portfolioData.featuredProjects = await projectService.findFeaturedByLanguage(lang);
          break;
        case 'achievements':
          portfolioData.achievements = await achievementService.findByLanguage(lang);
          break;
        case 'contact':
          portfolioData.contactInfo = await contactInfoService.findByLanguage(lang);
          portfolioData.socialLinks = await socialLinkService.findByLanguage(lang);
          break;
        default:
          return NextResponse.json({ error: 'Invalid section' }, { status: 400 });
      }
    } else {
      // Get all portfolio data
      const [
        personalInfo,
        heroContent,
        aboutCards,
        skillCategories,
        projects,
        featuredProjects,
        achievements,
        contactInfo,
        socialLinks
      ] = await Promise.all([
        personalInfoService.findByLanguage(lang),
        heroContentService.findByLanguage(lang),
        aboutCardService.findByLanguage(lang),
        skillCategoryService.findByLanguage(lang),
        projectService.findByLanguage(lang),
        projectService.findFeaturedByLanguage(lang),
        achievementService.findByLanguage(lang),
        contactInfoService.findByLanguage(lang),
        socialLinkService.findByLanguage(lang)
      ]);

      portfolioData.personalInfo = personalInfo;
      portfolioData.heroContent = heroContent;
      portfolioData.aboutCards = aboutCards;
      portfolioData.skillCategories = skillCategories;
      portfolioData.projects = projects;
      portfolioData.featuredProjects = featuredProjects;
      portfolioData.achievements = achievements;
      portfolioData.contactInfo = contactInfo;
      portfolioData.socialLinks = socialLinks;
    }

    return NextResponse.json({
      success: true,
      data: portfolioData,
      language: lang,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch portfolio data',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
});

// Helper endpoint to get portfolio sections summary
export const POST = apiHandler(async (req: NextRequest) => {
  const body = await req.json();
  const { lang = 'EN', sections = [] } = body;

  try {
    const portfolioData: any = {};

    const sectionPromises = sections.map(async (section: string) => {
      switch (section) {
        case 'personal':
          return { section: 'personal', data: await personalInfoService.findByLanguage(lang) };
        case 'hero':
          return { section: 'hero', data: await heroContentService.findByLanguage(lang) };
        case 'about':
          return { section: 'about', data: await aboutCardService.findByLanguage(lang) };
        case 'skills':
          return { section: 'skills', data: await skillService.findByLanguage(lang) };
        case 'skillCategories':
          return { section: 'skillCategories', data: await skillCategoryService.findByLanguage(lang) };
        case 'projects':
          return { section: 'projects', data: await projectService.findByLanguage(lang) };
        case 'achievements':
          return { section: 'achievements', data: await achievementService.findByLanguage(lang) };
        case 'contact':
          return {
            section: 'contact',
            data: {
              contactInfo: await contactInfoService.findByLanguage(lang),
              socialLinks: await socialLinkService.findByLanguage(lang)
            }
          };
        default:
          return { section, data: null, error: 'Invalid section' };
      }
    });

    const results = await Promise.all(sectionPromises);

    results.forEach(result => {
      portfolioData[result.section] = result.data;
    });

    return NextResponse.json({
      success: true,
      data: portfolioData,
      language: lang,
      requestedSections: sections,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch portfolio sections',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
});
