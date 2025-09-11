import { z } from 'zod';

// Language enum schema
export const languageSchema = z.enum(['EN', 'AR']);

// Personal Info Schema
export const personalInfoSchema = z.object({
  id: z.string(),
  lang: languageSchema,
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  bio: z.string().optional(),
  imageId: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const createPersonalInfoSchema = personalInfoSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const updatePersonalInfoSchema = createPersonalInfoSchema.extend({
  id: z.string(),
});;

// Hero Content Schema
export const heroContentSchema = z.object({
  id: z.string(),
  lang: languageSchema,
  name: z.string().min(1, 'Name is required'),
  mainTitle: z.string().min(1, 'Main title is required'),
  subTitle: z.string().optional(),
  description: z.string().min(1, 'Description is required'),
  dynamicTexts: z.array(z.string()).default([]),
  stats: z.array(z.object({
    label: z.string(),
    value: z.string(),
    icon: z.string().optional()
  })).optional(),
  ctaText: z.string().optional(),
  profileImageId: z.string().optional(),
  resumeId: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const createHeroContentSchema = heroContentSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const updateHeroContentSchema = createHeroContentSchema.extend({
  id: z.string(),
});;

// About Card Schema
export const aboutCardSchema = z.object({
  id: z.string(),
  lang: languageSchema,
  title: z.string().min(1, 'Title is required'),
  question: z.string().min(1, 'Question is required'),
  answer: z.string().min(1, 'Answer is required'),
  gradient: z.string().optional(),
  icon: z.string().optional(), // Added missing icon field
  order: z.number().default(0),
  isActive: z.boolean().default(true),
  iconId: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const createAboutCardSchema = aboutCardSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const updateAboutCardSchema = createAboutCardSchema.extend({
  id: z.string(),
});;

// Skill Category Schema
export const skillCategorySchema = z.object({
  id: z.string(),
  lang: languageSchema,
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  gradient: z.string().optional(),
  icon: z.string().optional(), // Added missing icon field
  experience: z.string().optional(),
  projectCount: z.number().default(0),
  order: z.number().default(0),
  isActive: z.boolean().default(true),
  iconId: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const createSkillCategorySchema = skillCategorySchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const updateSkillCategorySchema = createSkillCategorySchema.extend({
  id: z.string(),
});;

// Skill Schema
export const skillLevelSchema = z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT']);

export const skillSchema = z.object({
  id: z.string(),
  lang: languageSchema,
  name: z.string().min(1, 'Name is required'),
  level: skillLevelSchema.default('INTERMEDIATE'),
  description: z.string().optional(),
  icon: z.string().optional(), // Added missing icon field
  yearsExperience: z.number().optional(),
  projectCount: z.number().default(0),
  order: z.number().default(0),
  isActive: z.boolean().default(true),
  skillCategoryId: z.string(),
  iconId: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const createSkillSchema = skillSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const updateSkillSchema = createSkillSchema.extend({
  id: z.string(),
});;

// Project Schema
export const projectStatusSchema = z.enum(['DRAFT', 'IN_PROGRESS', 'COMPLETED', 'ARCHIVED']);

export const projectSchema = z.object({
  id: z.string(),
  lang: languageSchema,
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  longDescription: z.string().optional(),
  status: projectStatusSchema.default('DRAFT'),
  category: z.string().min(1, 'Category is required'),
  projectUrl: z.string().optional(),
  githubUrl: z.string().optional(),
  demoUrl: z.string().optional(),
  duration: z.string().optional(),
  teamSize: z.string().optional(),
  technologies: z.array(z.string()).default([]),
  features: z.array(z.string()).default([]),
  order: z.number().default(0),
  isFeatured: z.boolean().default(false),
  isActive: z.boolean().default(true),
  startDate: z.preprocess((val) => new Date(val as string), z.date()).optional(),
  endDate: z.preprocess((val) => new Date(val as string), z.date()).optional(),
  imageId: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const createProjectSchema = projectSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const updateProjectSchema = createProjectSchema.extend({
  id: z.string(),
});

// Bulk project operations schemas
export const bulkCreateProjectsSchema = z.object({
  projects: z.array(createProjectSchema),
});

export const bulkUpdateProjectsSchema = z.object({
  projects: z.array(updateProjectSchema),
});

export const bulkDeleteProjectsSchema = z.object({
  ids: z.array(z.string()),
});

// Achievement Schema
export const achievementSchema = z.object({
  id: z.string(),
  lang: languageSchema,
  title: z.string().min(1, 'Title is required'),
  subtitle: z.string().optional(),
  description: z.string().min(1, 'Description is required'),
  value: z.string().optional(),
  order: z.number().default(0),
  isActive: z.boolean().default(true),
  icon: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const createAchievementSchema = achievementSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const updateAchievementSchema = createAchievementSchema.extend({
  id: z.string(),
});;

// Contact Info Schema
export const contactInfoSchema = z.object({
  id: z.string(),
  lang: languageSchema,
  type: z.string().min(1, 'Type is required'),
  label: z.string().min(1, 'Label is required'),
  value: z.string().min(1, 'Value is required'),
  link: z.string().optional(),
  icon: z.string().optional(),
  order: z.number().default(0),
  isActive: z.boolean().default(true),
  isPrimary: z.boolean().default(false),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const createContactInfoSchema = contactInfoSchema.omit({
  icon: true,
  createdAt: true,
  updatedAt: true,
});

export const updateContactInfoSchema = createContactInfoSchema.extend({
  id: z.string(),
});;

// Social Link Schema
export const socialLinkSchema = z.object({
  id: z.string(),
  lang: languageSchema,
  name: z.string().min(1, 'Name is required'),
  url: z.string().url('Must be a valid URL'),
  icon: z.string().optional(),
  order: z.number().default(0),
  isActive: z.boolean().default(true),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const createSocialLinkSchema = socialLinkSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const updateSocialLinkSchema = createSocialLinkSchema.extend({
  id: z.string(),
});;

// Service Schema
export const serviceSchema = z.object({
  id: z.string(),
  lang: languageSchema,
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  icon: z.string().optional(),
  price: z.string().optional(),
  duration: z.string().optional(),
  order: z.number().default(0),
  isActive: z.boolean().default(true),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const createServiceSchema = serviceSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const updateServiceSchema = createServiceSchema.extend({
  id: z.string(),
});;

// Quick Link Schema
export const quickLinkSchema = z.object({
  id: z.string(),
  lang: languageSchema,
  name: z.string().min(1, 'Name is required'),
  href: z.string().min(1, 'Href is required'),
  order: z.number().default(0),
  isActive: z.boolean().default(true),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const createQuickLinkSchema = quickLinkSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const updateQuickLinkSchema = createQuickLinkSchema.extend({
  id: z.string(),
});;

// Export types
export type PersonalInfo = z.infer<typeof personalInfoSchema>;
export type CreatePersonalInfoDto = z.infer<typeof createPersonalInfoSchema>;
export type UpdatePersonalInfoDto = z.infer<typeof updatePersonalInfoSchema>;

export type HeroContent = z.infer<typeof heroContentSchema>;
export type CreateHeroContentDto = z.infer<typeof createHeroContentSchema>;
export type UpdateHeroContentDto = z.infer<typeof updateHeroContentSchema>;

export type AboutCard = z.infer<typeof aboutCardSchema>;
export type CreateAboutCardDto = z.infer<typeof createAboutCardSchema>;
export type UpdateAboutCardDto = z.infer<typeof updateAboutCardSchema>;

export type SkillCategory = z.infer<typeof skillCategorySchema>;
export type CreateSkillCategoryDto = z.infer<typeof createSkillCategorySchema>;
export type UpdateSkillCategoryDto = z.infer<typeof updateSkillCategorySchema>;

export type Skill = z.infer<typeof skillSchema>;
export type CreateSkillDto = z.infer<typeof createSkillSchema>;
export type UpdateSkillDto = z.infer<typeof updateSkillSchema>;

export type Project = z.infer<typeof projectSchema>;
export type CreateProjectDto = z.infer<typeof createProjectSchema>;
export type UpdateProjectDto = z.infer<typeof updateProjectSchema>;
export type BulkCreateProjectsDto = z.infer<typeof bulkCreateProjectsSchema>;
export type BulkUpdateProjectsDto = z.infer<typeof bulkUpdateProjectsSchema>;
export type BulkDeleteProjectsDto = z.infer<typeof bulkDeleteProjectsSchema>;

export type Achievement = z.infer<typeof achievementSchema>;
export type CreateAchievementDto = z.infer<typeof createAchievementSchema>;
export type UpdateAchievementDto = z.infer<typeof updateAchievementSchema>;

export type ContactInfo = z.infer<typeof contactInfoSchema>;
export type CreateContactInfoDto = z.infer<typeof createContactInfoSchema>;
export type UpdateContactInfoDto = z.infer<typeof updateContactInfoSchema>;

export type SocialLink = z.infer<typeof socialLinkSchema>;
export type CreateSocialLinkDto = z.infer<typeof createSocialLinkSchema>;
export type UpdateSocialLinkDto = z.infer<typeof updateSocialLinkSchema>;

export type Service = z.infer<typeof serviceSchema>;
export type CreateServiceDto = z.infer<typeof createServiceSchema>;
export type UpdateServiceDto = z.infer<typeof updateServiceSchema>;

export type QuickLink = z.infer<typeof quickLinkSchema>;
export type CreateQuickLinkDto = z.infer<typeof createQuickLinkSchema>;
export type UpdateQuickLinkDto = z.infer<typeof updateQuickLinkSchema>;
