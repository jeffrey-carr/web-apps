export type Calendar = {
  uuid: string;
  userUUID: string;
  name: string;
  months: Record<number, DayData>[];
  year: number;
  modifiedAt: number;
  createdAt: number;
};

export type DayData = {
	events: string[];
  imageURL: string;
};

export type CreateCalendarRequest = {
  name: string;
};

export type UpdateCalendarRequest = {
  name?: string;
  months?: Record<number, DayData>[];
};

export const DAYS_OF_THE_WEEK = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
] as const;
export type DayOfTheWeek = typeof DAYS_OF_THE_WEEK[number];
