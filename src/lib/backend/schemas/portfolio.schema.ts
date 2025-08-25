import { z } from 'zod';

// Profile Schema
export const profileSchema = z.object({
  id: z.string(),
  bio: z.string().optional(),
  title: z.string().optional(),
  location: z.string().optional(),
  phone: z.string().optional(),
  linkedin: z.string().optional(),
  github: z.string().optional(),
  website: z.string().optional(),
  whatsapp: z.string().optional(),
  imageId: z.string().optional(),
  resumeId: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});



export const createProfileSchema = profileSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const updateProfileSchema = createProfileSchema.partial();

// Skill Schema
export const skillCategoryEnum = z.enum(['FRONTEND', 'BACKEND', 'MOBILE', 'DEVOPS', 'DATABASE', 'AI_ML', 'TOOLS', 'SOFT_SKILLS']);

export const skillSchema = z.object({
  id: z.string(),
  name: z.string().min(2, 'Skill name must be at least 2 characters'),
  level: z.number().min(1).max(100, 'Skill level must be between 1 and 100'),
  category: skillCategoryEnum,
  icon: z.string().optional(),
  isVisible: z.boolean().default(true),
  order: z.number().default(0),
  profileId: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const createSkillSchema = skillSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const updateSkillSchema = createSkillSchema.partial().omit({
  profileId: true,
});

// Project Schema
export const projectCategoryEnum = z.enum(['WEB', 'MOBILE', 'AI', 'IOT', 'DESKTOP', 'OTHER']);
export const projectStatusEnum = z.enum(['PLANNING', 'IN_PROGRESS', 'COMPLETED', 'ON_HOLD', 'CANCELLED']);

export const projectSchema = z.object({
  id: z.string(),
  title: z.string().min(2, 'Project title must be at least 2 characters'),
  description: z.string().min(10, 'Project description must be at least 10 characters'),
  longDescription: z.string().optional(),
  image: z.string().optional(),
  tags: z.array(z.string()),
  category: projectCategoryEnum,
  link: z.string().optional(),
  github: z.string().optional(),
  status: projectStatusEnum.default('IN_PROGRESS'),
  duration: z.string().optional(),
  teamSize: z.string().optional(),
  features: z.array(z.string()),
  isPublic: z.boolean().default(true),
  order: z.number().default(0),
  authorId: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const createProjectSchema = projectSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const updateProjectSchema = createProjectSchema.partial().omit({
  authorId: true,
});

// Achievement Schema
export const achievementSchema = z.object({
  id: z.string(),
  title: z.string().min(2, 'Achievement title must be at least 2 characters'),
  description: z.string().min(10, 'Achievement description must be at least 10 characters'),
  date: z.date(),
  icon: z.string().optional(),
  link: z.string().optional(),
  isVisible: z.boolean().default(true),
  order: z.number().default(0),
  profileId: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const createAchievementSchema = achievementSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const updateAchievementSchema = createAchievementSchema.partial().omit({
  profileId: true,
});

// Contact Schema
export const contactStatusEnum = z.enum(['UNREAD', 'READ', 'IN_PROGRESS', 'RESOLVED', 'ARCHIVED']);

export const contactSchema = z.object({
  id: z.string(),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email format'),
  subject: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  status: contactStatusEnum.default('UNREAD'),
  assignedToId: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const createContactSchema = contactSchema.omit({
  id: true,
  status: true,
  assignedToId: true,
  createdAt: true,
  updatedAt: true,
});

export const updateContactSchema = contactSchema.partial().omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// AboutCard Schema
export const aboutCardSchema = z.object({
  id: z.string(),
  question: z.string().min(2, 'Question must be at least 2 characters'),
  answer: z.string().min(10, 'Answer must be at least 10 characters'),
  icon: z.string(),
  gradient: z.string(),
  order: z.number().default(0),
  isVisible: z.boolean().default(true),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const createAboutCardSchema = aboutCardSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const updateAboutCardSchema = createAboutCardSchema.partial();

// File Schema
export const fileSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'File name is required'),
  url: z.string().url('Invalid URL format'),
  path: z.string().min(1, 'File path is required'),
  type: z.string().min(1, 'File type is required'),
  size: z.number().min(0, 'File size must be non-negative'),
  profileId: z.string().optional(),
  projectId: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const createFileSchema = fileSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const updateFileSchema = createFileSchema.partial();

// Types
export type Profile = z.infer<typeof profileSchema>;
export type CreateProfileDto = z.infer<typeof createProfileSchema>;
export type UpdateProfileDto = z.infer<typeof updateProfileSchema>;

export type Skill = z.infer<typeof skillSchema>;
export type CreateSkillDto = z.infer<typeof createSkillSchema>;
export type UpdateSkillDto = z.infer<typeof updateSkillSchema>;
export type SkillCategory = z.infer<typeof skillCategoryEnum>;

export type Project = z.infer<typeof projectSchema>;
export type CreateProjectDto = z.infer<typeof createProjectSchema>;
export type UpdateProjectDto = z.infer<typeof updateProjectSchema>;
export type ProjectCategory = z.infer<typeof projectCategoryEnum>;
export type ProjectStatus = z.infer<typeof projectStatusEnum>;

export type Achievement = z.infer<typeof achievementSchema>;
export type CreateAchievementDto = z.infer<typeof createAchievementSchema>;
export type UpdateAchievementDto = z.infer<typeof updateAchievementSchema>;

export type Contact = z.infer<typeof contactSchema>;
export type CreateContactDto = z.infer<typeof createContactSchema>;
export type UpdateContactDto = z.infer<typeof updateContactSchema>;
export type ContactStatus = z.infer<typeof contactStatusEnum>;

export type AboutCard = z.infer<typeof aboutCardSchema>;
export type CreateAboutCardDto = z.infer<typeof createAboutCardSchema>;
export type UpdateAboutCardDto = z.infer<typeof updateAboutCardSchema>;

export type File = z.infer<typeof fileSchema>;
export type CreateFileDto = z.infer<typeof createFileSchema>;
export type UpdateFileDto = z.infer<typeof updateFileSchema>;
