import type { UserFavoriteRecipe } from "$lib/types/recipe";
import type { User } from "@jeffrey-carr/frontend-common";

export const userState = $state<{ user?: User | null; isLoading: boolean; }>({
  isLoading: true,
});

export const userFavorites = $state<{ favorites?: UserFavoriteRecipe[] | null; isLoading: boolean; }>({
  isLoading: true,
});
