import Router from "express";
import * as healthController from "./controllers/health";
import {SuperheroController} from "./controllers/superheroes";
import { InMemoryStorage } from "./repositories/Storage";
import { Superhero } from "./types/superhero";

const router = Router();
const superheroController = new SuperheroController(new InMemoryStorage<Superhero>());

router.get(`/health`, healthController.index);
router.get(`/superheroes`, superheroController.getSuperheroes.bind(superheroController));
router.post(`/superheroes`, superheroController.createSuperhero.bind(superheroController));

export default router;
