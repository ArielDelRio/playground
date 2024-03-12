import { z, defineCollection } from "astro:content";

export default defineCollection({
  type: "data",
  schema: () =>
    z.object({
      name: z.string(),
      color: z.string(),
    }),
});
