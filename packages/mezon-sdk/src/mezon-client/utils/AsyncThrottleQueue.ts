const MESSAGE_PER_SECSON = 20;

export class AsyncThrottleQueue {
  private queue: (() => Promise<void>)[] = [];
  private isProcessing = false;

  constructor(private interval: number = MESSAGE_PER_SECSON) {}

  enqueue<T>(task: () => Promise<T>): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this.queue.push(async () => {
        try {
          const result = await task();
          resolve(result);
        } catch (err) {
          reject(err);
        }
      });

      if (!this.isProcessing) {
        this.processQueue();
      }
    });
  }

  private async processQueue() {
    this.isProcessing = true;
    while (this.queue.length > 0) {
      const task = this.queue.shift();
      if (task) {
        await task();
        await new Promise((r) => setTimeout(r, this.interval));
      }
    }
    this.isProcessing = false;
  }
}
