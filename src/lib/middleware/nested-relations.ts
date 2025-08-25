type NestedInclude = {
  [key: string]: boolean | {
    include: NestedInclude;
  };
};

const buildNestedInclude = (path: string): NestedInclude => {
  const parts = path.split('.');
  const result: NestedInclude = {};
  let current = result;

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    if (i === parts.length - 1) {
      // For the last part, just set it to true
      current[part] = true;
    } else {
      // For intermediate parts, create an include object
      current[part] = { include: {} };
      current = (current[part] as { include: NestedInclude }).include;
    }
  }

  return result;
};

const mergeIncludes = (target: NestedInclude, source: NestedInclude): NestedInclude => {
  const result = { ...target };

  for (const [key, value] of Object.entries(source)) {
    if (key in result) {
      const targetValue = result[key];
      const sourceValue = value;

      if (targetValue === true || sourceValue === true) {
        // If either is true, keep it true
        result[key] = true;
      } else if (typeof targetValue === 'object' && typeof sourceValue === 'object' &&
        'include' in targetValue && 'include' in sourceValue) {
        // Both have include objects, merge them recursively
        result[key] = {
          include: mergeIncludes(
            targetValue.include,
            sourceValue.include
          )
        };
      }
    } else {
      // Key doesn't exist in target, just add it
      result[key] = value;
    }
  }

  return result;
};

const transformToInclude = (fields: NestedInclude): NestedInclude => {
  const result: NestedInclude = {};

  for (const [key, value] of Object.entries(fields)) {
    if (value === true) {
      result[key] = true;
    } else if (typeof value === 'object') {
      result[key] = {
        include: transformToInclude(
          'include' in value ? value.include : value
        )
      };
    }
  }

  return result;
};

export const processNestedRelations = (searchParams: URLSearchParams) => {
  const nested = searchParams.get('nested');
  if (!nested) return null;

  try {
    // Parse nested relations from query parameter
    const relations = nested.replace(/[\[\]]/g, '').split(',').map(r => r.trim());

    // Build and merge include objects for all relations
    const include = relations.reduce((acc, relation) => {
      // Handle both simple and nested relations
      if (relation.includes('.')) {
        // Nested relation (e.g., "projects.subscriptions")
        const nestedInclude = buildNestedInclude(relation);
        return mergeIncludes(acc, nestedInclude);
      } else {
        // Simple relation (e.g., "projects")
        acc[relation] = true;
        return acc;
      }
    }, {} as NestedInclude);

    // Transform the final structure
    return transformToInclude(include);
  } catch (error) {
    console.error('Error processing nested relations:', error);
    return null;
  }
}; 