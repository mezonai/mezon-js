const MAX_PER_SECSON = 80;

export class AsyncThrottleQueue {
  private timestamps: number[] = [];
  private queue: (() => void)[] = [];
  private isRunning = false;

  constructor(private maxPerSecond = MAX_PER_SECSON) {
    this.start();
  }

  enqueue<T>(task: () => Promise<T>): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this.queue.push(() => {
        task().then(resolve).catch(reject);
      });
    });
  }

  private start() {
    if (this.isRunning) return;
    this.isRunning = true;

    const loop = async () => {
      while (true) {
        this.cleanupTimestamps();

        if (this.queue.length > 0 && this.timestamps.length < this.maxPerSecond) {
          const task = this.queue.shift();
          if (task) {
            this.timestamps.push(Date.now());
            task();
          }
        }

        await new Promise((r) => setTimeout(r, 10));
      }
    };

    loop();
  }

  private cleanupTimestamps() {
    const now = Date.now();
    this.timestamps = this.timestamps.filter(t => now - t < 1000);
  }
}
