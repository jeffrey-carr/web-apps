export class Stack<T extends any>{
  private items: T[] = [];

  constructor() {}
  
  push(item: T) {
    this.items.push(item);
  }
  
  pop(): T | null {
    const size = this.size();

    if (size === 0) {
      return null;
    }

    const item = this.items[size-1];
    this.items = this.items.slice(0, size-1);
    
    return item;
  }
  
  size(): number {
    return this.items.length;
  }
}
