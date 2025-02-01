import { SuperheroModel, SuperheroSchema } from "../../../types/api";

export class Superhero implements SuperheroModel {
  name: string;
  powers: string[];
  constructor(name: string, powers: string[]) {
    SuperheroSchema.parse({ name, powers });
    this.name = name;
    this.powers = powers;
  }
}
