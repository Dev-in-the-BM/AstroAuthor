import { defineCollection, z } from 'astro:content';

// Define a `post` collection
const postCollection = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string().optional(),

      // These are all optional, to accommodate different posts
      excerpt: z.string().optional(),
      tags: z.array(z.string()).optional(),
      category: z.string().optional(),

      // Dates can be tricky. We'll accept both and coerce them to a Date object.
      publishDate: z.coerce.date().optional(),
      pubDate: z.coerce.date().optional(),

      // This is the important part!
      // The `image()` helper tells Astro to process the path from the frontmatter.
      image: image().optional(),
      heroImage: image().optional(),
    }),
});

// Export a single `collections` object to register your collection(s)
export const collections = {
  post: postCollection,
};