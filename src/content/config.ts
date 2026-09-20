import { defineCollection, z } from 'astro:content';

const landings = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    h1: z.string().optional(),
    description: z.string(),
    keyword: z.string(),
    category: z.string().default('inne'),
    readingTime: z.number().default(8),
    updated: z.date(),
    published: z.boolean().default(true),
    hero: z.string().optional(),
    faq: z.array(
      z.object({
        q: z.string(),
        a: z.string(),
      })
    ).default([]),
    ctaCategories: z.array(
      z.object({
        label: z.string(),
        sub: z.string(),
        url: z.string(),
      })
    ).default([]),
  }),
});

export const collections = { landings };
