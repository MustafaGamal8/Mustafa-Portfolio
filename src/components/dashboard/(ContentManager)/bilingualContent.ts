import { getFieldsForSection } from './fieldConfigs';

export type SupportedLanguage = 'EN' | 'AR';

export interface BilingualPair {
  key: string;
  order: number;
  EN?: any;
  AR?: any;
}

const sharedFieldNamesBySection: Record<string, string[]> = {
  personal: ['imageId'],
  hero: ['profileImageId', 'resumeId'],
  about: ['gradient', 'icon', 'order'],
  'skill-categories': ['gradient', 'icon', 'experience', 'projectCount', 'order'],
  skills: ['level', 'icon', 'yearsExperience', 'projectCount', 'skillCategoryId', 'order'],
  projects: [
    'imageId',
    'status',
    'category',
    'projectUrl',
    'githubUrl',
    'demoUrl',
    'duration',
    'teamSize',
    'technologies',
    'features',
    'startDate',
    'endDate',
    'isFeatured',
    'order'
  ],
  achievements: ['icon', 'value', 'order'],
  contact: ['type', 'link', 'icon', 'isPrimary', 'order'],
  social: ['name', 'url', 'icon', 'order']
};

const primaryIdentityFieldsBySection: Record<string, string[]> = {
  personal: ['firstName', 'lastName', 'title', 'description', 'bio'],
  hero: ['name', 'mainTitle', 'subTitle', 'description', 'ctaText', 'dynamicTexts'],
  about: ['title', 'question', 'answer'],
  'skill-categories': ['title', 'description'],
  skills: ['name', 'description'],
  projects: ['title', 'description', 'longDescription'],
  achievements: ['title', 'subtitle', 'description'],
  contact: ['label', 'value'],
  social: []
};

const getSectionFieldNames = (sectionType: string) => getFieldsForSection(sectionType).map(field => field.name);

export const getBilingualFieldGroups = (sectionType: string) => {
  const sectionFieldNames = getSectionFieldNames(sectionType);
  const sharedFieldNames = new Set([
    ...(sharedFieldNamesBySection[sectionType] || []),
    'isActive'
  ]);

  const localizedFieldNames = new Set(primaryIdentityFieldsBySection[sectionType] || []);

  return {
    sharedFields: getFieldsForSection(sectionType).filter(field => sharedFieldNames.has(field.name)),
    localizedFields: getFieldsForSection(sectionType).filter(field => localizedFieldNames.has(field.name) && sectionFieldNames.includes(field.name)),
  };
};

export const pickFields = (item: any, fieldNames: string[]) => {
  const picked: Record<string, any> = {};

  fieldNames.forEach((fieldName) => {
    if (item && Object.prototype.hasOwnProperty.call(item, fieldName)) {
      picked[fieldName] = item[fieldName];
    }
  });

  return picked;
};

export const mergeWithDefaults = (base: any, overrides: any) => ({
  ...(base || {}),
  ...(overrides || {})
});

export const cleanDraft = (value: any): any => {
  if (value === null || value === undefined) return undefined;

  if (Array.isArray(value)) {
    return value.map(cleanDraft).filter(item => item !== undefined);
  }

  if (typeof value === 'object') {
    const cleaned: any = {};
    for (const [key, currentValue] of Object.entries(value)) {
      if (currentValue instanceof Date) {
        cleaned[key] = currentValue;
      } else if (currentValue !== null && currentValue !== undefined && currentValue !== '') {
        cleaned[key] = cleanDraft(currentValue);
      }
    }
    return Object.keys(cleaned).length > 0 ? cleaned : undefined;
  }

  return value;
};

export const findPairedItem = (
  sectionType: string,
  item: any,
  itemsByLanguage: Record<SupportedLanguage, any[]>
): any | undefined => {
  const targetLanguage: SupportedLanguage = item?.lang === 'EN' ? 'AR' : 'EN';
  const candidates = itemsByLanguage[targetLanguage] || [];

  if (!item) return undefined;

  const translationGroupId = item.translationGroupId;
  if (translationGroupId) {
    const byGroup = candidates.find(candidate => candidate.translationGroupId === translationGroupId);
    if (byGroup) return byGroup;
  }

  const matchers: Array<(candidate: any) => boolean> = [
    (candidate) => candidate.order === item.order && candidate.type === item.type,
    (candidate) => candidate.order === item.order && candidate.category === item.category,
    (candidate) => candidate.order === item.order && candidate.skillCategoryId === item.skillCategoryId,
    (candidate) => candidate.order === item.order && candidate.name === item.name,
    (candidate) => candidate.order === item.order
  ];

  if (sectionType === 'contact') {
    matchers.unshift((candidate) => candidate.type === item.type);
  }

  if (sectionType === 'social') {
    matchers.unshift((candidate) => candidate.name === item.name);
  }

  for (const matcher of matchers) {
    const found = candidates.find(matcher);
    if (found) return found;
  }

  return undefined;
};

