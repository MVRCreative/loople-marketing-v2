import { defineArrayMember, defineField, defineType } from 'sanity';

/**
 * Product feature entity plus homepage, menu, and detail presentation fields.
 */
export const feature = defineType({
  name: 'feature',
  title: 'Feature',
  type: 'document',
  groups: [
    { name: 'core', title: 'Core', default: true },
    { name: 'homepage', title: 'Homepage' },
    { name: 'menu', title: 'Menu' },
    { name: 'detail', title: 'Detail page' },
  ],
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      group: 'core',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'core',
      options: { source: 'name', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'personaGroup',
      title: 'Persona group',
      type: 'string',
      group: 'core',
      options: {
        list: [
          { title: 'Organizers', value: 'organizers' },
          { title: 'Members', value: 'members' },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      group: 'core',
      description: 'Short description shared across surfaces.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'mediaLabel',
      title: 'Media label',
      type: 'string',
      group: 'core',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'mediaAspect',
      title: 'Media aspect ratio',
      type: 'string',
      group: 'core',
      description: 'CSS aspect-ratio value, e.g. "16 / 10" or "758 / 633".',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'video',
      title: 'Video',
      type: 'file',
      group: 'core',
      options: { accept: 'video/*' },
    }),
    defineField({
      name: 'subFeatures',
      title: 'Sub-features',
      type: 'array',
      group: 'core',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'subFeature',
          title: 'Sub-feature',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3,
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'mediaLabel',
              title: 'Media label',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'mediaAspect',
              title: 'Media aspect ratio',
              type: 'string',
              description: 'CSS aspect-ratio value, e.g. "1 / 1".',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'mediaFirst',
              title: 'Media first',
              type: 'boolean',
              description: 'Put media above the title and description.',
              initialValue: false,
            }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'mediaLabel' },
          },
        }),
      ],
    }),
    defineField({
      name: 'relatedFeatures',
      title: 'Related features',
      type: 'array',
      group: 'core',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'feature' }],
        }),
      ],
    }),
    defineField({
      name: 'catalogFeatures',
      title: 'Catalog features',
      type: 'array',
      group: 'core',
      description:
        'Canonical product features (from the docs catalog) that this marketing story showcases. Keeps marketing and docs in sync.',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'docFeature' }],
        }),
      ],
    }),
    defineField({
      name: 'eyebrowTone',
      title: 'Eyebrow tone',
      type: 'string',
      group: 'homepage',
      options: {
        list: [
          { title: 'Brand', value: 'brand' },
          { title: 'Coral', value: 'coral' },
          { title: 'Amber', value: 'amber' },
          { title: 'Emerald', value: 'emerald' },
          { title: 'Violet', value: 'violet' },
        ],
      },
    }),
    defineField({
      name: 'homepageHeadline',
      title: 'Homepage headline',
      type: 'string',
      group: 'homepage',
    }),
    defineField({
      name: 'ctaLabel',
      title: 'CTA label',
      type: 'string',
      group: 'homepage',
    }),
    defineField({
      name: 'menuBlurb',
      title: 'Menu blurb',
      type: 'string',
      group: 'menu',
      description: 'One-liner shown in the mega menu.',
    }),
    defineField({
      name: 'detailHeadline',
      title: 'Detail headline',
      type: 'string',
      group: 'detail',
    }),
    defineField({
      name: 'detailDescription',
      title: 'Detail description',
      type: 'text',
      rows: 4,
      group: 'detail',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'personaGroup',
      media: 'video',
    },
    prepare({ title, subtitle }) {
      const personaLabel = subtitle === 'members' ? 'Members' : 'Organizers';
      return {
        title: title ?? 'Untitled feature',
        subtitle: personaLabel,
      };
    },
  },
  orderings: [
    {
      title: 'Name',
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }],
    },
  ],
});
