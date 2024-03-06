import { z, defineCollection, reference } from "astro:content";

export default defineCollection({
  type: "content",
  schema: z.object({
    title: z
      .string()
      .max(100, { message: "Title must be 100 characters or less" }),
    description: z
      .string()
      .max(200, { message: "Description must be 200 characters or less" }),
    date: z.date(),
    author: reference("team"),
    relatedPosts: z.array(reference("posts")).optional(),
    tags: z.array(reference("tags")).optional(),
  }),
});
