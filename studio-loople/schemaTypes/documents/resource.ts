import { defineArrayMember, defineField, defineType } from 'sanity';

const CATEGORY_LABELS: Record<string, string> = {
  blog: 'Blog',
  caseStudy: 'Case study',
  tutorial: 'Tutorial',
  news: 'News',
};

/**
 * Editorial content — blog, case study, tutorial, or news — via category.
 */
export const resource = defineType({
  name: 'resource',
  title: 'Resource',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'caseStudy', title: 'Case study' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'content',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      group: 'content',
      options: {
        list: [
          { title: 'Blog', value: 'blog' },
          { title: 'Case study', value: 'caseStudy' },
          { title: 'Tutorial', value: 'tutorial' },
          { title: 'News', value: 'news' },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      group: 'content',
      validation: (rule) => rule.required().max(300),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover image',
      type: 'image',
      group: 'content',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      group: 'content',
      to: [{ type: 'author' }],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      group: 'content',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
      group: 'content',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      group: 'content',
      initialValue: false,
    }),
    defineField({
      name: 'relatedFeatures',
      title: 'Related features',
      type: 'array',
      group: 'content',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'feature' }],
        }),
      ],
    }),
    defineField({
      name: 'clientName',
      title: 'Client name',
      type: 'string',
      group: 'caseStudy',
      hidden: ({ document }) => document?.category !== 'caseStudy',
    }),
    defineField({
      name: 'clientLogo',
      title: 'Client logo',
      type: 'image',
      group: 'caseStudy',
      options: { hotspot: true },
      hidden: ({ document }) => document?.category !== 'caseStudy',
    }),
    defineField({
      name: 'results',
      title: 'Results',
      type: 'array',
      group: 'caseStudy',
      hidden: ({ document }) => document?.category !== 'caseStudy',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'result',
          title: 'Result',
          fields: [
            defineField({
              name: 'metric',
              title: 'Metric',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'value',
              title: 'Value',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: { title: 'value', subtitle: 'metric' },
          },
        }),
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      group: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category',
      media: 'coverImage',
      date: 'publishedAt',
    },
    prepare({ title, category, media, date }) {
      const categoryLabel =
        typeof category === 'string' ? (CATEGORY_LABELS[category] ?? category) : '';
      const dateLabel = typeof date === 'string' ? new Date(date).toLocaleDateString() : '';
      return {
        title: title ?? 'Untitled resource',
        subtitle: [categoryLabel, dateLabel].filter(Boolean).join(' · '),
        media,
      };
    },
  },
  orderings: [
    {
      title: 'Published date, newest',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
    {
      title: 'Title',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
  ],
});
