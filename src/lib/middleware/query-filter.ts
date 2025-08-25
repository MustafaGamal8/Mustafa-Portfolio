const validOperators = ['gt', 'lt', 'gte', 'lte', 'contains', 'in'] as const;
const numericFields = new Set(['id', 'age', 'price', 'rating']);

const isNumericField = (field: string): boolean => {
  return numericFields.has(field) || field.endsWith('Id') || field.endsWith('_id');
};

const parseValue = (value: string, shouldBeNumeric: boolean): number | string | undefined => {
  if (shouldBeNumeric) {
    const num = Number(value);
    return !isNaN(num) ? num : undefined;
  }
  return value;
};

const parseArrayValues = (values: string[], shouldBeNumeric: boolean): (number | string)[] => {
  return shouldBeNumeric 
    ? values.map(v => Number(v)).filter(n => !isNaN(n)) 
    : values;
};

const setNestedObject = (filters: any, path: string[], value: any) => {
  let current = filters;
  while (path.length > 1) {
    const key = path.shift()!;
    current = current[key] = current[key] || {};
  }
  current[path[0]] = value;
};

export const processQueryFilters = (searchParams: URLSearchParams) => {
  const filters: any = {};
  const filterParam = searchParams.get('filter');

  if (filterParam && filterParam.startsWith('[') && filterParam.endsWith(']')) {
    const filterItems = filterParam.slice(1, -1).split(',');

    filterItems.forEach(item => {
      const parts = item.split('=');
      if (parts.length !== 2) return;

      const [key, value] = parts.map(p => p.trim());
      const keyPath = key.split('.'); // Handle nested keys
      const shouldBeNumeric = isNumericField(keyPath[keyPath.length - 1]);

      const operatorMatch = value.match(/^(gt|lt|gte|lte|contains):(.+)$/);
      if (operatorMatch) {
        const [, operator, operatorValue] = operatorMatch;
        if (!validOperators.includes(operator as any)) return;
        
        setNestedObject(
          filters, 
          keyPath, 
          { [operator]: operator === 'contains' ? operatorValue : parseValue(operatorValue, shouldBeNumeric) }
        );
      } else if (value.includes('|')) {
        const parsedValues = parseArrayValues(value.split('|'), shouldBeNumeric);
        if (parsedValues.length > 0) {
          setNestedObject(filters, keyPath, { in: parsedValues });
        }
      } else {
        const parsedValue = parseValue(value, shouldBeNumeric);
        if (parsedValue !== undefined) {
          setNestedObject(filters, keyPath, parsedValue);
        }
      }
    });
  }

  return Object.keys(filters).length > 0 ? filters : null;
}; 