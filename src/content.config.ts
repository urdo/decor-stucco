import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const realizacje = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/realizacje' }),
  schema: z.object({
    title: z.string(),
    object: z.string(),
    client: z.string(),
    year: z.number(),
    location: z.string(),
    scope: z.string(),
    pillar: z.enum(['elewacje', 'izolacje', 'zabytki', 'inne']),
    featured: z.boolean().default(false),
    sourceNote: z.string().default(
      'Zakres za ogłoszeniem o zamówieniu publicznym. Opis przebiegu prac jest opracowaniem redakcyjnym, nie dziennikiem budowy.',
    ),
  }),
});

const uslugi = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/uslugi' }),
  schema: z.object({
    title: z.string(),
    kicker: z.string(),
    summary: z.string(),
    order: z.number(),
    image: z.string(),
    imageAlt: z.string(),
  }),
});

export const collections = { realizacje, uslugi };
