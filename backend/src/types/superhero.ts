
import { z } from "zod";

export class Superhero implements SuperheroModel {
  name: string;
  powers: string[];
  constructor(name: string, powers: string[]) {
    SuperheroSchema.parse({ name, powers });
    this.name = name;
    this.powers = powers;
  }
}

export type SuperheroModel = z.infer<typeof SuperheroSchema>;

const SuperheroSchema = z.object({
    name: z.string(),
    powers: z.array(z.string()),
  }).required();