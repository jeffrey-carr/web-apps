export const getFirstDayOfMonth = (year: number, month: number): number => {
  return new Date(year, month).getDay();
};
export const getDaysInMonth = (year: number, month: number): number => {
  return new Date(year, month%12, 0).getDate();
};
export const getMonthName = (year: number, month: number, locale?: Intl.LocalesArgument): string => {
  return new Date(year, month).toLocaleString(locale ?? 'en-US', { month: 'long' });
};
export const getWeekdayName = (year: number, month: number, day: number, locale?: Intl.LocalesArgument): string => {
  return new Date(year, month, day).toLocaleString(locale ?? 'en-US', { weekday: 'long' });
};
export const friendlyPrintDate = (year: number, month: number, day: number, locale?: Intl.LocalesArgument, includeYear = true): string => {
  const date = new Date(2025, month, day);
  const dayStr = date.toLocaleDateString(locale ?? 'en-US', { day: 'numeric' });
  const monthStr = date.toLocaleDateString(locale ?? 'en-US', { month: 'long' });

  const suffix =
    dayStr.endsWith('1') && dayStr !== '11' ? 'st' :
    dayStr.endsWith('2') && dayStr !== '12' ? 'nd' :
    dayStr.endsWith('3') && dayStr !== '13' ? 'rd' : 'th';

  let yearStr = "";
  if (includeYear) {
    yearStr += `, ${year}`;
  }

  return `${monthStr} ${dayStr}${suffix}${yearStr}`;
};

// TODO - timezones
export const epochStringToFriendlyPrintDate = (epoch: number): string => {
  console.log(`Getting epoch string from ${epoch}`);
  const date = new Date(epoch);
  console.log(date);
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

