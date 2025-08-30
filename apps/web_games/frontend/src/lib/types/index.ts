import type { User } from '@jeffrey-carr/frontend-common';
import type { UserStatsResponse } from './stats';

export type GetUserResponse = {
  user: User;
  stats: UserStatsResponse;
};
