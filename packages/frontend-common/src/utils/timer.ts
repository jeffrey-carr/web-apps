export class Timer {
  public static tickRate = 100;

  private durationMs: number;
  private remainingMs: number;
  private targetEndpoint?: number;
  private alert: () => void;
  private update?: (remainingMs: number) => void;

  private timeoutID?: NodeJS.Timeout;

  constructor(durationMs: number, alert: () => void, update?: (remainingMs: number) => void) {
    this.durationMs = durationMs;
    this.remainingMs = durationMs;
    this.alert = alert;
    this.update = update;
  }
  
  public start() {
    if (this.timeoutID != null || this.remainingMs === 0) {
      return;
    }
    
    this.targetEndpoint = Date.now() + this.durationMs;
    this.tick();
  }
  
  public reset() {
    clearTimeout(this.timeoutID);
    this.timeoutID = undefined;
    this.targetEndpoint = undefined;
    this.remainingMs = this.durationMs;
    this.update?.(this.remainingMs);
  }
  
  public stop() {
    clearTimeout(this.timeoutID);
    this.timeoutID = undefined;
  }
  
  private tick() {
    this.timeoutID = setTimeout(() => {
      if (!this.targetEndpoint) {
        return;
      }

      this.remainingMs = Math.max(this.targetEndpoint - Date.now(), 0);
      this.update?.(this.remainingMs);

      if (this.remainingMs === 0) {
        this.stop();
        this.alert();
        return;
      }

      this.tick();
    }, Timer.tickRate);
  }
}