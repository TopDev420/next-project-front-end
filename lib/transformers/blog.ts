import { ParsedUrlQuery } from 'querystring';

export const getSearchQueryFromRequest = (query: ParsedUrlQuery) => {
  const pageStr = query.page;
  let page = parseInt(String(pageStr || ''), 10);
  if (Number.isNaN(page) || page < 1) {
    page = 1;
  }
  const search = String(query.query || '') || '';
  return { page, query: search };
};
