export class Tuple<T, K> {
  constructor(private first: T, private second: K) {}

  public getFirst(): T {
    return this.first;
  }

  public getSecond(): K {
    return this.second;
  }

  public toArray(): (T | K)[] {
    return [this.first, this.second];
  }
}