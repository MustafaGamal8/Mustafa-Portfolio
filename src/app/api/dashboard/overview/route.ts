import { NextRequest, NextResponse } from 'next/server';
import { apiHandler } from '@/lib/backend/api-handler';
import { BackendBaseService } from '@/lib/backend/bacendBase.service';

export const GET = apiHandler(async (request: NextRequest) => {
  try {
    // Initialize services for different models
    const projectService = new BackendBaseService('project');
    const skillService = new BackendBaseService('skill');
    const skillCategoryService = new BackendBaseService('skillCategory');
    const aboutCardService = new BackendBaseService('aboutCard');
    const achievementService = new BackendBaseService('achievement');
    const heroContentService = new BackendBaseService('heroContent');
    const personalInfoService = new BackendBaseService('personalInfo');
    const contactInfoService = new BackendBaseService('contactInfo');
    const socialLinkService = new BackendBaseService('socialLink');
    const fileService = new BackendBaseService('file');

    // Get counts for all content types
    const [
      projects,
      skills,
      skillCategories,
      aboutCards,
      achievements,
      heroContent,
      personalInfo,
      contactInfo,
      socialLinks,
      files
    ] = await Promise.all([
      projectService.findMany({ meta: false }),
      skillService.findMany({ meta: false }),
      skillCategoryService.findMany({ meta: false }),
      aboutCardService.findMany({ meta: false }),
      achievementService.findMany({ meta: false }),
      heroContentService.findMany({ meta: false }),
      personalInfoService.findMany({ meta: false }),
      contactInfoService.findMany({ meta: false }),
      socialLinkService.findMany({ meta: false }),
      fileService.findMany({ meta: false })
    ]);

    // Calculate counters
    const counters = {
      projects: {
        total: projects.data.length,
        active: projects.data.filter((p: any) => p.isActive).length,
        featured: projects.data.filter((p: any) => p.isFeatured).length,
        draft: projects.data.filter((p: any) => p.status === 'DRAFT').length
      },
      skills: {
        total: skills.data.length,
        active: skills.data.filter((s: any) => s.isActive).length,
        categories: skillCategories.data.length
      },
      content: {
        aboutCards: aboutCards.data.length,
        achievements: achievements.data.length,
        heroContent: heroContent.data.length,
        personalInfo: personalInfo.data.length,
        contactInfo: contactInfo.data.length,
        socialLinks: socialLinks.data.length
      },
      media: {
        totalFiles: files.data.length,
        images: files.data.filter((f: any) => f.type.startsWith('image/')).length,
        documents: files.data.filter((f: any) => f.type === 'application/pdf').length
      }
    };

    // Get latest updates (recent creations/modifications)
    const recentUpdates = [
      ...projects.data.slice(0, 3).map((item: any) => ({
        type: 'project',
        title: item.title,
        action: item.createdAt === item.updatedAt ? 'created' : 'updated',
        timestamp: item.updatedAt || item.createdAt,
        id: item.id
      })),
      ...skills.data.slice(0, 2).map((item: any) => ({
        type: 'skill',
        title: item.name,
        action: item.createdAt === item.updatedAt ? 'created' : 'updated',
        timestamp: item.updatedAt || item.createdAt,
        id: item.id
      })),
      ...achievements.data.slice(0, 2).map((item: any) => ({
        type: 'achievement',
        title: item.title,
        action: item.createdAt === item.updatedAt ? 'created' : 'updated',
        timestamp: item.updatedAt || item.createdAt,
        id: item.id
      }))
    ]
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 5);

    // Quick stats for overview
    const overviewStats = {
      totalViews: 0, // This would come from analytics if implemented
      totalMessages: contactInfo.data.length,
      completionRate: Math.round((counters.projects.active / Math.max(counters.projects.total, 1)) * 100)
    };

    return NextResponse.json({
      success: true,
      data: {
        counters,
        recentUpdates,
        overviewStats
      }
    });
  } catch (error) {
    console.error('Dashboard overview error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch dashboard overview'
      },
      { status: 500 }
    );
  }
});
