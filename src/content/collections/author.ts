import { z, defineCollection } from "astro:content";

export default defineCollection({
  type: "data",
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      email: z.string(),
      role: z.enum(["developer"]),
      headshot: image(),
    }),
});
