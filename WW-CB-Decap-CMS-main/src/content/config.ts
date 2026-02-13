import { defineCollection, z } from 'astro:content';

const newsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    excerpt: z.string(),
    image: z.string(),
    images: z.array(z.object({ src: z.string() })).optional(),
  }),
});

const galleryCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    cover: z.string(),
    photos: z.array(z.object({ src: z.string() })),
  }),
});

export const collections = {
  'news': newsCollection,
  'gallery': galleryCollection,
};
