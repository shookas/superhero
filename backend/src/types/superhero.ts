
export class Superhero implements SuperheroModel {
  name: string;
  powers: string[];
  constructor(name: string, powers: string[]) {
    this.name = name;
    this.powers = powers;
  }
}

export interface SuperheroModel {
    name: string;
    powers: string[];
}