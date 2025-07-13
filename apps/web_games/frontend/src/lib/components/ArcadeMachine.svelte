<script lang="ts">
  export let gameName: string = 'Binoku';
  export let score: number = 0;
</script>

<div class="arcade-machine">
  <div class="marquee">{gameName}</div>
  <div class="screen">
    <span class="label">Score</span>
    <span class="value">{score}</span>
  </div>
  <div class="controls">
    <div class="joystick"></div>
    <div class="buttons">
      <div class="button red"></div>
      <div class="button yellow"></div>
      <div class="button blue"></div>
    </div>
  </div>
</div>

<style>
  .arcade-machine {
    width: 260px;
    background: #5c3b8a;
    border-radius: 12px;
    padding: 12px;
    color: #fff;
    font-family: 'Luckiest Guy', cursive;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }

  .marquee {
    background: #f6b400;
    color: #222;
    text-align: center;
    font-size: 1.3rem;
    padding: 6px;
    border-radius: 6px;
    margin-bottom: 10px;
  }

  .screen {
    background: #2d2f80;
    border-radius: 6px;
    padding: 20px 0;
    text-align: center;
    font-size: 1.1rem;
    margin-bottom: 16px;
  }

  .label {
    display: block;
    font-size: 0.9rem;
    opacity: 0.8;
  }

  .value {
    display: block;
    font-size: 1.6rem;
    margin-top: 4px;
  }

  .controls {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  .joystick {
    width: 30px;
    height: 30px;
    background: red;
    border-radius: 50%;
    box-shadow: 0 0 0 6px #222;
  }

  .buttons {
    display: flex;
    gap: 8px;
  }

  .button {
    width: 18px;
    height: 18px;
    border-radius: 50%;
  }

  .red {
    background: #e74c3c;
  }

  .yellow {
    background: #f1c40f;
  }

  .blue {
    background: #3498db;
  }
</style>
