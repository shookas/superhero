import { Request, Response } from "express";
import { SuperheroModel } from "../../../types/api";
import { Storage } from "../repositories/Storage";
import { Superhero } from "../types/superhero";

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
  /**
   * DELETE /superheroes/:name
   */
  async deleteSuperhero(req: Request<{ name: string }>, res: Response) {
    const { name } = req.params;
    await this.storage.deleteObject(name);
    res.json({
      status: "OK",
      message: `Superhero ${name} deleted`,
    });
  }
}
