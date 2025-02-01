export class InMemoryStorage<T> implements Storage<T> {
  private storage: { [key: string]: T } = {};

  async getObject(key: string): Promise<T> {
    return this.storage[key];
  }

  async getAllObjects(): Promise<T[]> {
    return Object.values(this.storage);
  }

  async setObject(key: string, value: T): Promise<void> {
    this.storage[key] = value;
  }
}

export interface Storage<T> {
    getObject(key: string): Promise<T>;
    getAllObjects(): Promise<T[]>;
    setObject(key: string, value: T): Promise<void>;
}