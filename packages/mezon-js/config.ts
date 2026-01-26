// NOTE: Fetch strategy configuration for mezon-js
// Allows injecting custom fetch implementation (e.g., NativeHttpClient for mobile)

type Fetcher = typeof fetch;

let currentFetcher: Fetcher = fetch;

/**
 * Set a custom fetch strategy for mezon-js API calls
 * @param customFetcher - A fetch-compatible function
 */
export const setFetchStrategy = (customFetcher: Fetcher): void => {
	currentFetcher = customFetcher;
};

/**
 * Get the current fetch strategy
 * @returns The current fetcher function
 */
export const getFetcher = (): Fetcher => currentFetcher;
