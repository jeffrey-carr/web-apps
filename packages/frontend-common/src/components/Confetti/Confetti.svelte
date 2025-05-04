<script lang="ts">
  import { generateRandomInt, generateRandomNumber, getRandomHexColor } from '../../utils';

  let canvas = $state<HTMLCanvasElement | null>(null);
  let ctx = $derived(canvas?.getContext('2d'));

  const MIN_SIZE = 2;
  const MAX_SIZE = 5;
  const SPEED = 1;
  const MIN_VELOCITY = 1;
  const MAX_VELOCITY = 2;
  const MAX_CONFETTI = 150;
  type Confetti = {
    x: number;
    y: number;
    velocity: number;
    sizePx: number;
    color: string;
  };

  const generateConfetti = (amount: number): Confetti[] => {
    if (!canvas || amount <= 0) {
      return [];
    }

    const width = canvas.width;

    return [...Array(amount)].map(() => ({
      x: generateRandomNumber(width),
      y: 0,
      velocity: generateRandomNumber(MIN_VELOCITY, MAX_VELOCITY),
      sizePx: generateRandomInt(MIN_SIZE, MAX_SIZE),
      color: getRandomHexColor(),
    }));
  };

  let confetti = generateConfetti(MAX_CONFETTI);
  const updateConfetti = (piece: Confetti): Confetti => {
    const updatedPiece = piece;
    updatedPiece.y = piece.y + SPEED * piece.velocity;
    return updatedPiece;
  };

  const draw = (ctx: CanvasRenderingContext2D, piece: Confetti) => {
    ctx.beginPath();
    ctx.fillRect(piece.x, piece.y, piece.sizePx, piece.sizePx);
    ctx.fillStyle = piece.color;
    ctx.fill();
  };

  const tick = () => {
    if (canvas == null || !ctx) {
      requestAnimationFrame(tick);
      return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Render
    for (const piece of confetti) {
      draw(ctx, piece);
    }
    // Update confetti position
    confetti = confetti.map(piece => updateConfetti(piece));
    // Clear trash confetti
    const before = confetti.length;
    confetti = confetti.filter(piece => piece.sizePx > 0 && piece.y < (canvas?.height ?? 500));

    // Fill in more confetti
    confetti.push(...generateConfetti(MAX_CONFETTI - confetti.length));

    requestAnimationFrame(tick);
  };

  tick();
</script>

<div class="container">
  <canvas class="canvas" bind:this={canvas}></canvas>
</div>

<style>
  .container {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 5;

    display: flex;
    justify-content: center;
    align-items: center;

    height: 100vh;
    width: 100vw;
  }

  .canvas {
    position: absolute;
    top: 0;
    left: 0;

    height: 100vh;
    width: 100vw;
  }
</style>
