import { METHODS, type RouteInformation, type User } from "@jeffrey-carr/frontend-common";

export type CommonStats = {
  gameName: string;
  gamesPlayed: number;
  gamesCompleted: number;
};
export type BinokuStats = CommonStats;
export type WordChainStats = CommonStats;
export type UserStats = {
  userUUID: string;
  binoku: BinokuStats;
  wordChain: WordChainStats;
};

export type GetUserResponse = {
  user: User;
  stats: UserStats;
};

export const ROUTES: Record<string, RouteInformation> = {
  ME: {
    path: '/api/user/me',
    method: METHODS.GET,
  },
};