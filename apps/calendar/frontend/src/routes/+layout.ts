import { getCalendars } from '$lib/request';
import type { GetCalendarsResponse } from '$lib/types/request';

export const load = async (): Promise<GetCalendarsResponse | null> => {
  let response: GetCalendarsResponse | null;
  try {
    response = await getCalendars();
  } catch(e) {
    return null;
  }

  return response;
};

