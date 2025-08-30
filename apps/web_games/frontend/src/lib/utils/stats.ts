import type { BinokuStats, CommonStats, WordChainStats } from '$lib/types/stats';

export const commonStatsToStrings = (stats: CommonStats): string[] => {
  return [`Games Played: ${stats.gamesPlayed}`, `Games Completed: ${stats.gamesCompleted}`];
};

export const binokuStatsToStrings = (stats: BinokuStats): string[] => {
  const commonStatsStrings = commonStatsToStrings(stats);
  return [...commonStatsStrings];
};

export const wordChainStatsToStrings = (stats: WordChainStats): string[] => {
  const commonStatsStrings = commonStatsToStrings(stats);
  return [...commonStatsStrings];
};
