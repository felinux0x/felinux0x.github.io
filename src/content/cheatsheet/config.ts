import { defineCollection, z } from 'astro:content';

const cheatsheetCollection = defineCollection({
  type: 'data',
  schema: z.object({
    // Category information
    title: z.string(),
    id: z.string(),
    icon: z.string(),

    // Commands in this category
    commands: z.array(
      z.object({
        cmd: z.string(),
        desc: z.string(),
        difficulty: z.enum(['Easy', 'Medium', 'Hard']),
        tags: z.array(z.string()),
      })
    ),
  }),
});

export const cheatsheets = cheatsheetCollection;
