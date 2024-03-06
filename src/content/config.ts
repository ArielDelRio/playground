import posts from "./collections/posts.ts";
import team from "./collections/author.ts";
import resources from "./collections/resource.ts";

// 3. Export a single `collections` object to register your collection(s)
export const collections = {
  posts,
  team,
  resources,
};
