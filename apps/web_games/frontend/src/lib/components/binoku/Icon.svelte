<svg class="icon" fill="currentColor" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <rect
    x="5"
    y="5"
    width="90"
    height="90"
    rx="15"
    fill="none"
    stroke="currentColor"
    stroke-width="2.5"
  />
  <line class="innerBorder" x1="38" y1="10" x2="38" y2="90" stroke="currentColor" />
  <line class="innerBorder" x1="62" y1="10" x2="62" y2="90" stroke="currentColor" />
  <line class="innerBorder" x1="10" y1="38" x2="90" y2="38" stroke="currentColor" />
  <line class="innerBorder" x1="10" y1="62" x2="90" y2="62" stroke="currentColor" />

  <text class="cell one" x="20" y="30" font-size="18">1</text>
  <text class="cell zero" x="45" y="30" font-size="18">0</text>
  <text class="cell zero" x="70" y="30" font-size="18">0</text>
  <text class="cell one" x="20" y="55" font-size="18">1</text>
  <text class="cell zero" x="45" y="55" font-size="18">0</text>
  <text class="cell one" x="70" y="55" font-size="18">1</text>
  <text class="cell zero" x="20" y="80" font-size="18">0</text>
  <text class="cell one" x="45" y="80" font-size="18">1</text>
  <text class="cell zero" x="70" y="80" font-size="18">0</text>
</svg>

<style class="scss">
  .icon {
    height: 100%;
    width: 100%;

    rect {
      stroke: var(--app-theme-text-primary);
    }
  }

  .innerBorder {
    stroke-width: 1;
  }

  .cell {
    font-family: monospace;
  }
  .zero {
    fill: var(--red);
  }
  .one {
    fill: var(--blue);
  }
</style>
