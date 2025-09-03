import { defineCollection, z } from '@nuxt/content'

export const collections = {
  projects: defineCollection({
    type: 'page',
    source: 'projects/*.md',
    schema: z.object({
      slug: z.string(),
      title: z.string(),
      description: z.string(),
      publishedAt: z.string(),
      readingTime: z.number().optional(),
      tags: z.array(z.string()),
      cover: z.string(),
      favorite: z.boolean().optional(),
    }),
  }),
  writings: defineCollection({
    type: 'page',
    source: 'writings/*.md',
    schema: z.object({
      slug: z.string(),
      title: z.string(),
      description: z.string(),
      publishedAt: z.string(),
      readingTime: z.number(),
      cover: z.string().optional(),
      tags: z.array(z.string()),
    }),
  }),
  usesCategories: defineCollection({
    type: 'data',
    source: 'uses/categories/*.json',
    schema: z.object({
      slug: z.string(),
      name: z.object({
        en: z.string(),
        fr: z.string(),
        es: z.string(),
      }),
    }),
  }),
  uses: defineCollection({
    type: 'data',
    source: 'uses/*.json',
    schema: z.object({
      name: z.string(),
      description: z.object({
        en: z.string(),
        fr: z.string(),
        es: z.string(),
      }),
      category: z.string(),
    }),
  }),
  skills: defineCollection({
    type: 'data',
    source: 'skills.json',
    schema: z.object({
      body: z.array(z.object({
        id: z.string(),
        name: z.object({
          en: z.string(),
          fr: z.string(),
          es: z.string(),
        }),
        items: z.array(z.object({
          name: z.string(),
          icon: z.string(),
        })),
      })),
    }),
  }),
}
