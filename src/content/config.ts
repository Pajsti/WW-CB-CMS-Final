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

const eventsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    startDate: z.date(),
    endDate: z.date().optional(),
    location: z.string(),
    category: z.enum(['zavod', 'trenink', 'akce']),
  }),
});

const settingsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    showCalendar: z.boolean(),
    showQuickLinks: z.boolean(),
    showLiveTV: z.boolean(),
    showRaceOffice: z.boolean(),
    showOfficialDocs: z.boolean(),
    showSponsors: z.boolean(),
    showLatestNews: z.boolean(),
  }),
});

export const collections = {
  'news': newsCollection,
  'gallery': galleryCollection,
  'events': eventsCollection,
  'settings': settingsCollection,
};
