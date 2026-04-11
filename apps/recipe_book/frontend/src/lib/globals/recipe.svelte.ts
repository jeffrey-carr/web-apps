import type { Tag } from '$lib/types/recipe';

export const tagsState = $state<{ tags?: Tag[] }>({});
