export const NOTIFICATION_LEVELS = ['info', 'warning', 'error'] as const;
export type NotificationLevel = (typeof NOTIFICATION_LEVELS)[number];
