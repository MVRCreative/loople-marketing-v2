import { defineArrayMember, defineField, defineType } from 'sanity';

/**
 * Canonical product feature entry — the source of truth for what Loople does.
 * Rendered on the docs site and referenced by marketing `feature` stories.
 */
export const docFeature = defineType({
  name: 'docFeature',
  title: 'Doc Feature',
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
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'docCategory' }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: 'One-line summary of the feature, shown as the lead sentence.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [defineArrayMember({ type: 'block' })],
      description: 'Full description of the feature.',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Available', value: 'available' },
          { title: 'Planned', value: 'planned' },
        ],
        layout: 'radio',
      },
      initialValue: 'available',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Controls the display order of features within their category.',
      validation: (rule) => rule.required().integer().min(0),
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'tagline', status: 'status' },
    prepare({ title, subtitle, status }) {
      return {
        title: status === 'planned' ? `${title} (Planned)` : title,
        subtitle,
      };
    },
  },
  orderings: [
    {
      title: 'Display order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Title',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
  ],
});
