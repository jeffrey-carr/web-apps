import { parseSearchQueryString } from '$lib/mappers/recipe';
import type { SearchOptions } from '$lib/types/recipe';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ url }) => {
  const searchOpts = parseSearchQueryString(url.searchParams);
  return { searchOpts };
};
