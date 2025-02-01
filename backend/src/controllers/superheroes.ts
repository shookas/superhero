import { Request, Response } from "express";
import { Storage } from "../repositories/Storage";
import { Superhero } from "../types/superhero";
import { SuperheroModel } from "../../../types/api";

export class SuperheroController {
  private storage: Storage<Superhero>;
  constructor(storage: Storage<Superhero>) {
    this.storage = storage;
  }
  /**
   * GET /superheroes
   */
  async getSuperheroes(req: Request, res: Response) {
    const superheroes = await this.storage.getAllObjects();
    res.json(superheroes);
  }
  /**
   * POST /superheroes
   */
  async createSuperhero(req: Request<{}, {}, SuperheroModel>, res: Response) {
    const { name, powers } = req.body || {};
    const superhero = new Superhero(name, powers);
    await this.storage.setObject(name, superhero);
    res.json({
      status: "OK",
      message: `Superhero ${name} created`,
    });
  }
}
