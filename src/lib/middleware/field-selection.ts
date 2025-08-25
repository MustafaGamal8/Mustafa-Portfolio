type SelectObject = {
  [key: string]: boolean | SelectObject;
};

const parseSelectString = (selectStr: string): SelectObject => {
  const fields = selectStr.split(',').map(f => f.trim());
  const selectObject: SelectObject = {};

  fields.forEach(field => {
    const parts = field.split('.');
    let current = selectObject;

    parts.forEach((part, index) => {
      if (index === parts.length - 1) {
        current[part] = true;
      } else {
        current[part] = current[part] || {};
        current = current[part] as SelectObject;
      }
    });
  });

  return selectObject;
};

export const processFieldSelection = (searchParams: URLSearchParams) => {
  const select = searchParams.get('fields');
  if (!select) return null;

  try {
    return parseSelectString(select);
  } catch (error) {
    console.error('Error processing field selection:', error);
    return null;
  }
}; 