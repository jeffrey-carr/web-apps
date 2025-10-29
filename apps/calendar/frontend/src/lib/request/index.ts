import type { CreateCalendarRequest, UpdateCalendarRequest } from "$lib/types";
import type { GetCalendarsResponse } from "$lib/types/request";
import { makeRequest, METHODS } from "@jeffrey-carr/frontend-common";

export const getCalendars = async (): Promise<GetCalendarsResponse | null> => {
  let response: Response;
  try {
    response = await makeRequest({
      path: "/api/my-calendars",
      method: METHODS.GET,
      credentials: 'required',
    });
  } catch (e) {
    return null;
  }

  if (response.status !== 200) {
    return null;
  }

  return await response.json();
};

export const createCalendar = async (req: CreateCalendarRequest) => {
  let response: Response;
  try {
    response = await makeRequest(
      {
        path: "/api/calendars",
        method: METHODS.POST,
        credentials: 'required',
      },
      { body: req },
    );
  } catch (e) {
    throw Error("Error creating calendar");
  }

  if (response.status !== 200) {
    throw Error("Error creating calendar");
  }
};

export const updateCalendar = async (uuid: string, req: UpdateCalendarRequest) => {
  let response: Response;
  try {
    response = await makeRequest(
      {
        path: `/api/calendars/${uuid}`,
        method: METHODS.PUT,
        credentials: 'required',
      },
      { body: req },
    );
  } catch (e) {
    throw Error("Error updating calendar");
  }

  if (response.status !== 200) {
    throw Error("Error updating calendar");
  }
  
  return await response.json();
}
