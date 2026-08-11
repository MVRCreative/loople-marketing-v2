import { defineField, defineType } from 'sanity';

/**
 * Documentation category grouping canonical product features (e.g. "Communities").
 * Rendered as top-level sections/navigation on the docs site.
 */
export const docCategory = defineType({
  name: 'docCategory',
  title: 'Doc Category',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'Optional short summary shown on category landing pages and navigation.',
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Controls the display order of categories in the docs navigation.',
      validation: (rule) => rule.required().integer().min(0),
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'description' },
  },
  orderings: [
    {
      title: 'Display order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
});
