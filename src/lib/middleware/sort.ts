import { SortOrder } from '@/interfaces/query.interface';

export const processSort = (searchParams: URLSearchParams): SortOrder[] | null => {
  const sortParam = searchParams.get('sort');
  if (!sortParam) return null;

  const sortFields = sortParam.split(',').map(field => field.trim());
  const orderBy: SortOrder[] = [];

  sortFields.forEach(field => {
    const [fieldName, direction] = field.split(':');
    if (!fieldName) return;

    const order = direction?.toLowerCase() === 'desc' ? 'desc' : 'asc';
    orderBy.push({ [fieldName.trim()]: order });
  });

  return orderBy.length > 0 ? orderBy : null;
}; 