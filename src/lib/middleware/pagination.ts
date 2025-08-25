export const processPagination = (searchParams: URLSearchParams) => {
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '10', 10);

  // Validate and sanitize values
  const validPage = Math.max(1, isNaN(page) ? 1 : page);
  const validLimit = Math.min(100, Math.max(1, isNaN(limit) ? 10 : limit));

  return {
    skip: (validPage - 1) * validLimit,
    take: validLimit,
    page: validPage,
    limit: validLimit
  };
}; 