type AsyncFn<T> = () => Promise<T>;

export class RateLimiter {
  public readonly minTimeMs: number;
  private queue: Array<{
    fn: AsyncFn<any>;
    resolve: (value: any) => void;
    reject: (error: any) => void;
  }> = [];
  private running = false;
  private lastRunAt = 0;

  constructor(minTimeMs = 1000) {
    this.minTimeMs = minTimeMs;
  }

  schedule<T>(fn: AsyncFn<T>): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this.queue.push({ fn, resolve, reject });
      void this.run();
    });
  }

  private async run(): Promise<void> {
    if (this.running) return;
    this.running = true;

    while (this.queue.length > 0) {
      const now = Date.now();
      const wait = Math.max(0, this.minTimeMs - (now - this.lastRunAt));
      if (wait > 0) await new Promise((r) => setTimeout(r, wait));

      const job = this.queue.shift()!;
      try {
        this.lastRunAt = Date.now();
        const res = await job.fn();
        job.resolve(res);
      } catch (e) {
        job.reject(e);
      }
    }

    this.running = false;
  }
}
