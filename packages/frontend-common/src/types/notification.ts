export const NOTIFICATION_LEVELS = ['info', 'warning', 'error', 'success'] as const;
export type NotificationLevel = (typeof NOTIFICATION_LEVELS)[number];
export type NotificationInfo = {
  title?: string;
  message: string;
  level?: NotificationLevel;
};

