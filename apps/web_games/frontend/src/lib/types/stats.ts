export type UserStats = {
  userUUID: string;
  binoku: BinokuStats;
  wordChain: WordChainStats;
};

export type UserStatsResponse = UserStats & {
  binoku: {
    gameName: string;
    gamesPlayed: number;
    gamesCompleted: number;
  };
  wordChain: {
    gameName: string;
    gamesPlayed: number;
    gamesCompleted: number;
  };
};

export type CommonStats = {
  gameName: string;
  gamesPlayed: number;
  gamesCompleted: number;
};
export type BinokuStats = CommonStats & { x: number };
export type WordChainStats = CommonStats;
