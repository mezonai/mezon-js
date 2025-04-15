import Collection from "./Collection";

export class CacheManager<K, V> {
  public cache: Collection<K, V>;

  constructor(
    private fetcher: (id: K) => Promise<V>,
    private maxSize: number = Infinity
  ) {
    this.cache = new Collection<K, V>();
  }

  get size(): number {
    return this.cache.size;
  }

  get(id: K): V | undefined {
    return this.cache.get(id);
  }

  set(id: K, value: V): void {
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.firstKey();
      if (firstKey) this.cache.delete(firstKey);
    }
    this.cache.set(id, value);
  }

  async fetch(id: K): Promise<V> {
    const existing = this.get(id);
    if (existing) return existing;

    const fetched = await this.fetcher(id);
    this.set(id, fetched);
    return fetched;
  }

  first(): V | undefined {
    return this.cache.first();
  }

  filter(fn: (value: V) => boolean): Collection<K, V> {
    return this.cache.filter(fn);
  }

  map<T>(fn: (value: V) => T): T[] {
    return this.cache.map(fn);
  }

  values(): IterableIterator<V> {
    return this.cache.values();
  }
}
