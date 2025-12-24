import type { User } from "@jeffrey-carr/frontend-common";

export const userState = $state<{ user?: User | null; isLoading: boolean; }>({
  isLoading: true,
});
