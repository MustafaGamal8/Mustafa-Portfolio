import { NextRequest, NextResponse } from 'next/server';
import { apiHandler } from '@/lib/backend/api-handler';
import { prisma } from '@/lib/backend/prisma';

export const GET = apiHandler(async (request: NextRequest) => {
  try {
    // Use lightweight count queries instead of loading full tables.
    const [
      projectTotal,
      projectActive,
      projectFeatured,
      projectDraft,
      skillTotal,
      skillActive,
      skillCategoriesTotal,
      aboutCardsTotal,
      achievementsTotal,
      heroContentTotal,
      personalInfoTotal,
      contactInfoTotal,
      socialLinksTotal,
      filesTotal,
      imagesTotal,
      documentsTotal,
      recentProjects,
      recentSkills,
      recentAchievements,
    ] = await Promise.all([
      prisma.project.count(),
      prisma.project.count({ where: { isActive: true } }),
      prisma.project.count({ where: { isFeatured: true } }),
      prisma.project.count({ where: { status: 'DRAFT' } }),
      prisma.skill.count(),
      prisma.skill.count({ where: { isActive: true } }),
      prisma.skillCategory.count(),
      prisma.aboutCard.count(),
      prisma.achievement.count(),
      prisma.heroContent.count(),
      prisma.personalInfo.count(),
      prisma.contactInfo.count(),
      prisma.socialLink.count(),
      prisma.file.count(),
      prisma.file.count({ where: { type: { startsWith: 'image/' } } }),
      prisma.file.count({ where: { type: 'application/pdf' } }),
      prisma.project.findMany({
        select: { id: true, title: true, createdAt: true, updatedAt: true },
        orderBy: { updatedAt: 'desc' },
        take: 3,
      }),
      prisma.skill.findMany({
        select: { id: true, name: true, createdAt: true, updatedAt: true },
        orderBy: { updatedAt: 'desc' },
        take: 2,
      }),
      prisma.achievement.findMany({
        select: { id: true, title: true, createdAt: true, updatedAt: true },
        orderBy: { updatedAt: 'desc' },
        take: 2,
      }),
    ]);

    // Calculate counters
    const counters = {
      projects: {
        total: projectTotal,
        active: projectActive,
        featured: projectFeatured,
        draft: projectDraft,
      },
      skills: {
        total: skillTotal,
        active: skillActive,
        categories: skillCategoriesTotal,
      },
      content: {
        aboutCards: aboutCardsTotal,
        achievements: achievementsTotal,
        heroContent: heroContentTotal,
        personalInfo: personalInfoTotal,
        contactInfo: contactInfoTotal,
        socialLinks: socialLinksTotal,
      },
      media: {
        totalFiles: filesTotal,
        images: imagesTotal,
        documents: documentsTotal,
      },
    };

    // Get latest updates (recent creations/modifications)
    const recentUpdates = [
      ...recentProjects.map((item) => ({
        type: 'project',
        title: item.title,
        action: item.createdAt?.getTime() === item.updatedAt?.getTime() ? 'created' : 'updated',
        timestamp: item.updatedAt || item.createdAt,
        id: item.id
      })),
      ...recentSkills.map((item) => ({
        type: 'skill',
        title: item.name,
        action: item.createdAt?.getTime() === item.updatedAt?.getTime() ? 'created' : 'updated',
        timestamp: item.updatedAt || item.createdAt,
        id: item.id
      })),
      ...recentAchievements.map((item) => ({
        type: 'achievement',
        title: item.title,
        action: item.createdAt?.getTime() === item.updatedAt?.getTime() ? 'created' : 'updated',
        timestamp: item.updatedAt || item.createdAt,
        id: item.id
      }))
    ]
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 5);

    // Quick stats for overview
    const overviewStats = {
      totalViews: 0, // This would come from analytics if implemented
      totalMessages: contactInfoTotal,
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
