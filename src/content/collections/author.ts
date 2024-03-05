import { z, defineCollection } from "astro:content";

export default defineCollection({
  type: "data",
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      bio: z.string(),
      email: z.string(),
      role: z.enum(["Software", "Design", "Marketing", "Content", "Community"]),
      headshot: image(),
    }),
});
