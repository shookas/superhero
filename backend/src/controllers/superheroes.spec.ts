import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Request, Response } from 'express';
import { SuperheroController } from './superheroes';
import { Storage } from '../repositories/Storage';
import { Superhero } from '../types/superhero';

describe('SuperheroController', () => {
  let storage: Storage<Superhero>;
  let controller: SuperheroController;
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    storage = {
      getAllObjects: vi.fn(),
      setObject: vi.fn(),
      deleteObject: vi.fn(),
    } as unknown as Storage<Superhero>;
    controller = new SuperheroController(storage);
    req = {};
    res = {
      json: vi.fn(),
    };
  });

  it('should get all superheroes', async () => {
    const superheroes = [new Superhero('Superman', ['flight', 'strength'])];
    vi.mocked(storage.getAllObjects).mockResolvedValue(superheroes);

    await controller.getSuperheroes(req as Request, res as Response);

    expect(storage.getAllObjects).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(superheroes);
  });

  it('should create a superhero', async () => {
    req.body = { name: 'Batman', powers: ['intelligence', 'wealth'] };

    await controller.createSuperhero(req as Request, res as Response);

    expect(storage.setObject).toHaveBeenCalledWith('Batman', new Superhero('Batman', ['intelligence', 'wealth']));
    expect(res.json).toHaveBeenCalledWith({
      status: 'OK',
      message: 'Superhero Batman created',
    });
  });

  it('should delete a superhero', async () => {
    req.params = { name: 'Batman' };

    await controller.deleteSuperhero(req as Request<{name: string}>, res as Response);

    expect(storage.deleteObject).toHaveBeenCalledWith('Batman');
    expect(res.json).toHaveBeenCalledWith({
      status: 'OK',
      message: 'Superhero Batman deleted',
    });
  });
});