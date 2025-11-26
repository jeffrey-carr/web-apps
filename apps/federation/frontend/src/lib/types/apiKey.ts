export type APIKey = {
  key: string;
  app: string;
  active: boolean;
  grantedAt: Date;
  revokedAt?: Date;
  lastSeenAt: Date;
};
