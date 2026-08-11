import { defineField, defineType } from 'sanity';

/**
 * Open career listing for the careers page.
 */
export const jobPosting = defineType({
  name: 'jobPosting',
  title: 'Job posting',
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
      name: 'department',
      title: 'Department',
      type: 'string',
      options: {
        list: [
          { title: 'Engineering', value: 'Engineering' },
          { title: 'Design', value: 'Design' },
          { title: 'Marketing', value: 'Marketing' },
          { title: 'Operations', value: 'Operations' },
          { title: 'Sales', value: 'Sales' },
          { title: 'Customer Success', value: 'Customer Success' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'City or region, e.g. "Austin, TX" or "United States".',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'locationType',
      title: 'Location type',
      type: 'string',
      options: {
        list: [
          { title: 'Remote', value: 'remote' },
          { title: 'Hybrid', value: 'hybrid' },
          { title: 'On-site', value: 'onsite' },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'employmentType',
      title: 'Employment type',
      type: 'string',
      options: {
        list: [
          { title: 'Full-time', value: 'fullTime' },
          { title: 'Part-time', value: 'partTime' },
          { title: 'Contract', value: 'contract' },
          { title: 'Internship', value: 'internship' },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 3,
      description: 'Short teaser shown on the careers listing.',
      validation: (rule) => rule.required().max(300),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'applyUrl',
      title: 'Apply URL',
      type: 'url',
      validation: (rule) =>
        rule.required().uri({
          scheme: ['http', 'https'],
        }),
    }),
    defineField({
      name: 'postedAt',
      title: 'Posted at',
      type: 'datetime',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'open',
      title: 'Open',
      type: 'boolean',
      description: 'Uncheck to hide this posting from the careers page.',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      department: 'department',
      location: 'location',
      open: 'open',
    },
    prepare({ title, department, location, open }) {
      const status = open === false ? 'Closed' : 'Open';
      return {
        title: title ?? 'Untitled job',
        subtitle: [department, location, status].filter(Boolean).join(' · '),
      };
    },
  },
  orderings: [
    {
      title: 'Posted date, newest',
      name: 'postedAtDesc',
      by: [{ field: 'postedAt', direction: 'desc' }],
    },
    {
      title: 'Title',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
  ],
});
