import type { ResourceCategory } from '@/sanity/types';

export const RESOURCE_CATEGORY_LABELS: Record<ResourceCategory, string> = {
  blog: 'Blog',
  caseStudy: 'Case study',
  tutorial: 'Tutorial',
  news: 'News',
};

/**
 * Formats a published date for resource cards and detail pages.
 * @param value ISO datetime string from Sanity.
 * @returns Locale date string.
 */
export const formatResourceDate = (value: string): string =>
  new Date(value).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
