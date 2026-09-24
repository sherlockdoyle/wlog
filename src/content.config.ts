import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { defineCollection } from 'astro:content';
import tags from './utils/tags';

type Tag = keyof typeof tags;

const blog = defineCollection({
  loader: glob({ base: './src/content', pattern: '**/index.{md,mdx}' }),
  schema: () =>
    z.object({
      title: z.string(),
      summary: z.string(),
      tags: z._default(z.array(z.enum(Object.keys(tags) as Tag[])), []),
      level: z.int(),
      katexMacros: z.optional(z.record(z.string(), z.string())),
      publishDate: z.coerce.date(),
      updatedDate: z.optional(z.coerce.date()),
    }),
});
export const collections = { blog };
