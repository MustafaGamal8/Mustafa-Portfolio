import { FieldConfig } from './types';

export const getFieldsForSection = (sectionType: string): FieldConfig[] => {
  const fieldConfigs: Record<string, FieldConfig[]> = {
    personal: [
      { name: 'firstName', label: 'First Name', required: true },
      { name: 'lastName', label: 'Last Name', required: true },
      { name: 'title', label: 'Job Title', required: true },
      { name: 'description', label: 'Description', type: 'textarea', required: true },
      { name: 'bio', label: 'Bio', type: 'textarea' },
      { name: 'imageId', label: 'Profile Image', type: 'image' },
      { name: 'resumeId', label: 'Resume (PDF)', type: 'file' }
    ],
    hero: [
      { name: 'name', label: 'Name', required: true },
      { name: 'mainTitle', label: 'Main Title', required: true },
      { name: 'subTitle', label: 'Subtitle' },
      { name: 'description', label: 'Description', type: 'textarea', required: true },
      { name: 'ctaText', label: 'CTA Text' },
      { name: 'profileImageId', label: 'Profile Image', type: 'image' },
      { name: 'dynamicTexts', label: 'Dynamic Texts', type: 'array' },
      {
        name: 'stats',
        label: 'Stats',
        type: 'object-array',
        fields: [
          { name: 'label', label: 'Label', required: true },
          { name: 'value', label: 'Value', required: true },
        ]
      },

    ],
    about: [
      { name: 'title', label: 'Title', required: true },
      { name: 'question', label: 'Question', required: true },
      { name: 'answer', label: 'Answer', type: 'textarea', required: true },
      { name: 'gradient', label: 'Gradient Classes' },
      { name: 'icon', label: 'Icon', type: 'icon' },
      { name: 'order', label: 'Order', type: 'number' }
    ],
    'skill-categories': [
      { name: 'title', label: 'Title', required: true },
      { name: 'description', label: 'Description', type: 'textarea', required: true },
      { name: 'gradient', label: 'Gradient Classes' },
      { name: 'icon', label: 'Icon', type: 'icon' },
      { name: 'experience', label: 'Experience' },
      { name: 'projectCount', label: 'Project Count', type: 'number' },
      { name: 'order', label: 'Order', type: 'number' }
    ],
    skills: [
      { name: 'name', label: 'Skill Name', required: true },
      {
        name: 'level',
        label: 'Level',
        type: 'select',
        required: true,
        options: [
          { value: 'BEGINNER', label: 'Beginner' },
          { value: 'INTERMEDIATE', label: 'Intermediate' },
          { value: 'ADVANCED', label: 'Advanced' },
          { value: 'EXPERT', label: 'Expert' }
        ]
      },
      { name: 'description', label: 'Description', type: 'textarea' },
      { name: 'icon', label: 'Icon', type: 'icon' },
      { name: 'yearsExperience', label: 'Years Experience', type: 'number' },
      { name: 'projectCount', label: 'Project Count', type: 'number' },
      { name: 'skillCategoryId', label: 'Category', type: 'select-category', required: true },
      { name: 'order', label: 'Order', type: 'number' }
    ],
    projects: [
      { name: 'title', label: 'Title', required: true },
      { name: 'description', label: 'Description', type: 'textarea', required: true },
      { name: 'longDescription', label: 'Long Description', type: 'textarea' },
      { name: 'imageId', label: 'Project Image', type: 'image' },
      {
        name: 'status',
        label: 'Status',
        type: 'select',
        options: [
          { value: 'DRAFT', label: 'Draft' },
          { value: 'IN_PROGRESS', label: 'In Progress' },
          { value: 'COMPLETED', label: 'Completed' },
          { value: 'ARCHIVED', label: 'Archived' }
        ]
      },
      { name: 'category', label: 'Category', required: true },
      { name: 'projectUrl', label: 'Project URL', type: 'url' },
      { name: 'githubUrl', label: 'GitHub URL', type: 'url' },
      { name: 'demoUrl', label: 'Demo URL', type: 'url' },
      { name: 'duration', label: 'Duration' },
      { name: 'teamSize', label: 'Team Size' },
      { name: 'technologies', label: 'Technologies', type: 'array' },
      { name: 'features', label: 'Features', type: 'array' },
      { name: 'startDate', label: 'Start Date', type: 'datetime-local' },
      { name: 'endDate', label: 'End Date', type: 'datetime-local' },
      { name: 'isFeatured', label: 'Featured', type: 'checkbox' },
      { name: 'order', label: 'Order', type: 'number' }
    ],
    achievements: [
      { name: 'title', label: 'Title', required: true },
      { name: 'subtitle', label: 'Subtitle' },
      { name: 'description', label: 'Description', type: 'textarea', required: true },
      { name: 'value', label: 'Value' },
      { name: 'icon', label: 'Icon', type: 'icon' },
      { name: 'order', label: 'Order', type: 'number' }
    ],
    contact: [
      { name: 'type', label: 'Contact Type', required: true },
      { name: 'label', label: 'Label', required: true },
      { name: 'value', label: 'Value', required: true },
      { name: 'link', label: 'Link', type: 'url' },
      { name: 'icon', label: 'Icon', type: 'icon' },
      { name: 'isPrimary', label: 'Primary', type: 'checkbox' },
      { name: 'order', label: 'Order', type: 'number' }
    ],
    social: [
      { name: 'name', label: 'Platform Name', required: true },
      { name: 'url', label: 'URL', type: 'url', required: true },
      { name: 'icon', label: 'Icon', type: 'icon' },
      { name: 'order', label: 'Order', type: 'number' }
    ]
  };

  return fieldConfigs[sectionType] || [];
};
