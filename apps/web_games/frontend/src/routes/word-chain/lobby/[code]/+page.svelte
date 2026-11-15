<script lang="ts">
  import {
    SSEConnection,
    type ServerResponse,
    type SSEMessage,
    type SSEStatus,
  } from '@jeffrey-carr/frontend-common';
  import { page } from '$app/state';
  import { RematchModal } from '$lib/components/word-chain';
  import { ConnectingPage, LobbyPage, Postgame } from '$lib/components/word-chain/gamestate-pages';
  import {
    buildJoinLobbyRouteInfo,
    buildLeaveLobbyRouteInfo,
    respondRematch,
    startLobby,
  } from '$lib/requests/word-chain';
  import { userState } from '$lib/globals/user.svelte';
  import {
    type GameData,
    type PlayerData,
    type SSEAction,
    type SSEGameStartData,
    type SSEGameWinData,
    type SSEPlayerJoinedData,
    type SSEPlayerLeftData,
    type SSEProgressUpdateData,
    type SSERespondRematchData,
  } from '$lib/types/word-chain';
  import { SvelteMap } from 'svelte/reactivity';
  import { onMount } from 'svelte';
  import Game from '$lib/components/word-chain/gamestate-pages/game.svelte';
  import { goto } from '$app/navigation';

  /**
    This is the main controller for the word chain game. Each "state" is handled by its own
    full-page component
  */

  const handlePlayerJoined = (player: SSEPlayerJoinedData) => {
    if (lobbyState !== 'lobby') return;
    players.set(player.uuid, {
      uuid: player.uuid,
      name: player.name,
      character: player.character,
      isHost: player.isHost,
    });
  };

  const handlePlayerLeft = (data: SSEPlayerLeftData) => {
    players.delete(data.uuid);
    if (data.uuid !== user?.uuid) {
      waitingForRematch = false;
      rematchProposedByOpponent = false;
      rematchModalOpen = false;
    }
  };

  const handleGameStart = (data: SSEGameStartData) => {
    if (lobbyState !== 'lobby') return;
    opponentUpdate = undefined;
    waitingForRematch = false;
    rematchProposedByOpponent = false;
    rematchModalOpen = false;
    game = data;
    lobbyState = 'game';
  };

  const handleProgressUpdate = (data: SSEProgressUpdateData) => {
    if (lobbyState !== 'game') return;
    opponentUpdate = { ...data };
  };

  const handlePlayerWin = (data: SSEGameWinData) => {
    if (lobbyState !== 'game') return;
    waitingForRematch = false;
    rematchProposedByOpponent = false;
    rematchModalOpen = false;
    postgame = data;
    lobbyState = 'postgame';
  };

  const handleProposeRematch = () => {
    rematchProposedByOpponent = true;
    rematchModalOpen = true;
  };

  const handleRespondRematch = (data: SSERespondRematchData) => {
    waitingForRematch = false;
    rematchProposedByOpponent = false;
    rematchModalOpen = false;
    rematchDeclined = !data.accepted;
    if (data.accepted) {
      lobbyState = 'lobby';
    }
  };

  const onSSEError = <T,>(message: SSEMessage<T>) => {
    console.error('error from BE', message);
  };

  const onSSEMessage = <T,>(message: SSEMessage<T>) => {
    if (message.level !== 'info') return;

    switch (message.action as SSEAction) {
      case 'player_joined':
        handlePlayerJoined(message.data as SSEPlayerJoinedData);
        break;
      case 'player_left':
        handlePlayerLeft(message.data as SSEPlayerLeftData);
        break;
      case 'game_start':
        handleGameStart(message.data as SSEGameStartData);
        break;
      case 'progress_update':
        handleProgressUpdate(message.data as SSEProgressUpdateData);
        break;
      case 'winner':
        handlePlayerWin(message.data as SSEGameWinData);
        break;
      case 'propose_rematch':
        handleProposeRematch();
        break;
      case 'respond_rematch':
        handleRespondRematch(message.data as SSERespondRematchData);
        break;
      default:
        console.error('Unknown message action', message);
    }
  };

  const onSSEStatusChange = (newStatus: SSEStatus) => {
    connectionState = newStatus;
  };

  // Game state data
  const LOBBY_STATES = ['connecting', 'lobby', 'game', 'postgame'] as const;
  type LobbyState = (typeof LOBBY_STATES)[number];
  let lobbyState = $state<LobbyState>('connecting');
  // game is the data for the active game
  let game = $state<GameData>();
  // postgame is the data for the postgame
  let postgame = $state<SSEGameWinData>();
  $inspect(postgame);

  // Rematch state
  let waitingForRematch = $state(false);
  let rematchDeclined = $state(false);
  let rematchProposedByOpponent = $state(false);
  let rematchModalOpen = $state(false);

  // Connection data
  let connectionCode = $derived(page.params.code.toLowerCase());
  let connectionState = $state<SSEStatus>('connecting');
  let connection = $state<SSEConnection>();
  let isConnecting = $derived(
    connectionState === 'connecting' || connectionState === 'reconnecting' || !userState.user
  );

  // User data
  let user = $derived(userState.user);
  let players = $state(new SvelteMap<string, PlayerData>());
  let opponent = $derived(Array.from(players.values()).find(player => player.uuid !== user?.uuid));
  let opponentUpdate = $state<SSEProgressUpdateData>();

  onMount(() => {
    if (connection) {
      return;
    }

    connect();
    return () => {
      connection?.disconnect();
    };
  });

  const connect = async () => {
    if (connectionState === 'connected') {
      return;
    }

    if (!connection) {
      connection = new SSEConnection(
        buildJoinLobbyRouteInfo(connectionCode),
        buildLeaveLobbyRouteInfo(connectionCode),
        onSSEError,
        onSSEMessage,
        onSSEStatusChange
      );
    }

    await connection.connect();
  };

  $effect(() => {
    if (isConnecting) {
      lobbyState = 'connecting';
    } else if (connectionState === 'connected') {
      lobbyState = 'lobby';
    }

    if (connectionState === 'disconnected') {
      // TODO: notification
      goto('/word-chain');
    }
  });

  const onStartLobby = async () => {
    try {
      await startLobby(connectionCode);
    } catch (e) {
      const serverResponse = e as ServerResponse;
      console.error(`Error starting lobby: ${serverResponse.data}`);
      return;
    }
  };

  const onProposeRematch = () => {
    waitingForRematch = true;
    rematchDeclined = false;
    rematchProposedByOpponent = false;
    rematchModalOpen = false;
    lobbyState = 'lobby';
  };

  const onRespondRematch = async (accepted: boolean) => {
    try {
      await respondRematch(connectionCode, accepted);
    } catch (e) {
      const serverResponse = e as ServerResponse;
      console.error(`Error responding to rematch: ${serverResponse.data}`);
      return;
    }

    waitingForRematch = false;
    rematchProposedByOpponent = false;
    if (accepted) {
      rematchDeclined = false;
      lobbyState = 'lobby';
    }
  };
</script>

<RematchModal
  bind:open={rematchModalOpen}
  {opponent}
  onAccept={() => onRespondRematch(true)}
  onDecline={() => onRespondRematch(false)}
/>

{#if lobbyState === 'lobby' && user}
  <LobbyPage {user} {players} {onStartLobby} {waitingForRematch} {rematchDeclined} />
{:else if lobbyState === 'game' && game}
  <Game initialData={game} {opponent} {opponentUpdate} />
{:else if lobbyState === 'postgame' && postgame}
  <Postgame
    winner={postgame.winningUUID}
    chain={postgame.chain}
    playerData={postgame.playerData}
    {onProposeRematch}
    {rematchProposedByOpponent}
    onOpenRematchModal={() => (rematchModalOpen = true)}
  />
{:else}
  <ConnectingPage />
{/if}

<style lang="scss">
</style>
