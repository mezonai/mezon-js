// src/utils/Collection.ts

export default class Collection<K, V> extends Map<K, V> {
  constructor(entries?: readonly (readonly [K, V])[] | null) {
    super(entries ?? []);
  }

  public get size(): number {
    return super.size;
  }

  public set(key: K, value: V): this {
    super.set(key, value);
    return this;
  }

  public delete(key: K): boolean {
    return super.delete(key);
  }

  public has(key: K): boolean {
    return super.has(key);
  }

  public get(key: K): V | undefined {
    return super.get(key);
  }

  public first(): V | undefined {
    return this.values().next().value;
  }

  public last(): V | undefined {
    return [...this.values()].at(-1);
  }

  public filter(fn: (value: V, key: K, collection: this) => boolean): Collection<K, V> {
    const filtered = new Collection<K, V>();
    for (const [key, value] of this) {
      if (fn(value, key, this)) {
        filtered.set(key, value);
      }
    }
    return filtered;
  }

  public find(fn: (value: V, key: K, collection: this) => boolean): V | undefined {
    for (const [key, value] of this) {
      if (fn(value, key, this)) return value;
    }
    return undefined;
  }

  public map<T>(fn: (value: V, key: K, collection: this) => T): T[] {
    const result: T[] = [];
    for (const [key, value] of this) {
      result.push(fn(value, key, this));
    }
    return result;
  }

  public some(fn: (value: V, key: K, collection: this) => boolean): boolean {
    for (const [key, value] of this) {
      if (fn(value, key, this)) return true;
    }
    return false;
  }

  public every(fn: (value: V, key: K, collection: this) => boolean): boolean {
    for (const [key, value] of this) {
      if (!fn(value, key, this)) return false;
    }
    return true;
  }

  public reduce<T>(fn: (acc: T, val: V, key: K, col: this) => T, initialValue: T): T {
    let acc = initialValue;
    for (const [key, value] of this) {
      acc = fn(acc, value, key, this);
    }
    return acc;
  }

  public random(): V | undefined {
    const arr = [...this.values()];
    if (!arr.length) return undefined;
    return arr[Math.floor(Math.random() * arr.length)];
  }

  public sort(compareFn?: (a: V, b: V) => number): Collection<K, V> {
    const sorted = [...this.entries()].sort((a, b) =>
      compareFn ? compareFn(a[1], b[1]) : 0
    );
    return new Collection<K, V>(sorted);
  }

  public clear(): void {
    super.clear();
  }

  public keysArray(): K[] {
    return [...this.keys()];
  }

  public valuesArray(): V[] {
    return [...this.values()];
  }

  public entriesArray(): [K, V][] {
    return [...this.entries()];
  }
}
