import { describe, it, expect, beforeEach } from 'vitest';
import { InMemoryStorage, Storage } from './Storage';

describe('InMemoryStorage', () => {
  let storage: Storage<string>;

  beforeEach(() => {
    storage = new InMemoryStorage<string>();
  });

  it('should set and get an object', async () => {
    await storage.setObject('key1', 'value1');
    const result = await storage.getObject('key1');
    expect(result).toBe('value1');
  });

  it('should return undefined for a non-existing key', async () => {
    const result = await storage.getObject('nonExistingKey');
    expect(result).toBeUndefined();
  });

  it('should get all objects', async () => {
    await storage.setObject('key1', 'value1');
    await storage.setObject('key2', 'value2');
    const result = await storage.getAllObjects();
    expect(result).toEqual(['value1', 'value2']);
  });

  it('should delete an object', async () => {
    await storage.setObject('key1', 'value1');
    await storage.deleteObject('key1');
    const result = await storage.getObject('key1');
    expect(result).toBeUndefined();
  });

  it('should handle deleting a non-existing key gracefully', async () => {
    await storage.deleteObject('nonExistingKey');
    const result = await storage.getObject('nonExistingKey');
    expect(result).toBeUndefined();
  });
});