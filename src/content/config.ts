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
    showKalendar: z.boolean().default(true),
    showKanal: z.boolean().default(true),
    showQuickLinks: z.boolean().default(true),
    showLiveTV: z.boolean().default(true),
    liveResultsUrl: z.string().optional(),
    showRaceOffice: z.boolean().default(true),
    showOfficialDocs: z.boolean().default(true),
    showSponsors: z.boolean().default(true),
    showLatestNews: z.boolean().default(true),
  }),
});

const canalCollection = defineCollection({
  type: 'content',
  schema: z.object({
    monday: z.string().optional(),
    tuesday: z.string().optional(),
    wednesday: z.string().optional(),
    thursday: z.string().optional(),
    friday: z.string().optional(),
    saturday: z.string().optional(),
    sunday: z.string().optional(),
    note: z.string().optional(),
  }),
});


const documentsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    file: z.string(),
    description: z.string().optional(),
    size: z.string().optional(),
  }),
});

const raceInfoCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
  }),
});
export const collections = {
  'news': newsCollection,
  'gallery': galleryCollection,
  'events': eventsCollection,
  'settings': settingsCollection,
  'canal': canalCollection,
  'documents': documentsCollection,
  'race-info': raceInfoCollection,
};
