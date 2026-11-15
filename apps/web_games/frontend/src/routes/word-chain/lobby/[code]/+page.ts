import { redirect } from '@sveltejs/kit';
import type { RouteParams } from '$app/types';

export const load = async ({ params }: { params: RouteParams<string> }) => {
  const code: string = params.code.toLowerCase();
  if (!code) kick('no code');

  const codeParts = code.split('-');
  if (codeParts.length !== 3) kick('incorrect parts length');
  if (codeParts.some(word => word.trim().length === 0)) kick('empty word');

  return { code };
};

const kick = (reason: string) => {
  console.error(`kicking user back to home page: ${reason}`);
  throw redirect(307, 'word-chain');
};
