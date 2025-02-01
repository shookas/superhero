import { z } from "zod";
export type SuperheroModel = z.infer<typeof SuperheroSchema>;

export const SuperheroSchema = z
  .object({
    name: z.string(),
    powers: z.array(z.string()),
  })
  .required();
