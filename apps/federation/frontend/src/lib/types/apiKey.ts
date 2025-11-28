export type APIKey = {
  key: string;
  app: string;
  isActive: boolean;
  grantedAt: Date;
  revokedAt?: Date;
  lastSeenAt: Date;
};