export const buildBilingualDraft = (
  sectionType: string,
  currentItem: any | null,
  itemsByLanguage: Record<SupportedLanguage, any[]>
) => {
  const { sharedFields, localizedFields } = getBilingualFieldGroups(sectionType);
  const pairedItem = currentItem ? findPairedItem(sectionType, currentItem, itemsByLanguage) : undefined;
  const fallbackItem = currentItem || pairedItem || {};

  const sharedSource = mergeWithDefaults(pairedItem, currentItem);

  return {
    sectionType,
    shared: pickFields(sharedSource, sharedFields.map(field => field.name)),
    meta: {
      order: currentItem?.order ?? pairedItem?.order ?? 0,
      isActive: currentItem?.isActive !== undefined ? currentItem.isActive : pairedItem?.isActive,
    },
    localized: {
      EN: pickFields(itemsByLanguage.EN?.find(item => item.id === currentItem?.id) || itemsByLanguage.EN?.find(item => item.id === pairedItem?.id) || fallbackItem, localizedFields.map(field => field.name)),
      AR: pickFields(itemsByLanguage.AR?.find(item => item.id === currentItem?.id) || itemsByLanguage.AR?.find(item => item.id === pairedItem?.id) || fallbackItem, localizedFields.map(field => field.name))
    },
    ids: {
      EN: itemsByLanguage.EN?.find(item => item.id === currentItem?.id)?.id || itemsByLanguage.EN?.find(item => item.id === pairedItem?.id)?.id,
      AR: itemsByLanguage.AR?.find(item => item.id === currentItem?.id)?.id || itemsByLanguage.AR?.find(item => item.id === pairedItem?.id)?.id
    },
    fallbackLanguage: currentItem?.lang || 'EN',
    sharedFieldNames: sharedFields.map(field => field.name),
    localizedFieldNames: localizedFields.map(field => field.name)
  };
};

export const syncLocalizedDraft = (
  sectionType: string,
  draft: any,
  sourceLanguage: SupportedLanguage,
  targetLanguage: SupportedLanguage
) => {
  const { localizedFields } = getBilingualFieldGroups(sectionType);
  const fieldNames = localizedFields.map(field => field.name);
  const sourceValues = pickFields(draft.localized?.[sourceLanguage] || {}, fieldNames);

  return {
    ...draft,
    localized: {
      ...draft.localized,
      [targetLanguage]: {
        ...sourceValues
      }
    }
  };
};

export const getBilingualPairs = (
  sectionType: string,
  itemsByLanguage: Record<SupportedLanguage, any[]>
): BilingualPair[] => {
  const englishItems = itemsByLanguage.EN || [];
  const arabicItems = itemsByLanguage.AR || [];
  const seenIds = new Set<string>();
  const pairs: BilingualPair[] = [];

  const addPair = (item: any, language: SupportedLanguage) => {
    if (!item?.id || seenIds.has(item.id)) return;

    const pairedItem = findPairedItem(sectionType, item, itemsByLanguage);
    const englishItem = language === 'EN' ? item : pairedItem;
    const arabicItem = language === 'AR' ? item : pairedItem;

    if (englishItem?.id) seenIds.add(englishItem.id);
    if (arabicItem?.id) seenIds.add(arabicItem.id);

    pairs.push({
      key: englishItem?.id || arabicItem?.id || `${language}-${item.order || 0}`,
      order: englishItem?.order ?? arabicItem?.order ?? item.order ?? 0,
      EN: englishItem,
      AR: arabicItem
    });
  };

  englishItems.forEach((item) => addPair(item, 'EN'));
  arabicItems.forEach((item) => addPair(item, 'AR'));

  return pairs.sort((left, right) => left.order - right.order);
};