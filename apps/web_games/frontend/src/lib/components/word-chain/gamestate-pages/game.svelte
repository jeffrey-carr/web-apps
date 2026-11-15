<script lang="ts">
  import { page } from '$app/state';
  import { validateGuess } from '$lib/requests/word-chain';
  import type { GameData, PlayerData, SSEProgressUpdateData } from '$lib/types/word-chain';
  import Game from '../Game.svelte';

  const LOBBY_CODE = page.params.code.toLowerCase();

  let {
    initialData,
    opponent,
    opponentUpdate,
  }: {
    initialData: GameData;
    opponent?: PlayerData;
    opponentUpdate?: SSEProgressUpdateData;
  } = $props();
  let data = $state(structuredClone($state.snapshot(initialData)));
  let timedOutUntil = $state<number>();

  $effect.pre(() => {
    data = structuredClone($state.snapshot(initialData));
  });

  const onMakeGuess = async (guess: string) => {
    const response = await validateGuess({ guess, lobbyCode: LOBBY_CODE });
    // victory message comes through SSE, so we can ignore the one here
    if (response.victory) return;
    if (response.penaltyInSeconds) {
      timedOutUntil = Date.now() + response.penaltyInSeconds * 1000;
    }
    data = response.state;
  };
</script>

<div class="container">
  <Game
    chain={data.chain}
    progress={data.progress}
    {onMakeGuess}
    {timedOutUntil}
    {opponent}
    {opponentUpdate}
  />
</div>
