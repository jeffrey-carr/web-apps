import type { User } from "@jeffrey-carr/frontend-common"
import type { Calendar } from "./calendar";

export type GetCalendarsResponse = {
  user: User;
  // calendars is a record of uuid -> calendar
  calendars: Record<string, Calendar>;
};

