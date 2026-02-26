const GLOBAL_KEY = Symbol.for("mezon.refreshTokenManager");

export interface RefreshResult {
  token: string;
  refresh_token: string;
  is_remember: boolean;
}

export class RefreshTokenManager {
  private pendingRefreshes: Map<string, Promise<RefreshResult>> = new Map();

  private constructor() {}

  static getInstance(): RefreshTokenManager {
    const g = globalThis as Record<symbol, unknown>;
    if (!g[GLOBAL_KEY]) {
      g[GLOBAL_KEY] = new RefreshTokenManager();
    }
    return g[GLOBAL_KEY] as RefreshTokenManager;
  }

  async refresh(
    refreshToken: string,
    refreshFn: () => Promise<RefreshResult>,
  ): Promise<RefreshResult> {
    const existing = this.pendingRefreshes.get(refreshToken);
    if (existing) {
      return existing;
    }

    const promise = refreshFn().finally(() => {
      this.pendingRefreshes.delete(refreshToken);
    });

    this.pendingRefreshes.set(refreshToken, promise);
    return promise;
  }

  isRefreshing(refreshToken: string): boolean {
    return this.pendingRefreshes.has(refreshToken);
  }

  get pendingCount(): number {
    return this.pendingRefreshes.size;
  }
}
