export class MetricsLatencyApi {
    private readonly maxAllowedFailures = 3;

    // 95% request phải <= 1s
    private readonly minAllowedFastRate = 0.95;

    private readonly maxAllowedLatencyMs = 1000;

    private startTime = 0;

    private totalRequests = 0;
    private failed = 0;
    private slowCount = 0;

    public start(): void {
        this.startTime = performance.now();
    }

    public end(isError = false): void {
        const durationMs = performance.now() - this.startTime;
        this.totalRequests++;

        if (isError) {
            this.failed++;
        } else if (durationMs > this.maxAllowedLatencyMs) {
            this.slowCount++;
        }

        if (this.totalRequests >= 10) {
            const fastRate = (this.totalRequests - this.slowCount) / this.totalRequests;
            console.warn("RATE ENDPOINT",durationMs,this.totalRequests , this.slowCount,fastRate);
        }
    }

    public get shouldSwitch(): boolean {
        if (this.totalRequests <= 10) {
            return false;
        }

        const fastRate = (this.totalRequests - this.slowCount) / this.totalRequests;

        return this.failed >= this.maxAllowedFailures || fastRate < this.minAllowedFastRate;
    }

    public get stats() {
        const slowRate = this.totalRequests > 0 ? this.slowCount / this.totalRequests : 0;

        const fastRate = this.totalRequests > 0 ? (this.totalRequests - this.slowCount) / this.totalRequests : 0;

        return {
            totalRequests: this.totalRequests,
            failedCount: this.failed,
            slowCount: this.slowCount,
            slowRate,
            fastRate,
            isUnhealthy: this.shouldSwitch,
        };
    }

    public reset(): void {
        this.startTime = 0;
        this.totalRequests = 0;
        this.failed = 0;
        this.slowCount = 0;
    }
}
