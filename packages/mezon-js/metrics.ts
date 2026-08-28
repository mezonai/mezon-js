export class MetricsLatencyApi {
    private readonly maxAllowedFailures = 3;

    private readonly minAllowedFastRate = 0.95;
    private readonly maxAllowedLatencyMs = 1000;

    private readonly metricsWindowMs = 60_000;
    private readonly minRequests = 10;

    private windowStartTime = 0;

    private totalRequests = 0;
    private failed = 0;
    private slowCount = 0;

    private readonly requests = new Map<number, number>();

    public start(requestId: number): void {
        this.requests.set(requestId, performance.now());
    }

    public end(requestId: number, isError = false): void {

        const startTime = this.requests.get(requestId);

        if (startTime === undefined) {
            return;
        }

        const now = performance.now();
        if (
            this.windowStartTime !== 0 &&
            startTime - this.windowStartTime >= this.metricsWindowMs
        ) {
            this.reset();
            this.windowStartTime = startTime;
        }

        const durationMs = now - startTime;

        this.totalRequests++;

        if (isError) {
            this.failed++;
        } else if (durationMs > this.maxAllowedLatencyMs) {
            this.slowCount++;
        }

        if (this.totalRequests >= this.minRequests) {
            const fastRate =
                (this.totalRequests - this.slowCount) /
                this.totalRequests;

            console.warn(
                `RATE ENDPOINT ${requestId}`,
                durationMs,
                'TOTAL :', this.totalRequests,
                'SLOW :', this.slowCount,
                'RATE :', fastRate
            );
        }
        this.requests.delete(requestId);

    }

    public get shouldSwitch(): boolean {
        if (this.totalRequests < this.minRequests) {
            return false;
        }

        const fastRate =
            (this.totalRequests - this.slowCount) /
            this.totalRequests;

        return (
            this.failed >= this.maxAllowedFailures ||
            fastRate < this.minAllowedFastRate
        );
    }

    public get stats() {
        const slowRate =
            this.totalRequests > 0
                ? this.slowCount / this.totalRequests
                : 0;

        const fastRate =
            this.totalRequests > 0
                ? (this.totalRequests - this.slowCount) /
                  this.totalRequests
                : 0;

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
        this.windowStartTime = 0;
        this.totalRequests = 0;
        this.failed = 0;
        this.slowCount = 0;
        this.requests.clear();
    }
}